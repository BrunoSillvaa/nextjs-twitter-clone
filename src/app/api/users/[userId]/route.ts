import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: {
    userId: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams ) {
  const { userId } = params

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId}
    })

    const followersCount = await prisma.user.count({
      where: {
        followingsIds: { has: userId}
      }
    })

    if (!user) {
      throw new Error('Invalid user')
    }

    return NextResponse.json({ ...user, followersCount}, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(null, { status: 400 })
  }
}