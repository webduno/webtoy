"use client"
import { useRef } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/scenes/SinglePlayerStage'
import styles from '../app/single/page.module.css'
import Logo from '@/components/Logo'

export default function SinglePlayerPage() {
  const stageRef = useRef<SinglePlayerStageHandle>(null)

  const handleHelloClick = () => {
    stageRef.current?.createObject([0, 0, 0])
  }

  return (
    <>
      <div className={styles.helloWorld + ' opaci-chov--75'} 
        style={{ position: 'absolute', top: '0', left: '0', margin: '10px', zIndex: 1000, cursor: 'pointer' }}
        onClick={handleHelloClick}
    >
      Add New
      </div>
      <SinglePlayerStage ref={stageRef} />
      <Logo />
    </>
  )
} 