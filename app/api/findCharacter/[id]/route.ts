import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the schema for the ID parameter
const idSchema = z.object({
  id: z.string().min(1, 'Character ID is required'),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate the ID parameter
  const validationResult = idSchema.safeParse({ id });

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error.errors[0].message },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch character' },
        { status: response.status }
      );
    }

    const character = await response.json();
    return NextResponse.json(character);
  } catch (error) {
    // console.error('Failed to fetch character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
