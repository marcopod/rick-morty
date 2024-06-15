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
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });

      // Fetch favorite characters from the API
      axios;
      axios
        .get('/api/getFavoriteCharacters', {
          params: {
            userId: Number(session.user.id),
          },
        })
        .then((response) => {
          const favoriteCharacterIds = response.data.map(
            (fav) => fav.characterId
          );
          setFavorites(favoriteCharacterIds);
          sessionStorage.setItem(
            'favorites',
            JSON.stringify(favoriteCharacterIds)
          );
        })
        .catch((error) => {
          console.error('Error fetching favorite characters:', error);
        });
    }
  }, [session, status]);

  const handleFavorite = (id: number) => {
    const isCurrentlyFavorite = favorites.includes(id);
    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    const apiUrl = isCurrentlyFavorite
      ? '/api/unfavoriteCharacter'
      : '/api/favoriteCharacter';

    axios
      .post(apiUrl, {
        userId: Number(session.user.id),
        characterId: Number(id),
      })
      .catch((error) => {
        console.error('Error updating favorite character in database:', error);
      });
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
              <img src={character.image} alt={character.name} />
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
