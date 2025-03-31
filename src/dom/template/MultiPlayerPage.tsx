"use client"
import { useEffect, useRef, useState  } from 'react'
import styles from '../../app/multi/page.module.css'
import MultiPlayerStage, { MultiPlayerStageHandle } from '@/model/scenes/MultiPlayerStage'
import Logo from '@/dom/atom/logo/Logo'
import { signIn, useSession } from 'next-auth/react'
import GoogleLoginButton from '@/dom/atom/auth/GoogleLoginButton'
import FirstPersonView from '@/model/controller/FirstPersonView'
import CanonPOV from '@/model/controller/CanonPOV'
import { DEFAULT_TEMPLATE_LIST } from '@/scripts/helpers/sceneTemplates'
import SettingsModal from '@/dom/molecule/SettingsModal'
import TemplatesModal from '@/dom/molecule/TemplatesModal'
import TutorialModal from '@/dom/molecule/TutorialModal'
import { AiModal } from '../molecule/AiModal'
import { clearPhysicsState } from '@/model/physics/PhysicalObjects'
import { GameEngineNav } from '../molecule/GameEngineNav'
import { GameButton } from '../atom/game/GameButton'
import { UsernameInputContainer } from '../molecule/UsernameInputContainer'
import { Tooltip } from 'react-tooltip'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export default function MultiPlayerPage() {
  const [myip, setMyip] = useState<string>()
  const [lastFriend, setLastFriend] = useState<string>('')
  const fetchMyip = async () => {
    // console.log("fetchMyip")
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
    
    // console.log("fetchMyip", data.ip)
  }
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playPosition, setPlayPosition] = useState<[number, number, number]>([0, 0, 0])
  const [spawnCoords, setSpawnCoords] = useState<string>('2,2,2')
  
  const handlePlay = () => {
    try {
      if(!spawnCoords.match(/^-?\d+,-?\d+,-?\d+$/)){
        alert('Invalid spawn coords');
        return;
      }
      // Parse the coordinates string into an array of numbers
      const coords = spawnCoords.split(',').map(Number)
      
      // Check if we have exactly 3 valid numbers
      if (coords.length !== 3 || coords.some(isNaN)) {
        throw new Error("Invalid coordinates format")
      }
      
      // Set the play position and activate first-person mode
      setPlayPosition([coords[0], coords[1], coords[2]])
      setIsPlaying(true)
      setShowSettings(false)
    } catch (error) {
      alert("Invalid coordinates. Please use format: x,y,z")
    }
  }
  
  const handleExitPlay = () => {
    setIsPlaying(false)
    clearPhysicsState()
  }
  useEffect(() => {
    fetchMyip()
    // Load username from localStorage if it exists
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])
  const stageRef = useRef<MultiPlayerStageHandle>(null)
  const [friends, setFriends] = useState<Friend[]>([])
  const [newFriendName, setNewFriendName] = useState<string>('')
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showTemplates, setShowTemplates] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [hasObjects, setHasObjects] = useState<boolean>(false)
  // get templates from sceneTemplates.ts
  const [templates, setTemplates] = useState<{name: string, description: string}[]>(
    // only first 4 elements
    DEFAULT_TEMPLATE_LIST
  )
  const [showTutorial, setShowTutorial] = useState<boolean>(true)
  const [showAiModal, setShowAiModal] = useState<boolean>(false)
  const [showClipboardButtons, setShowClipboardButtons] = useState<boolean>(false)
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [username, setUsername] = useState('');

  // Check for objects when component mounts
  useEffect(() => {
    const objects = stageRef.current?.getSceneObjects?.() || []
    // Get the storage key based on friends
    const storageKey = friends.length > 1 
      ? `multiplayer_scene>>>${friends[0].id},${friends.slice(1).map(f => f.id).sort().join(',')}`
      : 'multiplayer_scene'
    const hasSavedContent = window?.localStorage?.getItem?.(storageKey) !== null
    setHasObjects(objects.length > 0 || hasSavedContent)
  }, [friends])

  const handleHelloClick = () => {
    stageRef.current?.createObject([1, 1, 1], [0, 0, 0])
    setHasObjects(true)
    setIsAdding(true)
  }
  const handleOpenSettings = () => {
    setShowSettings(!showSettings)
    setShowTemplates(false)
    setShowTutorial(false)
    setShowAiModal(false)
  }
  const handleToggleTemplates = () => {
    setShowTemplates((prev) => !prev)
    setShowSettings(false)
    setShowTutorial(false)
  }
  const handleToggleAI = () => {
    setShowSettings(false)
    setShowAiModal((prev) => !prev)
    setShowTutorial(false)
  }
  const handleLoadTemplate = (templateName: string) => {
    console.log(`Loading template: ${templateName}`)
    // Call loadTemplate directly with the template name
    stageRef.current?.loadTemplate(templateName)
    setShowTemplates(false)
    setHasObjects(true)
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
    // setShowSettings(false)
  }
  const handleCopyContent = () => {
    stageRef.current?.copyContent()
    // close settings
    // setShowSettings(false)
  }
  const handlePasteContent = () => {
    stageRef.current?.pasteContent()
    // close settings
    setShowSettings(false)
    setShowTutorial(false)

  }
  const handleAutorotate = () => {
    stageRef.current?.autorotate()
    // close settings
    setShowSettings(false)
  }


  const loginWithGoogle = async () => {
    return signIn("google");
  }

  return (
    <>
      {/* {isPlaying && (
        <FirstPersonView 
          position={playPosition} 
          sceneObjects={stageRef.current?.getSceneObjects() || []}
          onExit={handleExitPlay} 
        />
      )} */}

      {isPlaying && (
        <CanonPOV
          position={playPosition} 
          sceneObjects={stageRef.current?.getSceneObjects() || []}
          onExit={handleExitPlay} 
        />
      )}

      {!isPlaying && (
        <>
          {showAiModal && (
            <AiModal
              onClose={() => {
                setShowAiModal(false);
                setShowSettings(true);
              }}
            />
          )}
          {showSettings && (
            <SettingsModal
              onClose={() => setShowSettings(false)}
              onDeleteModeToggle={setDeleteMode}
              deleteMode={deleteMode}
              onResetScene={handleResetScene}
              onCopyContent={handleCopyContent}
              onPasteContent={handlePasteContent}
              onAutorotate={handleAutorotate}
              onOpenTemplates={handleToggleTemplates}
              onOpenAI={handleToggleAI}
              spawnCoords={spawnCoords}
              setSpawnCoords={setSpawnCoords}
            />
          )}
          
          {showTemplates && (
            <TemplatesModal
              templates={templates}
              onLoadTemplate={handleLoadTemplate}
              onClose={() => {
                setShowTemplates(false);
                setShowSettings(true);
              }}
            />
          )}
          
          {friends.length > 1 &&  (<>
            <GameEngineNav
              deleteMode={deleteMode}
              setDeleteMode={setDeleteMode}
              showClipboardButtons={showClipboardButtons}
              setShowClipboardButtons={setShowClipboardButtons}
              handleHelloClick={handleHelloClick}
              handleToggleAI={handleToggleAI}
              handleToggleTemplates={handleToggleTemplates}
              handleOpenSettings={handleOpenSettings}
              handlePlay={handlePlay}
              handleResetScene={handleResetScene}
              handleCopyContent={handleCopyContent}
              handlePasteContent={handlePasteContent}
              isAdding={isAdding}
            />
          </>)}
          {/* asd
          
          */}
          
          
      {friends.length === 1 &&  !username && (
        <div className='tx-altfont-4 pb-2 tx-lx game-font-1 tx-center'>
          Enter Your <br /> Username 
        </div>
      )}
              <div className='tx-altfont-4 tx-white tx-shadow-5 tx-lg pa-2 flex-row gap-2 pr-3 bord-r-5'
                data-tooltip-id="username-tooltip"
                data-tooltip-place='bottom'
                style={{
                boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
      background: "linear-gradient(180deg, #F5D67B, #D4A35E)",

              }}
              >
                <div className='bg-white bord-r-100 pa-1 tx-lgx '
                >
                  <div className='noclick'>
                🙍🏻
                </div>
                </div>
                <Tooltip id="username-tooltip">
                  You
                </Tooltip>
      <UsernameInputContainer autosave={false} onUsernameChange={setUsername} username={username} />
      </div>

      {friends.length === 1 &&  !username && (<>
      {/* <div className='tx-white tx-altfont-4 tx-lgx game-font-1'>or</div> */}
        <GameButton 
        type='alpha'
        classOverride='tx-altfont-4 tx-lg opaci-chov--50 nowrap px-4 mt-2 '
        onClick={() => {
          console.log('continue as guest', friends[0].name)
          setUsername(friends[0].name)
        }}
        >
          
          Continue as Guest
        </GameButton>
        </>
      )}
      
      {friends.length === 1 &&  !username && (
        <div className='h-200px'>
        </div>
      )}
          
          
          {/* if only 1 friend (self) show message */}
          {friends.length === 1 &&  !!username && (
            <div style={{textAlign: 'center', }}>
              <div className={"bord-r-5 pa-4"}
                style={{ 
                  boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
                  background: "linear-gradient(0deg, #F5D67B, #D4A35E)",
                 }}
              >
              <div className='tx-altfont-4 pb-2 tx-lx game-font-2'>
                Add a friend <br /> to start playing!
              </div>
              
                {/* <h2>Connected Players</h2> */}
                {myip &&  <>
                  <ul>
                    {/* dont show myself */}
                    {friends.filter(friend => friend.id !== myip).map(friend => (
                      <li key={friend.id}>{friend.name}</li>
                    ))}
                    {/* add new friend input   */}
                    <li className="flex-row gap-2 flex-align-center">
                      <div className='flex-col flex-justify-center flex-align-center'>
                      <input
                        placeholder="Enter Player ID"
                        className="tx-altfont-1 py-1 tx-center  bord-r-10 game-text-input"
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
                      <GameButton type='alpha' 
                        onClick={() => handleAddFriend()}
  classOverride='tx-md '                        
                      >
                        Add
                      </GameButton>
                    </li>
                  </ul>
                </>}
                {!lastFriend && (<>
              <div className='opaci-25 '>
                <div>Enter Email, Username or IP</div>
                {/* <div>NOT USERNAME*</div> */}
              </div>
                </>)}
                {!!lastFriend && (<>
                  <div className='tx-end '>
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
            <>
              <MultiPlayerStage 
                ref={stageRef} 
                friends={friends} 
                deleteMode={deleteMode} 
                setIsAdding={setIsAdding}
                isAdding={isAdding}
              />
              {!hasObjects && showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
            </>
          )}
          
          <Logo />

          {/* Google Login button in top right only if not logged in */}
          {!session && (
            <div className='flex-col gap-2 flex-justify-start flex-align-start'
              style={{ position: 'absolute', bottom: '0', left: '0', margin: '10px', zIndex: 1000 }}
            >
              {/* <div className='tx-sm'>
                <div className='bg-white bord-r-100 opaci-50 py-1 px-2'>IP | {myip}</div>
              </div> */}
              <GoogleLoginButton onLogin={loginWithGoogle} />
            </div>
          )}
          {/* put ip in the bottom left if its not logged with google */}
          {!session && (
            <div className='opaci-50' style={{ position: 'absolute', bottom: '0', left: '0', margin: '10px', zIndex: 1000 }}>
            </div>
          )}
          {/* put email in the bottom left if its logged with google */}
          {session && (
            <div className='opaci-50' style={{ position: 'absolute', bottom: '0', left: '0', margin: '10px', zIndex: 1000 }}>
              <div className='tx-white tx-shadow-5'>{session.user?.email}</div>
            </div>
          )}
        </>
      )}
    </>
  )
} 