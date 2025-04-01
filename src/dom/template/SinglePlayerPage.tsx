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
import { GameEngineNav } from '../molecule/GameEngineNav'

export default function SinglePlayerPage() {
  const stageRef = useRef<SinglePlayerStageHandle>(null)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showAiModal, setShowAiModal] = useState<boolean>(false)
  const [showTemplates, setShowTemplates] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playPosition, setPlayPosition] = useState<[number, number, number]>([0, 0, 0])
  const [spawnCoords, setSpawnCoords] = useState<string>('2,2,2')
  const [ballCount, setBallCount] = useState<string>('3')
  const [templates, setTemplates] = useState<{name: string, description: string}[]>(
    DEFAULT_TEMPLATE_LIST
  )
  const [hasObjects, setHasObjects] = useState<boolean>(false)
  const [showTutorial, setShowTutorial] = useState<boolean>(true)
  const [showClipboardButtons, setShowClipboardButtons] = useState<boolean>(false)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  // Check for template in URL and load it if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const templateParam = urlParams.get('template');
      if (templateParam) {
        console.log(`Template parameter found: ${templateParam}`);
        // Add a small delay to ensure canvas is loaded
        setTimeout(() => {
          if (stageRef.current) {
            console.log('Stage reference available, checking template...');
            // Check if template exists in DEFAULT_TEMPLATE_LIST
            const templateExists = templates.some(t => t.name === templateParam);
            if (templateExists) {
              console.log('Template exists, loading...');
              stageRef.current.loadTemplate(templateParam);
              setHasObjects(true);
            } else {
              console.log('Template not found in list');
            }
          } else {
            console.log('Stage reference not available yet');
          }
        }, 1000); // 1 second delay
      }
    }
  }, []); // Empty dependency array since we're using setTimeout

  // Check for objects when component mounts
  useEffect(() => {
    const objects = stageRef.current?.getSceneObjects?.() || []
    const hasSavedContent = typeof window !== 'undefined' && localStorage.getItem('singleplayer_scene') !== null
    setHasObjects(objects.length > 0 || hasSavedContent)
  }, [])

  const handleHelloClick = () => {
    stageRef.current?.createObject([1, 1, 1], [0, 0, 0])
    setHasObjects(true)
    setIsAdding(true)
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
    setShowTutorial(false)
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
    // early return if scene is empty
    if (!hasObjects) {
      alert("No objects in scene. Please create some objects first.")
      return
    }
    if(!spawnCoords.match(/^-?\d+,-?\d+,-?\d+$/)){
      alert('Invalid spawn coords');
      return;
    }
    try {
      // Parse the coordinates string into an array of numbers
      const coords = spawnCoords.split(',').map(Number)
      
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
          ballCount={parseInt(ballCount) || 3}
        />
      )}

      {!isPlaying && (
        <>
          {showAiModal && (
            <AiModal
              onClose={() => {
                setShowAiModal(false);
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
              spawnCoords={spawnCoords}
              setSpawnCoords={setSpawnCoords}
              ballCount={ballCount}
              setBallCount={setBallCount}
            />
          )}
          
          {showTemplates && (
            <TemplatesModal
              templates={templates}
              onLoadTemplate={handleLoadTemplate}
              onClose={() => {
                setShowTemplates(false);
              }}
            />
          )}

          <GameEngineNav
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
            showClipboardButtons={showClipboardButtons}
            setShowClipboardButtons={setShowClipboardButtons}
            handleHelloClick={handleHelloClick}
            handleToggleAI={handleToggleAI}
            handleToggleTemplates={handleToggleTemplates}
            handleOpenSettings={handleOpenSettings}
            handlePlay={handlePlay}
            handleResetScene={handleResetScene}
            handleCopyContent={handleCopyContent}
            handlePasteContent={handlePasteContent}
            isAdding={isAdding}
          />
          
          <SinglePlayerStage 
            ref={stageRef} 
            deleteMode={deleteMode} 
            setDeleteMode={setDeleteMode} 
            setIsAdding={setIsAdding}
            isAdding={isAdding}
          />
          {!hasObjects && showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
          <Logo />
        </>
      )}
    </>
  )
} 

