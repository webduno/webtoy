"use client"
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { CanonPOVProps } from '@/scripts/types/canonPOV'
import { PhysicsScene } from '../physics/PhysicsScene'
import { isMobile } from '@/scripts/utils/mobileDetection'
import { GameButton } from '@/dom/atom/game/GameButton'

export default function CanonPOV({ position, sceneObjects, onExit, ballCount }: CanonPOVProps) {
  const [showControls, setShowControls] = useState(true)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [balls, setBalls] = useState<Array<{
    position: [number, number, number],
    velocity: [number, number, number],
    id: number
  }>>([])
  const [remainingBalls, setRemainingBalls] = useState(ballCount)
  
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
  
  // Reset balls when component unmounts or onExit is called
  useEffect(() => {
    return () => {
      setBalls([])
      setRemainingBalls(ballCount)
    }
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
            ballCount={ballCount}
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
          <GameButton buttonType="zeta"
          classOverride='pos-abs bottom-0 right-0  tx-lgx bord-r-100 py-5 mr-4'
           id="jump-button" styleOverride={{
            marginBottom: "60px",
            touchAction: 'none',
            zIndex: 1000
          }}>
            JUMP
          </GameButton>
          
          {/* Throw button */}
          <GameButton buttonType="epsilon"
          classOverride='pos-abs bottom-0 right-0 mb-150 mr-4 px-4 py-1'
           id="throw-button" styleOverride={{
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
            buttonType="white"
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
      <div id="crosshair" className='pos-fix top-50p left-50p opaci-10 noclick block bord-r-100'>
        +
      </div>
    </div>
  )
}
