'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Favorite_icon from '@/public/Favorite_icon';
import axios from 'axios';

function CharacterList() {
  const { data: session, status } = useSession(); // Destructure session data and status from the useSession hook
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/getAllCharacter')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCharacters(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });

      // Load favorites from sessionStorage when the component mounts
      const storedFavorites = sessionStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [session]);

  const handleFavorite = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id) // If already favorited, remove it
      : [...favorites, id]; // If not favorited, add it
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    const favoriteInDatabase = async () => {
      try {
        await axios.post('/api/favoriteCharacter', {
          userId: Number(session.user.id),
          characterId: Number(id),
        });
      } catch (error) {
        console.error('Error setting a favorite character in database', error);
      }
    };
    favoriteInDatabase();
  };

  if (status === 'unauthenticated') {
    router.push('/login');
    return (
      <button onClick={() => router.push('/login')}>
        Please authenticate...
      </button>
    );
  }
  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error fetching characters: {error}</div>;

  return (
    <div>
      <a href="/favorites" className="bg-indigo-600">
        Click to see your favorite characters {session?.user?.username}
      </a>
      <div className="grid grid-cols-4 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="flex flex-col items-center">
            <a
              href={`/c/${character.id}`}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md flex justify-center flex-col"
            >
              <img src={character.image}></img>
              <p className="text-center">
                {character.name} - {character.species}
              </p>
            </a>
            <button
              className="flex justify-center"
              title="favorite"
              onClick={() => handleFavorite(character.id)}
            >
              <Favorite_icon
                color={favorites.includes(character.id) ? '#F67E4B' : '#B4B4B4'}
                hoverColor="#F67E4B"
                className="favorite-svg-hover"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
