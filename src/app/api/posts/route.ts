import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    let posts

    if (userId && typeof userId === 'string') {
      posts = await prisma.post.findMany({
        where: {
          userId
        },
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    return NextResponse.json(null, { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await serverAuth()
    const { body } = await req.json()

    if (!currentUser) throw new Error('User not found')

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id
      }
    })

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json(null, { status: 400 })
  }
}
