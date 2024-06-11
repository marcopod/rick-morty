// /pages/api/favoriteCharacter.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    // Extracting userId and characterId from the request body.
    const { userId, characterId } = await req.json();

    if (!userId || !characterId) {
      return NextResponse.json(
        { error: 'userId and characterId are required' },
        { status: 400 }
      );
    }

    // Check if the favorite already exists
    const existingFavorite = await prisma.favoriteCharacter.findUnique({
      where: {
        userId_characterId: { userId: userId, characterId: characterId },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Favorite already exists' },
        { status: 409 }
      );
    }

    // Create a new favorite character
    const favorite = await prisma.favoriteCharacter.create({
      data: {
        userId: userId,
        characterId: characterId,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Failed to set favorite character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
