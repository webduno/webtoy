import Link from "next/link"


export const GameButton = ({children, onClick, type, classOverride, styleOverride}: {children: React.ReactNode, onClick?: () => void, type: string, classOverride?: string, styleOverride?: any }) => {
  return (
    <button
        onClick={onClick}
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
  )
}
