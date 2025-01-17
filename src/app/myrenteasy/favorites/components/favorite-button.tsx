import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  size?: number;
  initialState?: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

export const FavoriteButton = ({ 
  size = 24, 
  initialState = false, 
  onToggle 
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    setIsAnimating(true);
    onToggle?.(!isFavorite);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute top-2 right-3 group 
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none
      `}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isAnimating && isFavorite && (
        <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75" />
      )}
      <Heart
        size={size}
        className={`
          transition-all duration-300 ease-in-out
          transform-gpu
          ${isFavorite ? 'fill-red-500 text-white rotate-0' : 'fill-transparent fill-zinc-500 text-white rotate-0'}
          group-hover:text-white
          ${isAnimating && isFavorite ? 'scale-110 animate-bounce' : 'scale-100'}
          ${isAnimating && !isFavorite ? 'scale-90 -rotate-12' : ''}
        `}
      />
      {isFavorite && (
        <span className="absolute inset-0 animate-pulse rounded-full bg-red-200 opacity-0 group-hover:opacity-50" />
      )}
    </button>
  );
};
