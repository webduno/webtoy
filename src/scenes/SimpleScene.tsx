'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { ReactNode } from 'react'

interface SimpleSceneProps {
  children?: ReactNode
}

export default function SimpleScene({ children }: SimpleSceneProps) {
  return (
    <Canvas 
      style={{
        width: '100%', height: '100%',
      }}
      camera={{ position: [-5, 5, 5], fov: 50 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
      />
      
      {children}
    </Canvas>
  )
} 