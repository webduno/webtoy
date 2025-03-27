"use client";
import { useThree, useFrame } from '@react-three/fiber';
import { Bloom } from '@react-three/postprocessing';
import { useRef } from 'react';
import { Vector3 } from 'three';


export const Lighting = () => {
  const { camera } = useThree();
  const spotLightRef = useRef<any>(null);
  const spawnPointRef = useRef<any>(null);
  // useFrame(() => {
  //   if (spotLightRef.current) {
  //     if (camera.position.distanceTo(new Vector3(0, 0, 0)) > 30) {
  //       spotLightRef.current.target.position.copy(new Vector3(0, 0, 0));
  //     } else {
  //       spotLightRef.current.target.position.copy(camera.position);
  //     }
  //     spotLightRef.current.target.updateMatrixWorld();
  //   }
  // });

  return (
    <>

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
      <ambientLight intensity={0.25} />
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={2}
        penumbra={1}
        intensity={500}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        target={spawnPointRef.current}
      />
      <spotLight
        ref={spotLightRef}
        position={[0, 10, -20]}
        angle={2}
        penumbra={1}
        intensity={50}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        target={spawnPointRef.current}
      />
      <group position={[0, 0, 25]} ref={spawnPointRef}></group>
      <spotLight
        position={[0, 7, 30]}
        target={spawnPointRef.current}
        angle={0.25}
        penumbra={1}
        intensity={10}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
      <ambientLight intensity={0.2} />
    </>
  );
};
