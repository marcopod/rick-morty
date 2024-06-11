'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema for the character data using Zod
const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string().optional(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  image: z.string().url(),
  episode: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string(),
});

type CharacterType = z.infer<typeof characterSchema>;

function CharacterList({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Attempting to fetch character ID:', params.id);
    fetch(`/api/findCharacter/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Validate the fetched data against the Zod schema
        const parseResult = characterSchema.safeParse(data);
        if (!parseResult.success) {
          throw new Error('Invalid character data');
        }

        setCharacter(parseResult.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>Loading character...</div>;
  if (error) return <div>Error fetching character: {error}</div>;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <a href="/" className="bg-indigo-600">
        Click to see all the characters
      </a>

      {character ? (
        <div className="flex flex-col mt-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md justify-center">
          <img src={character.image} alt={character.name} />
          <p className="text-center">
            {character.name} - {character.species} - {character.gender}
          </p>
          {character.location && (
            <p className="">Origin: {character.location.name}</p>
          )}
          {character.episode && (
            <ul>
              {character.episode.map((e, i) => {
                if (i < 10) return <li key={i}>{e}</li>;
              })}
            </ul>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CharacterList;
