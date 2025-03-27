import React from 'react'

interface TutorialModalProps {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: TutorialModalProps) {
  return (
    <>
      <div className='pos-abs tx-shadow-5 top-0 right-0 mr-200 mt-0 tx-re d shake-1 tx-xl'
        style={{color:"#00ff00"}}>
        →
      </div>
      
      <div className="pos-abs tx-shadow-5 text-center bg-b-50 p-4 tx-white bord-r-10 pa-4 w-300px">
        <div 
          onClick={onClose}
          className="pos-abs top-0 right-0 ma-2 tx-lg opaci-50 opaci-chov--75 cursor-pointer"
          style={{ zIndex: 1001 }}
        >
          ✕
        </div>
        <p className="text-lg tx-altfont- tx-ls-1 mb-2 flex-col gap-">
          How to play <div className='flex-row gap-1 ml-1'>
            <div className="tx-altfont-1 tx-smd"
              style={{
                textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
              }}>WEB</div>
            <div className="tx-altfont-3 tx-lg"
              style={{
                color: 'orangered',
                textShadow: '1px 1px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff',
              }}
            >TOY</div>
          </div>
        </p>
        
        <p className='tx-lgx tx-altfont-1 mb-0 pb-1 '>
          Start by creating blocks, click <span className='tx-altfont-2'style={{color: '#00ff00'}}>"Add New"</span> and use the controls to move or rotate them.
        </p>
        <div className='flex-row flex-justify-around gap-2'>
          <div className='tx- border-white bord-r-10 pa-1'>Grab 🚶‍♂️</div>
          <div className='tx- border-white bord-r-10 pa-1'>Rotate 🔄</div>
          <div className='tx- border-white bord-r-10 pa-1'>Scale 📏</div>
        </div>
        <hr className='opaci-50 mt-4 w-100' />
        <p className='tx-mdl tx-altfont-1 flex-wrap'>
          <div>And then press play to</div>
          <div>start the game!</div>
          <div className='tx- border-white ml-2 mt-1 bord-r-10 pa-1'>Play 🎮</div>
        </p>
      </div>
    </>
  )
} 