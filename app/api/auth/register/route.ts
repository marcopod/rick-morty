import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Username and password are required' },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 }
    );
  }
}
