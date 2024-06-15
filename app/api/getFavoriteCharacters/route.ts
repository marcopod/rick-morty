// /pages/api/getFavoriteCharacters.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const { userId } = await req.json();

    // Fetch favorite characters for the logged-in user
    const favoriteCharacters = await prisma.favoriteCharacter.findMany({
      where: {
        userId: userId,
      },
    });

    // Return the list of favorite characters
    return NextResponse.json(favoriteCharacters, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch favorite characters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
