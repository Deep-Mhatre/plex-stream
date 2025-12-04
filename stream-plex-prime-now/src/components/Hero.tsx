
import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { getHeroMovie, getMovieTrailers } from '@/services/tmdbAPI';
import { trackTrailerView } from '@/services/userBehaviorService';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Mock user ID - in a real app, you would get this from authentication
  const mockUserId = "user123";

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        setLoading(true);
        const movie = await getHeroMovie();
        setHeroData(movie);
        
        // Fetch trailers
        if (movie) {
          const trailerData = await getMovieTrailers(movie.id);
          setTrailers(trailerData);
        }
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroMovie();
  }, []);

  const handlePlayTrailer = () => {
    if (trailers.length > 0) {
      setSelectedTrailer(trailers[0]);
      setTrailerOpen(true);
      
      // Track that the user watched a trailer
      if (heroData) {
        trackTrailerView(mockUserId, heroData.id, heroData.title);
      }
    }
  };

  if (loading) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="text-xl">Loading featured content...</div>
      </div>
    );
  }

  if (!heroData) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] bg-slate-900 flex items-center justify-center">
        <div className="text-xl">Failed to load featured content</div>
      </div>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/original${heroData.backdropPath}`;
  const releaseYear = heroData.releaseDate ? heroData.releaseDate.substring(0, 4) : "";
  const runtime = heroData.runtime ? `${Math.floor(heroData.runtime / 60)}h ${heroData.runtime % 60}m` : "";
  const genreText = heroData.genres?.map(g => g.name).join('/');

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col items-start max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-3">{heroData.title}</h1>
        <div className="flex gap-2 text-sm text-muted-foreground mb-4">
          <span>{releaseYear}</span>
          {runtime && (
            <>
              <span>•</span>
              <span>{runtime}</span>
            </>
          )}
          {genreText && (
            <>
              <span>•</span>
              <span>{genreText}</span>
            </>
          )}
        </div>
        <p className="text-base md:text-lg mb-6 max-w-2xl">
          {heroData.overview}
        </p>
        <div className="flex flex-wrap gap-4">
          {trailers.length > 0 ? (
            <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="rounded-full gap-2"
                  onClick={handlePlayTrailer}
                >
                  <Play className="h-5 w-5" />
                  Watch Trailer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-black">
                {selectedTrailer && (
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
                      title={selectedTrailer.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <Button size="lg" className="rounded-full gap-2" disabled>
              <Play className="h-5 w-5" />
              No Trailer Available
            </Button>
          )}
          <Link to={`/movie/${heroData.id}`}>
            <Button variant="secondary" size="lg" className="rounded-full gap-2">
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
