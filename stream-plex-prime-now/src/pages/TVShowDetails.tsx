
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTVShowDetails, getTVShowTrailers } from '@/services/tmdbAPI';
import { trackTrailerView } from '@/services/userBehaviorService';
import { toast } from 'sonner';

const TVShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Mock user ID - in a real app, you would get this from authentication
  const mockUserId = "user123";

  useEffect(() => {
    const fetchTVShow = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getTVShowDetails(id);
        setShow(data);
        
        if (data) {
          // Fetch trailers
          const trailerData = await getTVShowTrailers(id);
          setTrailers(trailerData);
        }
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        toast.error("Failed to load TV show details");
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id]);

  const handlePlayTrailer = (trailer) => {
    setSelectedTrailer(trailer);
    setTrailerOpen(true);
    
    // Track that the user watched a trailer
    if (show) {
      trackTrailerView(mockUserId, show.id, show.name);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-10 container mx-auto px-4 flex justify-center">
          <div className="animate-pulse text-xl">Loading TV show details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-10 container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">TV Show Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const backdropUrl = show.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : null;
    
  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const firstAirYear = show.first_air_date ? show.first_air_date.substring(0, 4) : "";
  const lastAirYear = show.last_air_date && show.status === "Ended" 
    ? show.last_air_date.substring(0, 4) 
    : "Present";
  const yearRange = firstAirYear ? `${firstAirYear} - ${lastAirYear}` : "";
  
  const genres = show.genres?.map(g => g.name).join(', ');
  const creators = show.created_by?.map(c => c.name).join(', ');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-sm hover:text-primary">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        {/* Hero backdrop */}
        {backdropUrl && (
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
        
        {/* Show details */}
        <div className={`container mx-auto px-4 ${backdropUrl ? '-mt-32 relative z-10' : 'mt-8'}`}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <img 
                src={posterUrl} 
                alt={show.name} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            {/* Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{show.name}</h1>
              
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                {yearRange && <span>{yearRange}</span>}
                {show.number_of_seasons && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{show.number_of_seasons} {show.number_of_seasons === 1 ? 'Season' : 'Seasons'}</span>
                  </>
                )}
                {genres && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{genres}</span>
                  </>
                )}
                {show.vote_average && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" /> {show.vote_average.toFixed(1)}
                    </span>
                  </>
                )}
              </div>
              
              {show.tagline && (
                <p className="text-lg italic text-muted-foreground mb-4">{show.tagline}</p>
              )}
              
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="mb-6">{show.overview}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {trailers.length > 0 && (
                  <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="rounded-full gap-2"
                        onClick={() => handlePlayTrailer(trailers[0])}
                      >
                        <Play className="h-5 w-5" />
                        Watch Trailer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 bg-black">
                      <DialogTitle className="sr-only">Trailer for {show.name}</DialogTitle>
                      <DialogDescription className="sr-only">Watch the trailer for {show.name}</DialogDescription>
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
                )}
              </div>
              
              {/* Additional info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creators && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Created by</h3>
                    <p>{creators}</p>
                  </div>
                )}
                
                {show.networks?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Networks</h3>
                    <p>{show.networks.map(n => n.name).join(', ')}</p>
                  </div>
                )}
                
                {show.spoken_languages?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Languages</h3>
                    <p>{show.spoken_languages.map(l => l.english_name).join(', ')}</p>
                  </div>
                )}
              </div>
              
              {/* Trailers section */}
              {trailers.length > 1 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Trailers & Teasers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trailers.map((trailer) => (
                      <Dialog key={trailer.id}>
                        <DialogTrigger asChild>
                          <div 
                            className="cursor-pointer relative aspect-video bg-gray-900 rounded-lg overflow-hidden"
                            onClick={() => handlePlayTrailer(trailer)}
                          >
                            <img 
                              src={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`} 
                              alt={trailer.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                            <p className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-sm truncate">
                              {trailer.name}
                            </p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 bg-black">
                          <DialogTitle className="sr-only">Trailer: {trailer.name}</DialogTitle>
                          <DialogDescription className="sr-only">Watch the trailer for {show.name}</DialogDescription>
                          <div className="aspect-video w-full">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                              title={trailer.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Seasons section if we wanted to add that */}
              {show.seasons && show.seasons.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Seasons</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {show.seasons.map((season) => (
                      <div key={season.id} className="bg-card rounded-lg overflow-hidden shadow">
                        <div className="aspect-[2/3] bg-secondary">
                          {season.poster_path ? (
                            <img 
                              src={`https://image.tmdb.org/t/p/w300${season.poster_path}`} 
                              alt={season.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                              <span>No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{season.name}</h3>
                          <p className="text-sm text-muted-foreground">{season.episode_count} Episodes</p>
                          {season.air_date && (
                            <p className="text-sm text-muted-foreground">{new Date(season.air_date).getFullYear()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TVShowDetails;
