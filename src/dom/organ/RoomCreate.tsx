"use client";
import Image from "next/image";
import Link from "next/link";
import { RoomButtons } from "../molecule/RoomButtons";
import { SessionProvider } from "next-auth/react";
export function RoomCreate({myip}: {myip: string}) {
  return (
    <SessionProvider>
      <div className="flex-col gap-2 flex-justify-center flex-align-center ">
        <div className="flex-col gap-2 flex-justify-center flex-align-center"
        style={{
        padding: '20px',
      }}>
        <a href="/" className=" tx-ls-3 nodeco opaci-chov--50 flex-row gap-1" style={{
          color: 'white',
          
          // marginBottom: '20px',
          textAlign: 'center',
        }}>
          <div style={{textShadow: '0 0 10px rgba(0, 0, 0, 0.75)',}} className="tx-altfont-1 tx-lgx">WEB</div>
          <div className="tx-altfont-3 tx-xl" style={{
            color: 'orangered',
            textShadow: '2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff',
          }}>TOY</div>
        </a>
        
        <div className=" bord-r-100 hover-4 mb-2" style={{border: '3px solid white'}}>
          <Image priority className=" block bord-r-100 box-shadow-2-b" src="/house.png" alt="logo" width={100} height={100} />
        </div>
        <RoomButtons myip={myip} />
      </div>
    </div>
    </SessionProvider>
  );
} 


