"use client"
import { useRef, useState } from 'react'
import styles from '../app/portals/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'
import { Canvas } from '@react-three/fiber'
import SimpleScene from '@/scenes/SimpleScene'
import PortalsStage from '@/scenes/PortalsStage'

export default function PortalsPage() {

  return (
    <>
      <SimpleScene cameraSettings={{ position: [-0, 1, 28], fov: 100 }} 
      noLights>
        <PortalsStage />
      </SimpleScene>
      <Logo />
    </>
  )
} 