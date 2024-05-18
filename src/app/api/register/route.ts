import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const { email, username, name, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 12)

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email }
    })
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'Email already exists' },
        { status: 409 }
      )
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username }
    })
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'Username already exists' },
        { status: 409 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(
      { user: newUser, message: 'User created sucessfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { user: null, message: 'User created failed', error },
      { status: 400 }
    )
  }
}
