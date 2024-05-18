import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(
  req: NextRequest,
  res: NextResponse
) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users , { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(null, { status: 400 })
  }
}