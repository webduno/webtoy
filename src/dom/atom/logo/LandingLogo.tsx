"use client";


export const LandingLogo = () => {
  return (
    <a href="/" className=" tx-ls-3 nodeco opaci-chov--50 flex-row gap-1" style={{
      color: 'white',

      // marginBottom: '20px',
      textAlign: 'center',
    }}>
      <div style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.75)', }} className="tx-altfont-1 tx-lgx">WEB</div>
      <div className="tx-altfont-3 tx-xl" style={{
        color: 'orangered',
        textShadow: '2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff',
      }}>TOY</div>
    </a>
  );
};
