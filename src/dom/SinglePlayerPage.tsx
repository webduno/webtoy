"use client"
import { useRef, useState, useEffect } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/scenes/SinglePlayerStage'
import styles from '../app/single/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'
import CanonPOV from '@/components/CanonPOV'
import TutorialModal from '@/components/TutorialModal'
import { AiModal } from './AiModal'

export default function SinglePlayerPage() {
  const stageRef = useRef<SinglePlayerStageHandle>(null)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showAiModal, setShowAiModal] = useState<boolean>(false)
  const [showTemplates, setShowTemplates] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playPosition, setPlayPosition] = useState<[number, number, number]>([0, 0, 0])
  const [templates, setTemplates] = useState<{name: string, description: string}[]>(
    DEFAULT_TEMPLATE_LIST
  )
  const [hasObjects, setHasObjects] = useState<boolean>(false)
  const [showTutorial, setShowTutorial] = useState<boolean>(true)

  // Check for objects when component mounts
  useEffect(() => {
    const objects = stageRef.current?.getSceneObjects?.() || []
    const hasSavedContent = localStorage.getItem('singleplayer_scene') !== null
    setHasObjects(objects.length > 0 || hasSavedContent)
  }, [])

  const handleHelloClick = () => {
    stageRef.current?.createObject([0, 0, 0], [1, 1, 1], [0, 0, 0])
    setHasObjects(true)
  }

  const handleOpenSettings = () => {
    setShowSettings(!showSettings)
    setShowTemplates(false)
    setShowAiModal(false)
    setShowTutorial(false)
  }

  const handleOpenTemplates = () => {
    setShowTemplates(true)
    setShowSettings(false)
    setShowAiModal(false)
  }

  const handleResetScene = () => {
    stageRef.current?.resetScene()
    // setShowSettings(false)
  }

  const handleCopyContent = () => {
    stageRef.current?.copyContent()
    setShowSettings(false)
  }

  const handlePasteContent = () => {
    stageRef.current?.pasteContent()
    // setShowSettings(false)
  }

  const handleAutorotate = () => {
    stageRef.current?.autorotate()
    setShowSettings(false)
  }

  const handleLoadTemplate = (templateName: string) => {
    console.log(`Loading template: ${templateName}`)
    // Call loadTemplate directly with the template name
    stageRef.current?.loadTemplate(templateName)
    setShowTemplates(false)
    setHasObjects(true)
  }

  const handlePlay = () => {
    const coordinates = prompt("Enter coordinates (default: 2,2,2)", "2,2,2")
    if (!coordinates) {
      return alert("No coordinates provided")
    }
    //  early return if scene is empty
    if (!hasObjects) {
      alert("No objects in scene. Please create some objects first.")
      return
    }

    try {
      // Parse the coordinates string into an array of numbers
      const coords = coordinates.split(',').map(Number)
      
      // Check if we have exactly 3 valid numbers
      if (coords.length !== 3 || coords.some(isNaN)) {
        throw new Error("Invalid coordinates format")
      }
      
      // Set the play position and activate first-person mode
      setPlayPosition([coords[0], coords[1], coords[2]])
      setIsPlaying(true)
      setShowSettings(false)
    } catch (error) {
      alert("Invalid coordinates. Please use format: x,y,z")
    }
  }

  const handleOpenAI = () => {
    setShowSettings(false)
    setShowAiModal(true)
  }

  const handleExitPlay = () => {
    setIsPlaying(false)
  }

  return (
    <>
      {isPlaying && (
        <CanonPOV
          position={playPosition} 
          sceneObjects={stageRef.current?.getSceneObjects?.() || []}
          onExit={handleExitPlay} 
        />
      )}

      {!isPlaying && (
        <>
        {showAiModal && (
          <AiModal
            onClose={() => setShowAiModal(false)}
          />
        )}
          {showSettings && (
            <SettingsModal
              onClose={() => setShowSettings(false)}
              onDeleteModeToggle={setDeleteMode}
              deleteMode={deleteMode}
              onResetScene={handleResetScene}
              onCopyContent={handleCopyContent}
              onPasteContent={handlePasteContent}
              onAutorotate={handleAutorotate}
              onOpenTemplates={handleOpenTemplates}
              onOpenAI={handleOpenAI}
            />
          )}
          
          {showTemplates && (
            <TemplatesModal
              templates={templates}
              onLoadTemplate={handleLoadTemplate}
              onClose={() => setShowTemplates(false)}
            />
          )}

          <div className='pos-abs top-0 right-0 ma-2 flex-col flex-align-end gap-2'>
            {deleteMode && (
              <div onClick={() => {
                setDeleteMode(false)
              }} className='tx-red tx-altfont- 2 opaci-50 opaci-chov--75 z-1000'>Exit Delete Mode</div>
            )}
            {!deleteMode && (
              <div className={styles.helloWorld + ' opaci-chov--75 z-100 block pos-rel'} 
                onClick={handleHelloClick}
              >
                Add New
              </div>
            )}
            <div className={styles.helloWorld + ' opaci-chov--75 z-100 block pos-rel'}
              onClick={handleOpenSettings}
            >
              <span className='px-2' role="img" aria-label="cogwheel">⚙️</span>
            </div>
            <div className={'hover-jump opaci-chov--75 z-100 block pos-rel tx-shad ow-5 bg- glass-10 bord-r-100 p a-2 flex-col'}
              style={{
                textShadow: "2px 2px 0 #112244, 0 10px 10px #00000055",
              }}
              onClick={handlePlay}
            >
              <div className='tx-lx' aria-label="cogwheel">🎮</div>
            </div>
          </div>
          
          <SinglePlayerStage ref={stageRef} deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
          {!hasObjects && showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
          <Logo />
        </>
      )}
    </>
  )
} 

