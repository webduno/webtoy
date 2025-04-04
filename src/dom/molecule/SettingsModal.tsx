import { useRef, useEffect, useState } from 'react';
import { GameButton } from '../atom/game/GameButton';
import { ModalCloseButton } from '../atom/game/ModalCloseButton';


interface SettingsModalProps {
  onClose: () => void;
  onDeleteModeToggle: (value: boolean) => void;
  deleteMode: boolean;
  onResetScene: () => void;
  onCopyContent: () => void;
  onPasteContent: () => void;
  onAutorotate: () => void;
  onOpenTemplates: () => void;
  onOpenAI?: () => void;
  spawnCoords: string;
  setSpawnCoords: (coords: string) => void;
  ballCount: string;
  setBallCount: (count: string) => void;
}

export default function SettingsModal({
  onClose,
  onDeleteModeToggle,
  deleteMode,
  onResetScene,
  onCopyContent,
  onPasteContent,
  onAutorotate,
  onOpenTemplates,
  onOpenAI,
  spawnCoords,
  setSpawnCoords,
  ballCount,
  setBallCount
}: SettingsModalProps) {
  const hasPlayedSound = useRef(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  useEffect(() => {
    if (!hasPlayedSound.current) {
      const audio = new Audio('/click47.wav');
      audio.play().catch(error => console.log('Error playing sound:', error));
      hasPlayedSound.current = true;
    }
  }, []);

  return (
    <>
    <div className=' pos-abs flex-col flex-align-center z-1000 px-4 pb-4 bord-r-5'
    style={{
      boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
      background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
    }}
    >
      {/* <div 
        onClick={() => {
          onClose();
        }}
        
        className="pos-abs  bg-black px-2 py-1 bord-r-100 top-0 right-0 ma-2 tx-lg opaci-50 opaci-chov--75 cursor-pointer tx-white text-shadow-5"
        style={{ zIndex: 1001, transform: 'translate(125%, -125%)' }}
      >
        ✕
      </div> */}
      <ModalCloseButton  onClose={onClose} />
      <details>
        <summary className='flex opaci-chov--50 py-2 pt-6'
        onClick={() => {
          setSettingsDropdown(!settingsDropdown)
        }}
        >
        <button 
         className='tx-md bg-trans noclick noborder tx-white  opaci-75  tx-shadow-5 tx-altfont-4 tx-ls-2 w-200px tx-center '>
          SCENE SETTINGS {!settingsDropdown ? '+' : '-'} 
          </button>

        </summary>
        <div className='flex-col w-100 pt-4'>
      
      <div className='flex-row gap-3'>
      <div className='flex-col gap-1'>
        <label htmlFor="spawnCoords">Spawn</label>
        <input type="text" id="spawnCoords" placeholder='Spawn Coords'
        className='game-text-input mb-2 bord-r-100 tx-center py-1 w-80px' 
        value={spawnCoords}
        onChange={(e) => {
          // has to be 0,0,0 format
          
          setSpawnCoords(e.target.value);
        }}
        />
      </div>
        
      <div className='flex-col gap-1'>
      <label htmlFor="ballCount">Balls</label>
        <input type="number" id="ballCount" placeholder='Ball Count'
        className='game-text-input mb-2 bord-r-100 tx-center py-1 w-50px' 
        min={0}
        value={ballCount}
        onChange={(e) => {
          setBallCount(e.target.value);
        }}
        />
      </div>
      </div>
      {/* <div className='flex-row gap-2'>
        <GameButton 
          buttonType="zeta"
          onClick={() => {
            onCopyContent();
          }} 
          classOverride='tx-mdl'
        >
          Copy
        </GameButton>
        <GameButton 
          buttonType="zeta"
          onClick={() => {
            onPasteContent();
          }} 
          classOverride='tx-mdl'
        >
          Paste
        </GameButton>
        <GameButton 
          buttonType="epsilon"
          onClick={() => {
            onResetScene();
          }} 
          classOverride='tx-mdl'
        >
          Reset
        </GameButton>
        
      </div> */}
      {/* <hr className='w-100 opaci-20 my-2' /> */}
      <div className='flex-col gap-2'>
      <GameButton 
        buttonType="zeta"
        onClick={() => {
          onAutorotate();
          onClose();
        }} 
        classOverride='tx-lg'
      >
        Autorotate
      </GameButton>
      <GameButton 
        buttonType="gamma"
        onClick={() => {
          onDeleteModeToggle(!deleteMode);
          onClose();
        }} 
        classOverride='tx-mdl'
        // className='border-red bord-r-10 bg-trans tx-red tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1'
      >
        Delete Mode: {deleteMode ? 'ON' : 'OFF'}
      </GameButton>
      <button 
        onClick={() => {
          const confirm = prompt("This will delete all your data and settings\nAre you sure you want to factory reset? (yes)");
          if(confirm){
            window.localStorage.clear();
            window.location.href = '/';
          }
        }} 
        className='noborder pt-2  bg-trans tx-white tx-sm py4 opaci-chov--50 tx-shadow-5 tx-altfont-1 tx-red'
      >
        Factory Reset
      </button>
      </div>
      </div>
      </details>
      <div className='pos-abs flex-row gap-2 bottom-0 translate-y-100 pt-2'>
        
      <GameButton 
          buttonType="delta"
          onClick={() => {
            onOpenTemplates();
            onClose();
          }} 
          classOverride='px-1 tx-mdl'
        >
          🗂️ <br /> Templates 
        </GameButton> 
        <GameButton
        buttonType="delta"
        onClick={() => {
          onOpenAI?.();
          onClose();
        }} 
        classOverride='px-1 tx-mdl nowrap'
        >
          🪄 <br /> Create with AI 
        </GameButton>
        
        
      {/* <button 
      style={{border:"1px solid #ff33ff"}}
        onClick={() => {
          onOpenTemplates();
          onClose();
        }} 
        className='nowrap noborder bord-r-100 px-4 bg-b-90 tx-white tx-md py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 '
      >
        Templates
      </button>
      <button
      style={{border:"1px solid #ffaa33"}}
       className='nowrap noborder bord-r-100 px-4 bg-b-90 tx-white tx-md py-2 tx-shadow-5 tx-altfont-1 opaci-chov--50 '
       onClick={() => {
        onOpenAI?.();
        onClose();
      }}
      >
        Create with AI 🪄
      </button> */}
      </div>
    </div>
  </>);
} 


