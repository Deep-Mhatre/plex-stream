
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchableMovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  year: string;
  watchLink: string;
}

const WatchableMovieCard: React.FC<WatchableMovieCardProps> = ({ 
  id, 
  title, 
  posterPath, 
  year, 
  watchLink 
}) => {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}` 
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open a new window with an optimized Google Drive embed
    const videoWindow = window.open('', '_blank');
    
    if (videoWindow) {
      videoWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Watch ${title}</title>
          <style>
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
            .video-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <div class="video-container">
            <iframe 
              src="${watchLink}" 
              frameborder="0" 
              width="100%" 
              height="100%" 
              allowfullscreen="true" 
              mozallowfullscreen="true" 
              webkitallowfullscreen="true">
            </iframe>
          </div>
        </body>
        </html>
      `);
      videoWindow.document.close();
    }
  };

  return (
    <div className="movie-card block relative rounded-md overflow-hidden">
      <Link to={`/movie/${id}`}>
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
      <div className="absolute top-2 right-2">
        <Button 
          variant="default" 
          size="sm" 
          className="rounded-full bg-primary/80 hover:bg-primary"
          onClick={handleWatchClick}
        >
          <Play className="h-4 w-4 mr-1" />
          Watch
        </Button>
      </div>
    </div>
  );
};

export default WatchableMovieCard;
