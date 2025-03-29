"use client";
import { useThree, useFrame } from '@react-three/fiber';
import { Bloom } from '@react-three/postprocessing';
import { useRef, useEffect } from 'react';
import { Vector3, Object3D } from 'three';

export const Lighting = () => {
  const { camera } = useThree();
  const spotLightRef = useRef<any>(null);
  const targetRef = useRef<Object3D>(new Object3D());

  // Initialize target position
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.position.set(0, 0, 25);
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.25} />
      
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={2}
        penumbra={1}
        intensity={500}
        color="#ffeecc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        target={targetRef.current}
      />
      <spotLight
        position={[0, 10, -20]}
        angle={2}
        penumbra={1}
        intensity={50}
        color="#ffeeaa"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        target={targetRef.current}
      />

      <pointLight intensity={20} distance={100} color="#FFe7a8" 
        position={[0, 22, 0]}
      />

      <pointLight 
        position={[0, 10, 0]} 
        intensity={5} 
        distance={100} 
        color="#FFF7E8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
      <ambientLight intensity={0.2} />
      <spotLight
        position={[0, 7, 30]}
        target={targetRef.current}
        angle={0.4}
        penumbra={1}
        intensity={60}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
    </>
  );
};
