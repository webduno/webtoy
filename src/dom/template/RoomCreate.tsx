"use client";
import Image from "next/image";
import Link from "next/link";
import { RoomButtons } from "../molecule/RoomButtons";
import { SessionProvider } from "next-auth/react";
import { LandingLogo } from "../atom/logo/LandingLogo";
export function RoomCreate({myip}: {myip: string}) {
  return (
    <SessionProvider>
      <div className="flex-col gap-2 flex-justify-center flex-align-center ">
        <div className="flex-col gap-2 flex-justify-center flex-align-center"
        style={{
        padding: '20px',
      }}>
        <LandingLogo />
        
        <div className=" bord-r-100 hover-4 mb-2" style={{border: '3px solid white'}}>
          <Image priority className=" block bord-r-100 box-shadow-2-b" src="/house.png" alt="logo" width={100} height={100} />
        </div>
        <RoomButtons myip={myip} />
      </div>
    </div>
    </SessionProvider>
  );
} 



