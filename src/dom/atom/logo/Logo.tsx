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
      <Link className="tx-altfont-3 nodeco opaci-chov--50 flex-row gap-1" href="/"
      style={{
        color: 'white',
      }}
      >
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
      </Link>
    </div>
  )
} 