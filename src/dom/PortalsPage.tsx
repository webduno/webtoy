"use client"
import { useRef, useState } from 'react'
import styles from '../app/portals/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'
import PortalsStage, { PortalsStageHandle } from '@/scenes/PortalsStage'
import { Canvas } from '@react-three/fiber'
import SimpleScene from '@/scenes/SimpleScene'

export default function PortalsPage() {
  const stageRef = useRef<PortalsStageHandle>(null)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showTemplates, setShowTemplates] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [templates, setTemplates] = useState<{name: string, description: string}[]>(
    DEFAULT_TEMPLATE_LIST.slice(0, 4)
  )

  const handleAddPortal = () => {
    stageRef.current?.createPortal([0, 0, 0], [1, 1, 1], [0, 0, 0])
  }

  const handleOpenSettings = () => {
    setShowSettings(!showSettings)
    setShowTemplates(false)
  }

  const handleOpenTemplates = () => {
    setShowTemplates(true)
    setShowSettings(false)
  }

  const handleResetScene = () => {
    stageRef.current?.resetScene()
    setShowSettings(false)
  }

  const handleCopyContent = () => {
    stageRef.current?.copyContent()
    setShowSettings(false)
  }

  const handlePasteContent = () => {
    stageRef.current?.pasteContent()
    setShowSettings(false)
  }

  const handleAutorotate = () => {
    stageRef.current?.autorotate()
    setShowSettings(false)
  }

  const handleLoadTemplate = (templateName: string) => {
    console.log(`Loading template: ${templateName}`)
    localStorage.setItem('selectedTemplate', templateName)
    stageRef.current?.pasteContent()
    setShowTemplates(false)
  }

  return (
    <>
      {/* {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onDeleteModeToggle={setDeleteMode}
          deleteMode={deleteMode}
          onResetScene={handleResetScene}
          onCopyContent={handleCopyContent}
          onPasteContent={handlePasteContent}
          onAutorotate={handleAutorotate}
          onOpenTemplates={handleOpenTemplates}
        />
      )} */}
      
      {/* {showTemplates && (
        <TemplatesModal
          templates={templates}
          onLoadTemplate={handleLoadTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )} */}
{/* 
      <div className='pos-abs top-0 right-0 ma-2 flex-col flex-align-end gap-2'>
        {deleteMode && (
          <div onClick={() => {
            setDeleteMode(false)
          }} className='tx-red tx-altfont- 2 opaci-50 opaci-chov--75 z-1000'>Exit Delete Mode</div>
        )}
        {!deleteMode && (
          <div className={styles.addPortal + ' opaci-chov--75 z-100 block pos-rel'} 
            onClick={handleAddPortal}
          >
            Add Portal
          </div>
        )}
        <div className={styles.settings + ' opaci-chov--75 z-100 block pos-rel'}
          onClick={handleOpenSettings}
        >
          <span className='px-2' role="img" aria-label="cogwheel">⚙️</span>
        </div>
      </div> */}
      <SimpleScene cameraSettings={{ position: [-0, 1, 28], fov: 100 }} 
      noLights>
        <PortalsStage ref={stageRef} />
      </SimpleScene>
      <Logo />
    </>
  )
} 