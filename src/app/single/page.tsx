import styles from './page.module.css'
import { useRef } from 'react'
import SinglePlayerStage, { SinglePlayerStageHandle } from '@/scenes/SinglePlayerStage'
import SinglePlayerPage from '@/dom/SinglePlayerPage'

export default function SinglePlayer() {

  return (
    <main className="flex-col gap-2 flex-justify-center flex-align-center w-100vw h-100vh"
    >
      <SinglePlayerPage />
    </main>
  )
} 