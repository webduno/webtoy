"use client"
import Link from 'next/link';
import './styles.css';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export function RoomButtons({myip}: {myip: string}) {
  const { data: session } = useSession();
  const [loggedPlayer, setLoggedPlayer] = useState<{id:string, name:string} | null>({
    id:myip,
    name: myip
  });
  const [loading, setLoading] = useState<string | null>(null);

  const loginWithGoogle = async () => {
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
    setLoading(destination);
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
        style={{
          padding: '12px 24px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#ff9900',
          border: 'none',
          borderRadius: '8px',
          cursor: loading === 'google' ? 'wait' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textTransform: 'uppercase',
          opacity: loading === 'google' ? 0.7 : 1,
        }}
        onClick={loginWithGoogle}
        disabled={loading !== null}
      >
        {loading === 'google' ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
   </>
  );
}
