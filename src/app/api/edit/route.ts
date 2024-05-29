import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  try {
    const currentUser = await serverAuth()

    if (!currentUser) throw new Error('User not found')

    const { name, username, bio, profileImage, coverImage } = await req.json()

    if (!name || !username) throw new Error('Missing fields')

    await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    })

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}
