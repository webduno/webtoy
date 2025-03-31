"use client"
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { CanonPOVProps } from '@/scripts/types/canonPOV'
import { PhysicsScene } from '../physics/PhysicsScene'
import { isMobile } from '@/scripts/utils/mobileDetection'
import { GameButton } from '@/dom/atom/game/GameButton'

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
          <div id="joystick-container" 
          className='pos-abs bottom-0 left-25p 8 bg-b-50 bord-r-100'
          style={{
            marginBottom: "55px",
            width: '120px',
            height: '120px',
            touchAction: 'none',
            zIndex: 1000
          }} />
          
          {/* Jump button */}
          <GameButton type="zeta"
          classOverride='pos-abs bottom-0 right-0  tx-lgx bord-r-100 py-5 mr-4'
           props={{id:"jump-button"}} styleOverride={{
            marginBottom: "60px",
            touchAction: 'none',
            zIndex: 1000
          }}>
            JUMP
          </GameButton>
          
          {/* Throw button */}
          <GameButton type="epsilon"
          classOverride='pos-abs bottom-0 right-0 mb-150 mr-4 px-4 py-1'
           props={{id:"throw-button"}} styleOverride={{
            touchAction: 'none',
            zIndex: 1000
          }}>
            THROW
          </GameButton>
          
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
          <GameButton 
          classOverride='pos-abs top-0 right-0 ma-4 tx-mdl'
            type="white"
            onClick={onExit}
            styleOverride={{
              zIndex: 1000,
              cursor: 'pointer'
            }}
          >
            EXIT
          </GameButton>
        </>
      )}
    </div>
  )
}
