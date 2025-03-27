import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Toy',
  description: 'Web Toy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <a target="_blank"
       href="https://jam.pieter.com" 
       style={{
        fontFamily: 'system-ui, sans-serif',
         position: 'fixed',
         bottom: -1,
         right: -1,
         padding: '7px', 
         fontSize: '14px', 
         fontWeight: 'bold', 
         background: '#fff', 
         color: '#000', 
         textDecoration: 'none',
           borderTopLeftRadius: '12px', 
          zIndex: 10000,
           border: '1px solid #fff'}}>
        🎉 Vibe Jam 2025
      </a>

      <body className={`${inter.className} flex-col gap-2 flex-justify-center flex-align-center`}
       style={{ margin: 0, padding: 0,
      //  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      // gradient like sunset
      background: 'linear-gradient(-45deg, #ffba6e , #aad0f4 , #6aa0f4 )',
        height: '100vh', overflow: 'hidden' }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
