"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Object3D } from 'three'
import NewObjectControls from '@/dom/molecule/NewObjectControls'
import { MultiPlayerSceneHandle } from './MultiPlayerScene';
import MultiPlayerScene from './MultiPlayerScene';

type TransformMode = 'move' | 'scale' | 'rotate';

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export interface MultiPlayerStageHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  loadTemplate: (templateName: string) => void
  autorotate: () => void
  getSceneObjects: () => Object3D[]
}

const MultiPlayerStage = forwardRef<MultiPlayerStageHandle, {friends: Friend[], deleteMode: boolean}>((props, ref) => {
  const {friends, deleteMode} = props
  const sceneRef = useRef<MultiPlayerSceneHandle>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#777777')
  const [hasGravity, setHasGravity] = useState(false)

  const handleDone = () => {
    sceneRef.current?.saveObjects()
    setIsAdding(false)
    setSelectedObject(null)
  }

  const handleCancel = () => {
    if (selectedObject && sceneRef.current) {
      // Remove the selected object from the scene
      selectedObject.parent?.remove(selectedObject);
    }
    setIsAdding(false)
    setSelectedObject(null)
  }

  const cycleTransformMode = () => {
    setTransformMode(prev => {
      if (prev === 'move') return 'scale'
      if (prev === 'scale') return 'rotate'
      return 'move'
    })
  }

  useImperativeHandle(ref, () => ({
    createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
      sceneRef.current?.createObject(position, scale, rotation)
    },
    resetScene: () => {
      sceneRef.current?.resetScene()
      setSelectedObject(null)
      setIsAdding(false)
    },
    copyContent: () => {
      sceneRef.current?.copyContent()
    },
    pasteContent: () => {
      sceneRef.current?.pasteContent()
    },
    loadTemplate: (templateName: string) => {
      sceneRef.current?.loadTemplate(templateName)
    },
    autorotate: () => {
      sceneRef.current?.autorotate()
    },
    getSceneObjects: () => {
      return sceneRef.current?.getSceneObjects() || []
    }
  }))

  return (
    <div className="scene-container">
        {isAdding && (
            <NewObjectControls
              canHaveGravity={true}
              transformMode={transformMode}
              cycleTransformMode={cycleTransformMode}
              handleDone={handleDone}
              handleCancel={handleCancel}
              color={color}
              setColor={setColor}
              setTransformMode={setTransformMode}
              hasGravity={hasGravity}
              setHasGravity={setHasGravity}
            />
        )}
      <MultiPlayerScene 
        ref={sceneRef} 
        isAdding={isAdding} 
        setIsAdding={setIsAdding} 
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        transformMode={transformMode}
        color={color}
        friends={friends}
        deleteMode={deleteMode}
      />
    </div>
  )
})

MultiPlayerStage.displayName = 'MultiPlayerStage'

export default MultiPlayerStage 