import { GameButton } from '../atom/game/GameButton'
import { Tooltip } from 'react-tooltip'

interface GameEngineNavProps {
  deleteMode: boolean;
  setDeleteMode: (value: boolean) => void;
  showClipboardButtons: boolean;
  setShowClipboardButtons: (value: boolean) => void;
  handleHelloClick: () => void;
  handleToggleAI: () => void;
  handleToggleTemplates: () => void;
  handleOpenSettings: () => void;
  handlePlay: () => void;
}

export function GameEngineNav({
  deleteMode,
  setDeleteMode,
  showClipboardButtons,
  setShowClipboardButtons,
  handleHelloClick,
  handleToggleAI,
  handleToggleTemplates,
  handleOpenSettings,
  handlePlay
}: GameEngineNavProps) {
  return (
    <div className='pos-abs top-0 right-0 ma-2 flex-col flex-align-end gap-2'>
      {deleteMode && (
        <div onClick={() => {
          setDeleteMode(false)
        }} className='tx-red tx-altfont- 2 opaci-50 opaci-chov--75 z-1000'>Exit Delete Mode</div>
      )}
      <div className='flex-row gap-2 mr- 1'>
        {!deleteMode && (
          <GameButton type="alpha" classOverride={'tx-mdl py-3 x px-3 z-100 mb-1 mr -1'} 
            onClick={handleHelloClick}
          >
            Add New
          </GameButton>
        )}
        {!showClipboardButtons && (
          <GameButton type="" classOverride={'tx-lg x px-2 3 z-100 mb-1 py-2 mr -1'} 
            tooltip="Clipboard"
            tooltipId="clipboard-tooltip"
            styleOverride={{
              // filter: 'saturate(0)',
            }}
            onClick={() => setShowClipboardButtons(!showClipboardButtons)}
          >
            📋
          </GameButton>
        )}
        {!!showClipboardButtons && (<div className='flex-wrap w-80px gap-2'>
          <GameButton type="epsilon" classOverride={'tx-mdl px-2 bord-r-100 z-100 '} 
            tooltip="Reset Scene"
            tooltipId='reset-scene-tooltip'
            styleOverride={{
            }}
            onClick={handleToggleAI}
          >
            R
          </GameButton>
          <GameButton type="" classOverride={'tx-mdl px-2 bord- r-100 z-100 '} 
            styleOverride={{
              // filter: 'saturate(0)',
            }}
            onClick={() => {
              setShowClipboardButtons(false)
            }}
          >
            X
          </GameButton>
          <GameButton type="zeta" 
            styleOverride={{
            }}
            tooltip="Copy Scene"
            tooltipId='copy-scene-tooltip'
            classOverride={'tx-mdl px-2 bord-r-100 3 z-100 '} 
            onClick={handleToggleTemplates}
          >
            C
          </GameButton>
          <GameButton type="zeta" 
            styleOverride={{
            }}
            tooltip="Paste Scene"
            tooltipId='paste-scene-tooltip'
            classOverride={'tx-mdl px-2 bord-r-100 z-100 '} 
            onClick={handleToggleTemplates}
          >
            P
          </GameButton>
        </div>)}
      </div>
      <div className='flex-row gap-2 mr- 1'>
        {!deleteMode && (
          <GameButton type="zeta" 
            styleOverride={{
              border: '1px solid #aa44aa',
            }}
            tooltip="Templates"
            tooltipId='templates-tooltip'
            tooltipPlace='bottom-end'
            classOverride={'tx-lgx px- 3 z-100 '} 
            onClick={handleToggleTemplates}
          >
            🗂️
          </GameButton>
        )}
        {!deleteMode && (
          <GameButton type="zeta" classOverride={'tx-lgx px- 3 z-100 '} 
            styleOverride={{
              border: '1px solid #ffaa44',
            }}
            tooltip="Create with AI"
            tooltipId='create-ai-tooltip'
            onClick={handleToggleAI}
          >
            🪄
          </GameButton>
        )}
      </div>
      <div className='flex-row-r gap-2 '>
        <GameButton type="white" classOverride={' bord-r-100 z-100 mr 1 1 mt-2'}
          onClick={handleOpenSettings}
        >
          <span className='px- 2 tx-lg' role="img" aria-label="cogwheel">⚙️</span>
        </GameButton>
        <div
          data-tooltip-id="play-tooltip"
          className={'hover-jump mr- opaci-chov--75 z-100 block pos-rel tx-shad ow-5 bg- glass-10 bord-r-100 p a-2 flex-col'}
          style={{
            textShadow: "2px 2px 0 #112244, 0 10px 10px #00000055",
          }}
          onClick={handlePlay}
        >
          <div className='tx-lx' aria-label="cogwheel">🎮</div>
        </div>
        <Tooltip id="play-tooltip" place="bottom-end">
          Play
        </Tooltip>
      </div>
    </div>
  )
} 