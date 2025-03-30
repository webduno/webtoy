import Link from "next/link"
import { Tooltip } from 'react-tooltip'

export const GameButton = ({
  children, 
  onClick, 
  type, 
  classOverride, 
  styleOverride, 
  tooltip,
  tooltipId,
  tooltipPlace,
  ...props
}: {
  children: React.ReactNode, 
  onClick?: () => void, 
  type: string, 
  classOverride?: string, 
  styleOverride?: any, 
  tooltip?: string,
  tooltipId?: string,
  tooltipPlace?: string,
  props?: any 
}) => {
  return (
    <>
      {/* @ts-ignore */}
      <button
        {...props}
        onClick={onClick}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        data-tooltip-place={tooltipPlace || 'bottom-end'}
        data-tooltip-variant="light"
        className={`game-btn-${type}
            game-btn-base
            pointer
            noborder bord-r-10 pa-1 tx-white tx-shadow-5 tx-altfont-4
            ${classOverride}
        `}
        style={styleOverride}
      >
        {children}
      </button>
      {tooltip && <Tooltip 
      id={tooltipId} 
      place="bottom-start"
      style={{
        zIndex: 10000,
      }}
      />}
    </>
  )
}
