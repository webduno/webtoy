"use client"
import { useEffect, useRef, useState  } from 'react'
import styles from '../app/multi/page.module.css'
import MultiPlayerStage, { MultiPlayerStageHandle } from '@/scenes/MultiPlayerStage'
import Logo from '@/components/Logo'
import { signIn, useSession } from 'next-auth/react'
import GoogleLoginButton from '@/components/GoogleLoginButton'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export default function MultiPlayerPage() {
  const [myip, setMyip] = useState<string>()
  const [lastFriend, setLastFriend] = useState<string>('')
  const fetchMyip = async () => {
    console.log("fetchMyip")
    const response = await fetch('/api/single')
    const data = await response.json()
    setMyip(data.ip)
    setFriends([
      { id: data.ip ?? '-', name: data.ip ?? '-', online: true }, // myself
    ])
    
    // Load last friend from localStorage
    const savedFriend = localStorage.getItem('lastFriend')
    if (savedFriend) {
      setLastFriend(savedFriend)
    }
    
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
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const handleHelloClick = () => {
    console.log("handleHelloClickhandleHelloClickhandleHelloClick")
    stageRef.current?.createObject([0, 0, 0], [1, 1, 1], [0, 0, 0])
  }
  const handleOpenSettings = () => {
    setShowSettings(!showSettings)
  }
  const handleAddFriend = (newAltFriend = "") => {
    const theNewName = newFriendName || newAltFriend
    if (theNewName.trim() === '') return;
    setFriends([...friends, { id: theNewName, name: theNewName, online: true }])
    
    // Save to localStorage
    localStorage.setItem('lastFriend', theNewName)
    setLastFriend(theNewName)
    
    setNewFriendName('')
  }
  const handleResetScene = () => {
    stageRef.current?.resetScene()
    // close settings
    setShowSettings(false)
  }
  const handleCopyContent = () => {
    stageRef.current?.copyContent()
    // close settings
    setShowSettings(false)
  }
  const handlePasteContent = () => {
    stageRef.current?.pasteContent()
    // close settings
    setShowSettings(false)
  }

  const loginWithGoogle = async () => {
    return signIn("google");
  }

  return (
    <>


    {showSettings && (<>
    <div className='pos-abs  flex-col flex-align-center 2 z-1000 bg-b-90 pa-4 bord-r-10' >
      <div className='tx-white  pb-5 opaci-25 tx-altfont-1 tx-ls-3'>SETTINGS</div>
      <button onClick={() => {
        setDeleteMode(!deleteMode)
        setShowSettings(false)
      }} className='noborder bg-trans tx-red tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 '>Delete  Mode: {deleteMode ? 'ON' : 'OFF'}</button>
      <button onClick={handleResetScene} className='noborder bg-trans tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'>Reset Scene</button>
      <button onClick={handleCopyContent} className='noborder bg-trans tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'>Copy Content</button>
      <button onClick={handlePasteContent} className='noborder bg-trans tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'>Paste Content</button>
      <div className='tx-white tx-lg py-2  tx-shadow-5 tx-altfont-1 opaci-50'>Add via AI (Soon)</div>
    </div>
    </>)
}
    {friends.length > 1 &&  (<>
    <div className='pos-abs top-0 right-0 ma-2 flex-col flex-align-end gap-2'>
      {/* if not delete mode show hello world */}
      {deleteMode && (
        <div onClick={() => {
          setDeleteMode(false)
        }} className='tx-red tx-altfont-2 opaci-50 opaci-chov--75 z-1000'>DELETE MODE: ON</div>
      )}
      {!deleteMode && (
        <div className={styles.helloWorld + ' opaci-chov--75 z-100 block pos-rel'}
          onClick={handleHelloClick}
      >
        Add New
      </div>
      )}
      <div className={styles.helloWorld + ' opaci-chov--75 z-100 block pos-rel'}
        onClick={handleOpenSettings}
      >
        {/* cogwheel emoji */}
        <span role="img" aria-label="cogwheel">⚙️</span>
      </div>

      </div>
    </>
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
              <div className='flex-col'>
              <input
                className="tx-altfont-1 py-1  bord-r-10"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddFriend()
                  }
                }}
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
              />
              </div>
              <button 
                onClick={() => handleAddFriend()}
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
              {lastFriend && (<>
              <div className='tx-start '>
                <div className='opaci-50 tx-sm'>Last added: </div> 
                <span 
                  onClick={() => {
                    handleAddFriend(lastFriend)
                    // setTimeout(() => handleAddFriend(), 100)
                  }}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: '#4a90e2',
                    fontSize: '0.9rem',
                    marginRight: '8px'
                  }}
                  className="opaci-chov--75 tx-start"
                >
                  {lastFriend}
                </span> 
                </div>
              </> )}
        </div>
        </div>
      )}

      {/* only if more than 1 friend */}
      {friends.length > 1 && (
        <MultiPlayerStage ref={stageRef} friends={friends} deleteMode={deleteMode} />
      )}
      
        <Logo />


      {/* Google Login button in top right only if not logged in */}
      {!session && (
        <div className='flex-col gap-2 flex-justify-right flex-align-end'
          style={{ position: 'absolute', bottom: '0', right: '0', margin: '10px', zIndex: 1000 }}
        >
          <div className='tx-sm'>
            <div className='bg-white bord-r-100 opaci-50 py-1 px-2'>IP | {myip}</div>
          </div>
          <GoogleLoginButton onLogin={loginWithGoogle} />
        </div>
      )}
      {/* put ip in the bottom right if its not logged with google */}
      {!session && (
        <div className='opaci-50' style={{ position: 'absolute', bottom: '0', right: '0', margin: '10px', zIndex: 1000 }}>
        </div>
      )}
      {/* put email in the bottom right if its logged with google */}
      {session && (
        <div className='opaci-50' style={{ position: 'absolute', bottom: '0', right: '0', margin: '10px', zIndex: 1000 }}>
          <div className='tx-white tx-shadow-5'>{session.user?.email}</div>
        </div>
      )}
    </>
  )
} 