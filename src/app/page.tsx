import Image from 'next/image'
import styles from './page.module.css'
import { RoomCreate } from '../dom/RoomCreate'
import { generateMetadata } from '../../scripts/service'

export default async function Home() {
  const response = await generateMetadata()
  // console.log(response)
  
  return (
    <main className="flex-col gap-2 flex-justify-center flex-align-center">
      <RoomCreate myip={response.myip} />
    </main>
  )
}