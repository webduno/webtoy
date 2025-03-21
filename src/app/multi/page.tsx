import { generateMetadata } from '../../../scripts/service'
import styles from './page.module.css'
import MultiPlayerPage from '@/dom/MultiPlayerPage'

export default async function MultiPlayer() {
  const response = await generateMetadata()
  
  return (
    <main className="flex-col gap-2 flex-justify-center flex-align-center w-100vw h-100vh">
      <MultiPlayerPage myip={response.myip} />
    </main>
  )
} 