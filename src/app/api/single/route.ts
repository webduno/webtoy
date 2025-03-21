import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(req: NextRequest) {
  console.log("GET" , "GET")
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  console.log("ip" , ip)
  return NextResponse.json({ ip })
}