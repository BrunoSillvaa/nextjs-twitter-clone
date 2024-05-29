import serverAuth from '@/libs/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currentUser = await serverAuth()

    if (!currentUser) throw new Error('Nenhum usuario logado')

    return NextResponse.json(currentUser, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}
