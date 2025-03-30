"use client"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
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
  createObject: (scale: [number, number, number], rotation: [number, number, number], position?: [number, number, number]) => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  loadTemplate: (templateName: string) => void
  autorotate: () => void
  getSceneObjects: () => Object3D[]
}

const MultiPlayerStage = forwardRef<MultiPlayerStageHandle, {
  friends: Friend[], 
  deleteMode: boolean, 
  setIsAdding: (isAdding: boolean) => void,
  isAdding: boolean
}>((props, ref) => {
  const {friends, deleteMode, setIsAdding, isAdding} = props
  const sceneRef = useRef<MultiPlayerSceneHandle>(null)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>(() => {
    // Try to get color from localStorage, fallback to default
    return localStorage.getItem('multiplayer_color') || '#777777'
  })
  const [hasGravity, setHasGravity] = useState(false)
  const [lastPlacedPosition, setLastPlacedPosition] = useState<[number, number, number]>([0, 0, 0])

  // Save color to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('multiplayer_color', color)
  }, [color])

  const handleDone = () => {
    if (selectedObject) {
      selectedObject.userData = {
        ...selectedObject.userData,
        hasGravity
      };
      // Update last placed position when object is placed
      setLastPlacedPosition([selectedObject.position.x, selectedObject.position.y, selectedObject.position.z]);
    }
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
    createObject: (scale: [number, number, number], rotation: [number, number, number], position?: [number, number, number]) => {
      // Use last placed position if no position is provided
      const pos = position || lastPlacedPosition;
      sceneRef.current?.createObject(pos, scale, rotation)
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