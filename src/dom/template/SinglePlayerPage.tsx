"use client"
import { useRef, useState, useEffect } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/model/scenes/SinglePlayerStage'
import styles from '../../app/single/page.module.css'
import SettingsModal from '@/dom/molecule/SettingsModal'
import TemplatesModal from '@/dom/molecule/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/helpers/sceneTemplates'
import TutorialModal from '@/dom/molecule/TutorialModal'
import { AiModal } from '../molecule/AiModal'
import { clearPhysicsState } from '@/model/physics/PhysicalObjects'
import CanonPOV from '@/model/controller/CanonPOV'
import Logo from '@/dom/atom/logo/Logo'
import { GameButton } from '../atom/game/GameButton'

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

  const handleToggleTemplates = () => {
    setShowTemplates(!showTemplates)
    setShowSettings(false)
    setShowAiModal(false)
    setShowTutorial(false)
  }

  const handleResetScene = () => {
    stageRef.current?.resetScene()
    // setShowSettings(false)
  }

  const handleCopyContent = () => {
    stageRef.current?.copyContent()
    // setShowSettings(false)
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

  const handleToggleAI = () => {
    setShowSettings(false)
    setShowAiModal(!showAiModal)
    setShowTutorial(false)
  }

  const handleExitPlay = () => {
    setIsPlaying(false)
    clearPhysicsState()
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
            onClose={() => {
              setShowAiModal(false);
              // setShowSettings(true);
            }}
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
              onOpenTemplates={handleToggleTemplates}
              onOpenAI={handleToggleAI}
            />
          )}
          
          {showTemplates && (
            <TemplatesModal
              templates={templates}
              onLoadTemplate={handleLoadTemplate}
              onClose={() => {
                setShowTemplates(false);
                // setShowSettings(true);
              }}
            />
          )}

          <div className='pos-abs top-0 right-0 ma-2 flex-col flex-align-end gap-2'>
            {deleteMode && (
              <div onClick={() => {
                setDeleteMode(false)
              }} className='tx-red tx-altfont- 2 opaci-50 opaci-chov--75 z-1000'>Exit Delete Mode</div>
            )}
            {!deleteMode && (
              <GameButton type="alpha" classOverride={'tx-lg x px-3 z-100 mb-1 mr -1'} 
                onClick={handleHelloClick}
              >
                Add  New
              </GameButton>
            )}
            <div className='flex-row gap-2 mr- 1'>
              {!deleteMode && (
                <GameButton type="zeta" 
                styleOverride={{
                  border: '1px solid #ff00ff',
                }}
                classOverride={'tx-lgx px- 3 z-100 '} 
                  onClick={handleToggleTemplates}
                >
                  🗂️
                </GameButton>
              )}
              {!deleteMode && (
                <GameButton type="zeta" classOverride={'tx-lgx px- 3 z-100 '} 
                  onClick={handleToggleAI}
                >
                  🪄
                </GameButton>
              )}
            </div>
            <div className='flex-row-r gap-2 '>
              <GameButton type="white" classOverride={' bord-r-100 z-100 mr 1 1 mt-2'}
                onClick={handleOpenSettings}
              >
                <span className='px- 2 tx-lg' role="img" aria-label="cogwheel">⚙️</span>
              </GameButton>
              <div className={'hover-jump mr- opaci-chov--75 z-100 block pos-rel tx-shad ow-5 bg- glass-10 bord-r-100 p a-2 flex-col'}
                style={{
                  textShadow: "2px 2px 0 #112244, 0 10px 10px #00000055",
                }}
                onClick={handlePlay}
              >
                <div className='tx-lx' aria-label="cogwheel">🎮</div>
              </div>
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

