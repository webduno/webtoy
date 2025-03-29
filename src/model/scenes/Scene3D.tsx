'use client';

import React from 'react';
import { Suspense } from 'react';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Box() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x += 0.01;
  //     meshRef.current.rotation.y += 0.01;
  //   }
  // });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshPhongMaterial color={0x00ff00} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <><div style={{ width: '100%', height: '100%', backgroundColor: 'black' , position: 'relative' }}>
      <Canvas style={{ backgroundColor: 'black', width: '100%', height: '100%' , position: 'relative' }} >
        <OrbitControls  />
        <Box />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <ambientLight intensity={0.4} />
      </Canvas>
    </div> 
    </>
  );
} 