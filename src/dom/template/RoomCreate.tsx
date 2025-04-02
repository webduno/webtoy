"use client";
import Image from "next/image";
import Link from "next/link";
import { RoomButtons } from "../molecule/RoomButtons";
import { SessionProvider } from "next-auth/react";
import { LandingLogo } from "../atom/logo/LandingLogo";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function RoomCreate({myip}: {myip: string}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const username = searchParams.get('username');
    const ref = searchParams.get('ref');

    if (username && ref) {
      localStorage.setItem('PLAYER_ID', username);
      localStorage.setItem('REF_ID', ref);
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/portals?${params.toString()}`);
    } else if (username) {
      localStorage.setItem('PLAYER_ID', username);
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/portals?${params.toString()}`);
    } else if (ref) {
      localStorage.setItem('PLAYER_ID', ref);
      const params = new URLSearchParams(searchParams.toString());
      params.set('username', ref);
      router.push(`/portals?${params.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <SessionProvider>
      <div className="flex-col gap-2 flex-justify-center flex-align-center ">
        <div className="flex-col gap-2 flex-justify-center flex-align-center"
        style={{
        paddingBottom: '40px',
      }}>
        <div className="flex-col translate-y--25">
        <LandingLogo />
        <div className="noselect bord-r-100 hover-4 mb-2" style={{border: '3px solid white'}}>
          <Image priority className=" block bord-r-100 box-shadow-2-b" src="/house.png" alt="logo" width={100} height={100} />
        </div>
        </div>
        <RoomButtons myip={myip} />
      </div>

      <div className='pos-abs right-0 bottom-0 mb-8 flex-col gap-2 flex-align-end tx-'>
                       <Link className='px-2 tx-center block tx-altfont-1 tx-bold'
              style={{color:"#4a90e2"}}
               prefetch={false} href="/about">About</Link>
      <Link className='px-2 tx-center block tx-altfont-1 tx-bold'
              style={{color:"#4a90e2"}}
               prefetch={false} href="/public">Public Maps</Link>
            </div>


    </div>
    </SessionProvider>
  );
} 



