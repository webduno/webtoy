"use client"

import { BackgroundMusic } from '@/dom/atom/game/BackgroundMusic'
import { BackgroundMusicProvider } from '@/scripts/contexts/BackgroundMusicContext'

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