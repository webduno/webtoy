"use client"
import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '../app/portals/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'
import { Canvas } from '@react-three/fiber'
import SimpleScene from '@/scenes/SimpleScene'
import PortalsStage from '@/scenes/PortalsStage'
import { isMobile } from '@/utils/mobileDetection'

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
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("searchParams", searchParams.get("color"))
    const params: PortalParams = {
      username: searchParams.get('username') || undefined,
      color: searchParams.get('color') || undefined,
      speed: searchParams.get('speed') ? Number(searchParams.get('speed')) : undefined,
      ref: searchParams.get('ref') || undefined,
      avatar_url: searchParams.get('avatar_url') || undefined,
      team: searchParams.get('team') || undefined,
      speed_x: searchParams.get('speed_x') ? Number(searchParams.get('speed_x')) : undefined,
      speed_y: searchParams.get('speed_y') ? Number(searchParams.get('speed_y')) : undefined,
      speed_z: searchParams.get('speed_z') ? Number(searchParams.get('speed_z')) : undefined,
      rotation_x: searchParams.get('rotation_x') ? Number(searchParams.get('rotation_x')) : undefined,
      rotation_y: searchParams.get('rotation_y') ? Number(searchParams.get('rotation_y')) : undefined,
      rotation_z: searchParams.get('rotation_z') ? Number(searchParams.get('rotation_z')) : undefined,
    };

    // Log the parsed parameters for debugging
    console.log('Parsed URL parameters:', params);
    
    setPortalParams(params);
  }, [searchParams]);

  return (
    <>
      <SimpleScene cameraSettings={{ position: [-0, 1, 28], fov: 100 }} 
      noLights>
        <PortalsStage portalParams={portalParams} />
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