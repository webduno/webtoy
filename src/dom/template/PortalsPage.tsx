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
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("searchParams", searchParams.get("color"))
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
    console.log('Parsed URL parameters:', params);
    
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
      <SimpleScene cameraSettings={{ position: [-0, 1, 28], fov: 100 }} 
      noLights>
        <PortalsStage portalParams={portalParams} onPortalCollision={() => setIsLoading(true)} />
      </SimpleScene>
      <Logo />
      <div 
        id="look-area" 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          touchAction: 'none',
          zIndex: 999
        }} 
      />
    </>
  )
} 