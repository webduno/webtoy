"use client"
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { CanonPOVProps } from '@/scripts/types/canonPOV'
import { PhysicsScene } from './physics/PhysicsScene'
import { isMobile } from '@/scripts/utils/mobileDetection'

export default function CanonPOV({ position, sceneObjects, onExit }: CanonPOVProps) {
  const [showControls, setShowControls] = useState(true)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  
  // Check if client is mobile on component mount
  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])
  
  // Hide controls after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: position, fov: 125 }} shadows>
        <Physics 
          gravity={[0, -30, 0]} 
          defaultContactMaterial={{ friction: 0.001, restitution: 0.2 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <PhysicsScene 
            position={position} 
            sceneObjects={sceneObjects} 
            onExit={onExit} 
            isMobile={isMobileDevice} 
          />
        </Physics>
      </Canvas>
      
      {/* Controls hint UI */}
      {showControls && !isMobileDevice && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <p style={{ margin: '0' }}>WASD: Move | SPACE: Jump | ESC: Exit</p>
        </div>
      )}
      
      {/* Mobile Controls */}
      {isMobileDevice && (
        <>
          {/* Movement joystick */}
          <div id="joystick-container" style={{
            position: 'absolute',
            left: '30px',
            bottom: '30px',
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            touchAction: 'none',
            zIndex: 1000
          }} />
          
          {/* Jump button */}
          <div id="jump-button" style={{
            position: 'absolute',
            right: '30px',
            bottom: '30px',
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            touchAction: 'none',
            zIndex: 1000
          }}>
            JUMP
          </div>
          
          {/* Throw button */}
          <button id="throw-button" style={{
            position: 'absolute',
            right: '30px',
            bottom: '130px',
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            touchAction: 'none',
            zIndex: 1000
          }}>
            THROW
          </button>
          
          {/* Look area - for camera rotation */}
          <div id="look-area" style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            touchAction: 'none',
            zIndex: 999
          }} />
          
          {/* Exit button */}
          <div 
            onClick={onExit}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '5px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          >
            EXIT
          </div>
        </>
      )}
    </div>
  )
}
