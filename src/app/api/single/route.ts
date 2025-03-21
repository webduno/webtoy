import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(req: NextRequest) {
  const someip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  console.log("GET" , "GET", someip)
  
  // Get the headers object
  const headersList = headers()
  
  // Try multiple header fields that might contain the client IP
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  const cfConnectingIp = headersList.get('cf-connecting-ip')
  console.log("forwardedFor", forwardedFor)
  console.log("realIp", realIp)
  console.log("cfConnectingIp", cfConnectingIp)
  // Use the first available IP or fallback to default
  let ip = '127.0.0.1'
  if (forwardedFor) {
    ip = forwardedFor.split(',')[0].trim()
  } else if (realIp) {
    ip = realIp
  } else if (cfConnectingIp) {
    ip = cfConnectingIp
  }
  
  console.log("ip", ip)
  return NextResponse.json({ ip, headers: Object.fromEntries(headersList.entries()) })
}