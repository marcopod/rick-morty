import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch characters' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
