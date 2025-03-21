import { generateMetadata } from '../../../scripts/service'
import styles from './page.module.css'
import MultiPlayerPage from '@/dom/MultiPlayerPage'

export default async function MultiPlayer() {
  return (
    <main className="flex-col gap-2 flex-justify-center flex-align-center w-100vw h-100vh">
      <MultiPlayerPage  />
    </main>
  )
} 