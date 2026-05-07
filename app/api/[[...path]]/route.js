import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.json({ message: 'Portfolio API', status: 'ok' })
}

export async function POST(request) {
  return NextResponse.json({ message: 'Portfolio API', status: 'ok' })
}
