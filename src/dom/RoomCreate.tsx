"use client";
import { RoomButtons } from "./RoomButtons";
import { SessionProvider } from "next-auth/react";
export function RoomCreate({myip}: {myip: string}) {
  return (
    <SessionProvider>
      <div className="flex-col gap-2 flex-justify-center flex-align-center ">
        <div className="flex-col gap-2 flex-justify-center flex-align-center"
        style={{
        padding: '20px',
      }}>
        <div className="tx-altfont-3 tx-ls-3" style={{
          color: 'white',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',
          fontSize: '40px',
          marginBottom: '20px',
          textAlign: 'center',
        }}>LANDXCAPE</div>
        <RoomButtons myip={myip} />
      </div>
    </div>
    </SessionProvider>
  );
} 


