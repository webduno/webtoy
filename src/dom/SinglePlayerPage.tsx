"use client"
import { useRef, useState, useEffect } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/scenes/SinglePlayerStage'
import styles from '../app/single/page.module.css'
import Logo from '@/components/Logo'
import SettingsModal from '@/components/SettingsModal'
import TemplatesModal from '@/components/TemplatesModal'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/sceneTemplates'

export default function SinglePlayerPage() {
  const stageRef = useRef<SinglePlayerStageHandle>(null)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showTemplates, setShowTemplates] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [templates, setTemplates] = useState<{name: string, description: string}[]>(
    DEFAULT_TEMPLATE_LIST.slice(0, 4)
  )
  const [hasObjects, setHasObjects] = useState<boolean>(false)

  // Check for objects when component mounts
  useEffect(() => {
    const objects = stageRef.current?.getSceneObjects?.() || []
    setHasObjects(objects.length > 0)
  }, [])

  const handleHelloClick = () => {
    stageRef.current?.createObject([0, 0, 0], [1, 1, 1], [0, 0, 0])
    setHasObjects(true)
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
    // Call pasteContent to load the template
    stageRef.current?.pasteContent()
    setShowTemplates(false)
  }

  return (
    <>
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
      </div>
      
      <SinglePlayerStage ref={stageRef} />
      {!hasObjects && <>
      <div className='pos-abs tx-shadow-5 top-0 right-0 mr-200 mt-0 tx-re d shake-1 tx-xl'
      style={{color:"#00ff00"}}>
        →
      </div>
      
        <div className="pos-abs tx-shadow-5 text-center bg-b-50 p-4 tx-white bord-r-10 pa-4 w-300px">
          <p className="text-lg tx-altfont- tx-ls-1 mb-2 flex-col gap-">
            How to play <div className='flex-row gap-1 ml-1'>
            <div className="tx-altfont-1 tx-smd"
        style={{
        textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',

        }}>WEB</div>
        <div className="tx-altfont-3 tx-lg"
        style={{
          color: 'orangered',
          textShadow: '1px 1px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff',
        }}
        >TOY</div>
        </div>
            </p>
          
            <p className='tx-lgx tx-altfont-1 '>
            Start by creating blocks, click <span className='tx-altfont-2'style={{color: '#00ff00'}}>"Add New"</span> and use the controls to move or rotate them.
            
          </p>
          <div className='flex-row flex-justify-around gap-2'>
            <div className='tx- border-white bord-r-10 pa-1'>Grab 🚶‍♂️</div>
            <div className='tx- border-white bord-r-10 pa-1'>Rotate 🔄</div>
            <div className='tx- border-white bord-r-10 pa-1'>Scale 📏</div>
          </div>
        </div>
      </>}
      <Logo />
    </>
  )
} 