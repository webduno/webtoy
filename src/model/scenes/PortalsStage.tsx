"use client"
import { forwardRef, useRef } from 'react'
import { Stage } from '@react-three/drei'
import { useBackgroundMusic } from '@/scripts/contexts/BackgroundMusicContext'
import { HallOfPortals } from '../portals/HallOfPortals'
import CameraFlyControls from '../controls/CameraFlyControls'

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

interface PortalsStageProps {
  portalParams: PortalParams;
  onPortalCollision: () => void;
}

const PortalsStage = forwardRef<any, PortalsStageProps>(({ portalParams, onPortalCollision }, ref) => {
  const controlsRef = useRef<any>(null)

  return (<>
      <CameraFlyControls 
        ref={controlsRef}
        onPause={() => onPortalCollision()}
      />
      <HallOfPortals portalParams={portalParams} onPortalCollision={() => {
        controlsRef.current?.pause();
        onPortalCollision();
      }} />
  </>)
})

PortalsStage.displayName = 'PortalsStage'

export default PortalsStage 


