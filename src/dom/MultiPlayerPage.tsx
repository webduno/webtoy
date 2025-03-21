"use client"
import { useEffect, useRef, useState  } from 'react'
import styles from '../app/multi/page.module.css'
import MultiPlayerStage, { MultiPlayerStageHandle } from '@/scenes/MultiPlayerStage'
import Logo from '@/components/Logo'
import { signIn, useSession } from 'next-auth/react'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export default function MultiPlayerPage() {
  const [myip, setMyip] = useState<string>()
  const fetchMyip = async () => {
    console.log("fetchMyip")
    const response = await fetch('/api/single')
    const data = await response.json()
    setMyip(data.ip)
    setFriends([
      { id: data.ip ?? '-', name: data.ip ?? '-', online: true }, // myself
    ])
    console.log("fetchMyip", data.ip)
  }
  useEffect(() => {
    fetchMyip()
  }, [])
  const stageRef = useRef<MultiPlayerStageHandle>(null)
  const [friends, setFriends] = useState<Friend[]>([])
  const [newFriendName, setNewFriendName] = useState<string>('')
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)

  const handleHelloClick = () => {
    console.log("handleHelloClickhandleHelloClickhandleHelloClick")
    stageRef.current?.createObject([0, 0, 0])
  }

  const handleAddFriend = () => {
    if (newFriendName.trim() === '') return;
    setFriends([...friends, { id: newFriendName, name: newFriendName, online: true }])
    setNewFriendName('')
  }

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {friends.length > 1 && (
      <div className={styles.helloWorld + ' opaci-chov--75'}
        style={{ position: 'absolute', top: '0', left: '0', margin: '10px', zIndex: 1000, cursor: 'pointer' }}
        onClick={handleHelloClick}
      >
        Add New
      </div>
    )}

      {/* Google Login button in top right only if not logged in */}
      {!session && (
        <div
          style={{ position: 'absolute', top: '0', right: '0', margin: '10px', zIndex: 1000 }}
        >
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="opaci-chov--75 bord-r-100 flex-row flex-align-center py-1 px-2 pr-3 gap-1"  
          style={{
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Login
        </button>
      </div>
      )}

      {/* if only 1 friend (self) show message */}
      {friends.length === 1 && (
        <div style={{textAlign: 'center', }}>
          <div>Add a friend <br /> to start playing!</div>
          
      <div className={styles.playerList}
        style={{  }}
      >
        {/* <h2>Connected Players</h2> */}
        {myip && <>
          <ul>
            {/* dont show myself */}
            {friends.filter(friend => friend.id !== myip).map(friend => (
              <li key={friend.id}>{friend.name}</li>
            ))}
            {/* add new friend input   */}
            <li className="flex-row gap-2 flex-align-center">
              <input
                className="tx-altfont-1 py-1  bord-r-10"
                type="text"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
              />
              <button 
                onClick={handleAddFriend}
                style={{
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  marginLeft: '8px',
                  cursor: 'pointer',
                  fontFamily: '"Bytesized", sans-serif',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="tx-altfont-3 opaci-chov--75"
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Add
              </button>
            </li>
          </ul>
          </>}
        </div>
        </div>
      )}

      {/* only if more than 1 friend */}
      {friends.length > 1 && (
        <MultiPlayerStage ref={stageRef} friends={friends} />
      )}
      
      {friends.length === 1 &&
        <Logo />
      }


      {/* put ip in the bottom right if its not logged with google */}
      {!session && (
        <div className='opaci-50' style={{ position: 'absolute', bottom: '0', right: '0', margin: '10px', zIndex: 1000 }}>
          <div>{myip}</div>
        </div>
      )}
      {/* put email in the bottom right if its logged with google */}
      {session && (
        <div className='opaci-50' style={{ position: 'absolute', bottom: '0', right: '0', margin: '10px', zIndex: 1000 }}>
          <div>{session.user?.email}</div>
        </div>
      )}
    </>
  )
} 