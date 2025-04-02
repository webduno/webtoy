"use client"
import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '../app/portals/page.module.css'
import Logo from '@/dom/atom/logo/Logo'
import SettingsModal from '@/dom/molecule/SettingsModal'
import TemplatesModal from '@/dom/molecule/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/helpers/sceneTemplates'
import { Canvas } from '@react-three/fiber'
import SimpleScene from '@/model/scenes/SimpleScene'
import PortalsStage from '@/model/scenes/PortalsStage'
import { isMobile } from '@/scripts/utils/mobileDetection'
import { Physics, usePlane } from '@react-three/cannon'
import { PhysicsScene } from '@/model/physics/PhysicsScene'
import { GameButton } from '@/dom/atom/game/GameButton'
import { Box } from '@react-three/drei'

interface PortalParams {
  username?: string;
  color?: string;
  speed?: number;
  ref?: string;
  avatar_url?: string;
  team?: string;
  speed_x?: number;
  speed_y?: number;
  speed_z?: number;
  rotation_x?: number;
  rotation_y?: number;
  rotation_z?: number;
}

export default function PortalsPage() {
  const [portalParams, setPortalParams] = useState<PortalParams>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    // console.log("searchParams", searchParams.get("color"))
    let username = searchParams.get('username');
    
    // If no username in URL, check localStorage or generate random string
    if (!username) {
      const storedPlayerId = localStorage.getItem('PLAYER_ID');
      if (storedPlayerId) {
        username = storedPlayerId;
      } else {
        username = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('PLAYER_ID', username);
      }
      
      // Update URL with the username
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('username', username);
      window.history.replaceState({}, '', newUrl.toString());
    }

    const params: PortalParams = {
      username: username || undefined,
      color: searchParams.get('color') || '%2300B30F',
      speed: searchParams.get('speed') ? Number(searchParams.get('speed')) : 1,
      ref: searchParams.get('ref') || undefined,
      avatar_url: searchParams.get('avatar_url') || undefined,
      team: searchParams.get('team') || undefined,
      speed_x: searchParams.get('speed_x') ? Number(searchParams.get('speed_x')) : 0.5,
      speed_y: searchParams.get('speed_y') ? Number(searchParams.get('speed_y')) : 0.5,
      speed_z: searchParams.get('speed_z') ? Number(searchParams.get('speed_z')) : 0.5,
      rotation_x: searchParams.get('rotation_x') ? Number(searchParams.get('rotation_x')) : 0,
      rotation_y: searchParams.get('rotation_y') ? Number(searchParams.get('rotation_y')) : 0,
      rotation_z: searchParams.get('rotation_z') ? Number(searchParams.get('rotation_z')) : 0,
    };

    // Log the parsed parameters for debugging
    // console.log('Parsed URL parameters:', params);
    
    setPortalParams(params);
  }, [searchParams]);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            Loading...
          </div>
        </div>
      )}
      <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
        <Canvas camera={{ position: [-0, 10, 28], fov: 125 }} shadows>
          <Physics 
            gravity={[0, -30, 0]} 
            defaultContactMaterial={{ friction: 0.001, restitution: 0.2 }}
          >
            {/* <ambientLight intensity={0.5} /> */}
            {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}
            <PhysicalFloor />
            <PhysicsScene 
              playerHeight={1}
              playerRadius={0.3}
              moveSpeed={14}
              jumpForce={20}
              maxVelocity={80}
              position={[-0, 5, 28]} 
              sceneObjects={[]} 
              onExit={() => {}} 
              isMobile={isMobileDevice} 
              ballCount={0}
            />
            <PortalsStage portalParams={portalParams} onPortalCollision={() => setIsLoading(true)} />
          </Physics>
        </Canvas>
      </div>
      
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
        </>
      )}
      <Logo />
      <div id="crosshair" className='pos-fix top-50p left-50p opaci-10 noclick block bord-r-100'>
        +
      </div>
    </>
  )
} 





// Add this component before the PhysicsScene component
const PhysicalFloor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 2, 0],
    args: [100, 1, 100],
    type: 'Static',
    material: {
      friction: 0.5,
      restitution: 0.1
    }
  }))
  
  return (<>
  </>)
}