"use client"
import { useRef } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/scenes/SinglePlayerStage'
import styles from '../app/single/page.module.css'

export default function SinglePlayerPage() {
  const stageRef = useRef<SinglePlayerStageHandle>(null)

  const handleHelloClick = () => {
    stageRef.current?.createObject([0, 0, 0])
  }

  return (
    <>
      <div className={styles.helloWorld}
        style={{ position: 'absolute', top: '0', left: '0', margin: '10px', zIndex: 1000, cursor: 'pointer' }}
        onClick={handleHelloClick}
    >
      Hello Single Player!
      </div>
      <SinglePlayerStage ref={stageRef} />
    </>
  )
} 