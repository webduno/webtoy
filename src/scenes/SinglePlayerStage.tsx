"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import SinglePlayerScene, { SinglePlayerSceneHandle } from '@/scenes/SinglePlayerScene'
import { Object3D } from 'three'
import TransformControls from '@/dom/TransformControls'

type TransformMode = 'move' | 'scale' | 'rotate';

export interface SinglePlayerStageHandle {
  createObject: (position: [number, number, number]) => void
}

const SinglePlayerStage = forwardRef<SinglePlayerStageHandle, {}>((props, ref) => {
  const sceneRef = useRef<SinglePlayerSceneHandle>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#0000ff')

  const handleDone = () => {
    sceneRef.current?.saveObjects()
    setIsMoving(false)
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
    createObject: (position: [number, number, number]) => {
      sceneRef.current?.createObject(position)
    }
  }))

  return (
    <div className="scene-container">
        {isMoving && (
            <TransformControls
              transformMode={transformMode}
              cycleTransformMode={cycleTransformMode}
              handleDone={handleDone}
              color={color}
              setColor={setColor}
            />
        )}
      <SinglePlayerScene 
        ref={sceneRef} 
        isMoving={isMoving} 
        setIsMoving={setIsMoving} 
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