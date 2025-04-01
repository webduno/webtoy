"use client"
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useBackgroundMusic } from '@/scripts/contexts/BackgroundMusicContext';
import { GameButton } from '../atom/game/GameButton';
import { UsernameInputContainer } from './UsernameInputContainer';

export function RoomButtons({myip}: {myip: string}) {
  const { data: session } = useSession();
  const { togglePlay, playIfNotPlaying } = useBackgroundMusic();
  const [loading, setLoading] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  const playClickSound = () => {
    const audio = new Audio('/click47.wav');
    audio.play().catch(error => console.log('Error playing sound:', error));
  };

  const loginWithGoogle = async () => {
    playClickSound();
    setLoading('google');
    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
      alert("error");
    } finally {
      setLoading(null);
    }

  }

  const handleNavigation = (destination: string, forcedGuest = "") => {
    if (destination === 'portals') {
      if (!username && !forcedGuest) {
        alert('Please enter a username first');
        return;
      }
      // Save username to localStorage when entering portals
      localStorage.setItem('PLAYER_ID', username || forcedGuest);
    }
    playClickSound();
    setLoading(destination);
    // playIfNotPlaying();
  };

  return (<>
    <div className="flex-row gap-2 flex-wrap flex-justify-center flex-align-center">
      <div className="flex-col gap-2">
      <UsernameInputContainer onUsernameChange={setUsername} username={username} />

      <Link prefetch={true}
      
        style={{
          textDecoration: 'none',
          color: 'inherit',
          // pointerEvents: (!username && !loggedPlayer?.name) ? 'none' : 'auto',
          // filter: (!username && !loggedPlayer?.name) ? 'saturate(0) contrast(0.2) brightness(1.5)' : 'none'
        }} className='hover-jump'
        href={(!username) ? "#" : `/portals?${new URLSearchParams({
          username: username || '',
          color: '%2300B30F',
          speed: '1',
          speed_x: '0.5',
          speed_y: '0.5',
          speed_z: '0.5',
          rotation_x: '0',
          rotation_y: '0',
          rotation_z: '0'
        }).toString()}`}
        onClick={() => {
          if (!username) {
            // confirm if wants to enter as guest
            const confirm = window.confirm('Do you want to enter as a guest?');
            if (!confirm) {
              return;
            }
            console.log('generating random string');
            // generat random 10 character string
            const randomString = Math.random().toString(36).substring(2, 15);
            console.log('random string', randomString);
            setUsername(randomString);
            handleNavigation('portals', randomString);
            window.location.href = `/portals?${new URLSearchParams({
              username: randomString,
              color: '%2300B30F',
              speed: '1',
              speed_x: '0.5',
              speed_y: '0.5',
              speed_z: '0.5',
              rotation_x: '0',
              rotation_y: '0',
              rotation_z: '0'
            }).toString()}`;
            return
          }
          handleNavigation('portals');
        }}
      >
        <GameButton type="alpha">
          <div className='px-4 tx-lg noselect'>
            {loading === 'portals' ? <>Loading <br /> MiniGames...</> : (
              <>MiniGames</>
            )}
          </div>
        </GameButton>
      </Link>
      </div>
      <div className='w-100 '>
        <hr className='w-50 opaci-50' />
      </div>

      <Link prefetch={true} href="/single/" onClick={() => handleNavigation('single')}
        
      >
        <GameButton type="epsilon" >
          <div className='px-4 tx-lg noselect'>
            {loading === 'single' ? <>Loading <br /> Game...</> : (
              <>Single <br /> Player</>
            )}
          </div>
        </GameButton>  
      </Link>
      <Link prefetch={true} href="/multi/" onClick={() => handleNavigation('multi')}>
        <GameButton type="beta" >
          <div className='px-4 tx-lg noselect'>
            {loading === 'multi' ? <>Loading <br /> Game...</> : (
              <>Multi <br /> Player</>
            )}
          </div>
        </GameButton>
      </Link>
    </div>

    <div className='flex-col gap-2'>
      {!!session && (<>
        <div className='pos-abs bottom-0 right-0 opaci-chov--50 mr-100 pr-8'
        style={{paddingBottom: '7px'}}
        onClick={() => signOut()}
        >
          <div className='tx-white tx-shadow-5 pr-2'>Logout</div>
        </div>
      </>)}
      {!session && (
        <GameButton type="zeta" onClick={loginWithGoogle} classOverride="bord-r-100 mt-1" >
          <div className='noselect px-4 py-1 tx-lg flex-row gap-2 flex-align-center flex-justify-center'>
            <div className='bg-white bord-r-100 pt- px-1'>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
          </div>
          {loading === 'google' ? 'Logging in...' : 'Login with Google'}
        </div>
      </GameButton>
      )}
    </div>
    </>
  );
}
