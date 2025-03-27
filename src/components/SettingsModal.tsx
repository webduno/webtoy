import { useRef, useEffect } from 'react';

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
  onOpenAI
}: SettingsModalProps) {
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    if (!hasPlayedSound.current) {
      const audio = new Audio('/click47.wav');
      audio.play().catch(error => console.log('Error playing sound:', error));
      hasPlayedSound.current = true;
    }
  }, []);

  return (
    <>
    <div className='bg-glass-10 pos-abs flex-col flex-align-center z-1000 bg-b-90 px-4 pb-4 bord-r-10'>
      <details>
        <summary className='flex opaci-chov--50 py-2 pt-6'>
        <button 
         className='tx-md bg-trans noclick noborder tx-white  opaci-25 tx-altfont-1 tx-ls-3 w-200px tx-center '>
          SCENE SETTINGS
          </button>

        </summary>
        <div className='flex-col w-100'>
      
      <button 
        onClick={() => {
          onAutorotate();
          onClose();
        }} 
        className='noborder bg-trans tx-white tx-lg py-4 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
      >
        Autorotate
      </button>
      <button 
        onClick={() => {
          onDeleteModeToggle(!deleteMode);
          onClose();
        }} 
        className='border-red bord-r-10 bg-trans tx-red tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1'
      >
        Delete Mode: {deleteMode ? 'ON' : 'OFF'}
      </button>
      <div className='flex-row gap-2'>
        <button 
          onClick={() => {
            onResetScene();
            onClose();
          }} 
          className='noborder bg-trans tx-white tx-mdl py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
        >
          Reset
        </button>
        <button 
          onClick={() => {
            onCopyContent();
            onClose();
          }} 
          className='noborder bg-trans tx-white tx-mdl py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
        >
          Copy
        </button>
        <button 
          onClick={() => {
            onPasteContent();
            onClose();
          }} 
          className='noborder bg-trans tx-white tx-mdl py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
        >
          Paste
        </button>
      </div>
      </div>
      </details>
      <div className='pos-abs flex-row gap-2 bottom-0 translate-y-100 pt-2'>
        
      <button
      style={{border:"1px solid #ffaa33"}}
       className='nowrap noborder bord-r-100 px-4 bg-b-90 tx-white tx-md py-2 tx-shadow-5 tx-altfont-1 opaci-chov--50 '
       onClick={() => {
        onOpenAI?.();
        onClose();
      }}
      >
        Create with AI 🪄
      </button>
      <button 
      style={{border:"1px solid #ff33ff"}}
        onClick={() => {
          onOpenTemplates();
          onClose();
        }} 
        className='nowrap noborder bord-r-100 px-4 bg-b-90 tx-white tx-md py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 '
      >
        Templates
      </button>
      </div>
    </div>
  </>);
} 