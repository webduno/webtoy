"use client"
import { useEffect, useRef, useState  } from 'react'
import styles from '../app/multi/page.module.css'
import MultiPlayerStage, { MultiPlayerStageHandle } from '@/scenes/MultiPlayerStage'
import Logo from '@/components/Logo'

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

  const handleHelloClick = () => {
    stageRef.current?.createObject([0, 0, 0])
  }

  const handleAddFriend = () => {
    if (newFriendName.trim() === '') return;
    setFriends([...friends, { id: newFriendName, name: newFriendName, online: true }])
    setNewFriendName('')
  }

  return (
    <>
      <div className={styles.helloWorld + ' opaci-chov--75'}
        style={{ position: 'absolute', top: '0', left: '0', margin: '10px', zIndex: 1000, cursor: 'pointer' }}
        onClick={handleHelloClick}
      >
        Add New
      </div>
      <div className={styles.playerList}
        style={{ position: 'absolute', top: '0', right: '0', margin: '10px', zIndex: 1000 }}
      >
        <h2>Connected Players</h2>
        {myip && <>
          <ul>
            {friends.map(friend => (
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

      {/* if only 1 friend (self) show message */}
      {friends.length === 1 && (
        <div style={{textAlign: 'center', }}>
          <div>Add a friend <br /> to start playing!</div>
        </div>
      )}

      {/* only if more than 1 friend */}
      {friends.length > 1 && (
        <MultiPlayerStage ref={stageRef} friends={friends} />
      )}
      
      <Logo />
    </>
  )
} 