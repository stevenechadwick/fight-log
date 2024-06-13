import { NextRequest, NextResponse } from "next/server"
import prisma from "@lib/prisma"
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        name: username
      }
    })

    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name: username,
        password: encryptedPassword
      }
    })

    if (!newUser) {
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: 'User created' }, { status: 201 })

  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}