"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import SinglePlayerScene, { SinglePlayerSceneHandle } from '@/scenes/SinglePlayerScene'
import { Object3D } from 'three'
import TransformControls from '@/dom/TransformControls'

type TransformMode = 'move' | 'scale' | 'rotate';

export interface SinglePlayerStageHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => void
}

const SinglePlayerStage = forwardRef<SinglePlayerStageHandle, {}>((props, ref) => {
  const sceneRef = useRef<SinglePlayerSceneHandle>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#0000ff')

  const handleDone = () => {
    sceneRef.current?.saveObjects()
    setIsAdding(false)
    setSelectedObject(null)
  }

  const handleCancel = () => {
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
    }
  }))

  return (
    <div className="scene-container">
        {isAdding && (
            <TransformControls
              transformMode={transformMode}
              cycleTransformMode={cycleTransformMode}
              handleDone={handleDone}
              handleCancel={handleCancel}
              color={color}
              setColor={setColor}
              setTransformMode={setTransformMode}
            />
        )}
      <SinglePlayerScene 
        ref={sceneRef} 
        isAdding={isAdding} 
        setIsAdding={setIsAdding} 
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        transformMode={transformMode}
        color={color}
      />
    </div>
  )
})

SinglePlayerStage.displayName = 'SinglePlayerStage'

export default SinglePlayerStage 