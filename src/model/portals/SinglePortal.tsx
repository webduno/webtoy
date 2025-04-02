"use client";
import { Torus, Circle, Text, Sphere } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, Group } from 'three';
import { useRouter } from 'next/navigation';

export const SinglePortal = ({ 
  portalMaterial = <meshStandardMaterial color="#aad0f4" emissive="#aad0f4" emissiveIntensity={0.75} />, 
  torusMaterial = <meshStandardMaterial color="#ffffff" emissive="#444444" />,
  position, 
  rotation,
  title ="???",
  url,
  onCollision,
  textColor = "lightgrey"
}: { 
  portalMaterial?: any; 
  torusMaterial?: any;
  position: [number, number, number]; 
  rotation: [number, number, number];
  title?: string;
  url?: string;
  onCollision?: () => void;
  textColor?: string;
}) => {
  const router = useRouter();
  const { camera } = useThree();
  const portalRef = useRef<Group>(null);
  const collisionRadius = 4; // Adjust this value based on your portal size

  useEffect(() => {
    const checkCollision = () => {
      if (!portalRef.current || !url || !portalRef.current.parent) return;

      try {
        const portalPosition = new Vector3();
        portalRef.current.getWorldPosition(portalPosition);
        const distance = camera.position.distanceTo(portalPosition);

        if (distance < collisionRadius) {
          // console.log("portal clicked", url)
          if (onCollision) {
            onCollision();
          }
          router.push(url);
        }
      } catch (error) {
        console.error("Error checking portal collision:", error);
      }
    };

    // Check for collision every frame
    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [camera, url, router, onCollision]);

  return (
    <group ref={portalRef} position={position} rotation={rotation}>
      {title &&
      <Text 
        key={title} 
        textAlign='center' 
        position={[0, 6.25, 0.1]} 
        fontSize={1} 
        color={textColor||"white"}
        renderOrder={1}
        font="/fonts/Consolas.ttf"
      >
        {title}
      </Text>
      }
      {/* <Sphere args={[collisionRadius, 16, 16]}>
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.2} />
      </Sphere> */}
      <Torus args={[5, 0.5, 4, 32, Math.PI]} castShadow receiveShadow>
        {torusMaterial}
      </Torus>
      <Circle args={[5, 32, 0, Math.PI]} castShadow receiveShadow>
        {portalMaterial}
      </Circle>
    </group>
  );
};
