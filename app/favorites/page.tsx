'use client';

import React, { useEffect, useState } from 'react';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

const FavoriteCharacters: React.FC = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites);
      fetchFavoriteCharacters(favoriteIds);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavoriteCharacters = async (ids: number[]) => {
    const characterPromises = ids.map((id) =>
      fetch(`/api/findCharacter/${id}`).then((response) => response.json())
    );
    try {
      const characters = await Promise.all(characterPromises);
      setFavoriteCharacters(characters);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading your favorite characters...</div>;
  if (!favoriteCharacters.length)
    return <div>No favorite characters selected.</div>;

  return (
    <div>
      <h1>Your Favorite Characters</h1>
      <div className="grid grid-cols-4 gap-4">
        {favoriteCharacters.map((character) => (
          <a
            href={`/c/${character.id}`}
            key={character.id}
            className="flex flex-col items-center"
          >
            <img src={character.image} className="rounded-full w-24 h-24" />
            <h3>{character.name}</h3>
            <p>{character.species}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCharacters;
