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
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {children}
    </Canvas>
  )
} 