"use client"
import { useRef, useState, useEffect } from 'react'
import styles from '../app/portals/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'
import { Canvas } from '@react-three/fiber'
import SimpleScene from '@/scenes/SimpleScene'
import PortalsStage from '@/scenes/PortalsStage'
import { isMobile } from '@/utils/mobileDetection'

export default function PortalsPage() {
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  // Check if client is mobile on component mount
  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  return (
    <>
      <SimpleScene cameraSettings={{ position: [-0, 1, 28], fov: 100 }} 
      noLights>
        <PortalsStage />
      </SimpleScene>
      <Logo />
      {/* Mobile look control area */}
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
            FLY
          </div>
        </>
      )}
    </>
  )
} 