import Link from 'next/link'

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '20px', 
        zIndex: 1000,
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'white',
      }}
      className={className}
    >
      <Link className="tx-altfont-3 nodeco opaci-chov--50" href="/"
      style={{
        color: 'white',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
      }}
      >
        LANDXCAPE
      </Link>
    </div>
  )
} 