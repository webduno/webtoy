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
    <div className='pos-abs flex-col flex-align-center z-1000 bg-b-90 pa-4 bord-r-10'>
      <div className='tx-white pb-5 opaci-25 tx-altfont-1 tx-ls-3'>SETTINGS</div>
      <button 
        onClick={() => {
          onDeleteModeToggle(!deleteMode);
          onClose();
        }} 
        className='noborder bg-trans tx-red tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1'
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
      <button 
        onClick={() => {
          onAutorotate();
          onClose();
        }} 
        className='noborder bg-trans tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
      >
        Autorotate
      </button>
      <button 
        onClick={() => {
          onOpenTemplates();
          onClose();
        }} 
        className='noborder bord-r-100 px-4 bg-b-90 tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1 underline'
      >
        Templates →
      </button>
      <button className='noborder bord-r-100 px-4 bg-b-90 tx-white tx-lg py-2 opaci-50 tx-shadow-5 tx-altfont-1 underline mt-2'>
        Create with AI →
      </button>
    </div>
  );
} 