"use client"

import { BackgroundMusic } from '@/components/BackgroundMusic'
import { BackgroundMusicProvider } from '@/contexts/BackgroundMusicContext'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundMusicProvider>
      <BackgroundMusic />
      <div className="" style={{}}>
        {children}
      </div>
    </BackgroundMusicProvider>
  );
} 