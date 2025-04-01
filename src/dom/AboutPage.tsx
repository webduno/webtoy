
export function AboutPage() {
  return <div className="flex-col flex-align-center pt-100">
    <div className="tx-ls-3 pb-4 tx-altfont-4 game-font-2 tx-lx tx-center">About</div>
    <div className="w-100 pa-4 w-max-1080px">



      <div className='flex-col gap-2'>
        {/* <div>Game Pitch</div> */}
        <div className='w-300px'>

          WebTOY is a collaborative 3D sandbox for playing and building shareable interactive web minigames  with friends
        </div>
      </div>
      <hr className='w-100 my-6 opaci-50' />


      <div className='flex-row flex-align-center flex-justify-center gap-2 bg-white bord-r-100 pa-2'>
        <div>
          Built by
        </div>
        <div className='flex-row flex-align-center flex-justify-center gap-2'>
          <a href="https://x.com/webduno" target="_blank" rel="noopener noreferrer" title="Twitter"
            className='flex-row flex-align-center flex-justify-center gap-2'
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/120px-X_logo.jpg" alt="Twitter" width="24" height="24" />
            Webduno
          </a>
        </div>
      </div>

      <hr className='w-100 my-6 opaci-50' />




      <div className='flex-row flex-align-center flex-justify-center gap-2'>
        <div>Coded for #VibeJam</div>
        <a className='bord-r-10' target="_blank"
          href="https://jam.pieter.com"
          style={{
            fontFamily: 'system-ui, sans-serif',
            padding: '7px',
            fontSize: '14px',
            fontWeight: 'bold',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            //  borderTopLeftRadius: '12px', 
            zIndex: 10000,
            border: '1px solid #fff'
          }}>
          🎉 Vibe Jam 2025
        </a>

      </div>




      <hr className='w-100 my-6 opaci-50' />



      <div className='flex-col gap-2'>
        <div>Featured on Grokade</div>
        <a href="https://grokade.com/game/your-game-slug" target="_blank" rel="noopener noreferrer" title="Featured on Grokade">
          <img src="https://grokade.com/images/badges/grokade-vibe-neon.svg" alt="Featured on Grokade" width="180" height="60" className='pa-1' />
        </a>
      </div>





    </div>
  </div>;
}
