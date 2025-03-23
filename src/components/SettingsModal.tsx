import { useRef } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  onDeleteModeToggle: (value: boolean) => void;
  deleteMode: boolean;
  onResetScene: () => void;
  onCopyContent: () => void;
  onPasteContent: () => void;
  onAutorotate: () => void;
  onOpenTemplates: () => void;
}

export default function SettingsModal({
  onClose,
  onDeleteModeToggle,
  deleteMode,
  onResetScene,
  onCopyContent,
  onPasteContent,
  onAutorotate,
  onOpenTemplates
}: SettingsModalProps) {
  return (
    <>
    <div className='bg-glass-10 pos-abs flex-col flex-align-center z-1000 bg-b-90 pa-4 bord-r-10'>
      <div className='tx-white  opaci-25 tx-altfont-1 tx-ls-3'>SETTINGS</div>
      
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
      <div className='pos-abs flex-row gap-2 bottom-0 translate-y-100 pt-2'>
        
      <button className='nowrap noborder bord-r-100 px-4 bg-b-90 tx-white tx-md py-2 opaci-50 tx-shadow-5 tx-altfont-1  '>
        Create with AI
      </button>
      <button 
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