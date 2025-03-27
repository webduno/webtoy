"use client"
import Link from 'next/link';
import './styles.css';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useBackgroundMusic } from '@/contexts/BackgroundMusicContext';

export function RoomButtons({myip}: {myip: string}) {
  const { data: session } = useSession();
  const { togglePlay } = useBackgroundMusic();
  const [loggedPlayer, setLoggedPlayer] = useState<{id:string, name:string} | null>({
    id:myip,
    name: myip
  });
  const [loading, setLoading] = useState<string | null>(null);

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

    setLoggedPlayer({
      id:session?.user?.email ?? "",
      name: session?.user?.name ?? ""
    });
  }

  const handleNavigation = (destination: string) => {
    playClickSound();
    setLoading(destination);
    togglePlay(); // Use the context's play function
  };

  return (<>
    <div className="flex-row gap-2 flex-wrap flex-justify-center flex-align-center">
      <Link 
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }} 
        href={`/single/`}
        onClick={() => handleNavigation('single')}
      >
        <button
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#4a90e2',
            border: 'none',
            borderRadius: '8px',
            cursor: loading === 'single' ? 'wait' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: loading === 'single' ? 0.7 : 1,
          }}
          className="room-select-button"
          disabled={loading !== null}
        >
          {loading === 'single' ? 'Loading...' : (
            <>Single <br /> Player</>
          )}
        </button>
      </Link>
      <Link 
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }} 
        href={`/multi`}
        onClick={() => handleNavigation('multi')}
      >
        <button
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#e24a4a',
            border: 'none',
            borderRadius: '8px',
            cursor: loading === 'multi' ? 'wait' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: loading === 'multi' ? 0.7 : 1,
          }}
          className="room-select-button"
          disabled={loading !== null}
        >
          {loading === 'multi' ? 'Loading...' : (
            <>Multi <br /> Player</>
          )}
          <div style={{
            color: 'white',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
            fontSize: '20px',
            textAlign: 'center',
          }}>
            {/* ({loggedPlayer?.name}) */}
          </div>
        </button>
      </Link>
    </div>





    <div>
      {/* login with google button */}
      <button
        onClick={loginWithGoogle}
        disabled={loading !== null}
        className="bord-r-100 opaci-chov--75 room-select-button flex-row gap-2 flex-align-center pa-2 px-8 tx-shadow-5 tx-white "
        style={{
          backgroundColor: '#FFA500', // gamified orange
          border: 'none',

        }}
      >
        <div className='bg-white bord-r-100 pt-1 px-1'>
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
        </div>
        {loading === 'google' ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>



    




    <Link 
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }} 
        href={`/portals`}
        onClick={() => handleNavigation('portals')}
      >
        <button
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#00B30F',
            border: 'none',
            cursor: loading === 'portals' ? 'wait' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: loading === 'portals' ? 0.7 : 1,
          }}
          className="room-select-button bord-r-100"
          disabled={loading !== null}
        >
          {loading === 'portals' ? 'Loading...' : (
            <>Portals</>
          )}
          <div style={{
            color: 'white',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
            fontSize: '20px',
            textAlign: 'center',
          }}>
            {/* ({loggedPlayer?.name}) */}
          </div>
        </button>
      </Link>
   </>
  );
}
