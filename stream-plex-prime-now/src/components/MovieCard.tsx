
import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  year: string;
  type?: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, year, type = 'movie' }) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}` 
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Link to={`/${type}/${id}`} className="movie-card block relative rounded-md overflow-hidden">
      <div className="aspect-[2/3] bg-secondary">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 card-gradient">
        <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
