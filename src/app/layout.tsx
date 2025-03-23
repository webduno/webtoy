import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Landxcape',
  description: 'Landxcape',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body className={`${inter.className} flex-col gap-2 flex-justify-center flex-align-center`}
       style={{ margin: 0, padding: 0,
      //  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      // gradient like sunset
      background: 'linear-gradient(-45deg, #ffba6e , #aad0f4 , #6aa0f4 )',
        height: '100vh', overflow: 'hidden' }}>
        <div className="" style={{
        }}>
          {children}
        </div>
      </body>
    </html>
  )
}
