import Link from 'next/link'

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        top: '0px', 
        left: '0px', 
        zIndex: 1000,
        fontWeight: 'bold',
        color: 'white',
      }}
      className={className || "pa-2 px-3"}
    >
      <Link className="tx-altfont-3 nodeco opaci-chov--50 flex-row" href="/"
      style={{
        color: 'white',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
      }}
      >
        <div className="tx-altfont-2 tx-smd">WEB</div>
        <div className="tx-altfont-3 tx-mdl">TOY</div>
      </Link>
    </div>
  )
} 