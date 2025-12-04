
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { getFeaturedMovies, getTrendingMovies, getTopRatedMovies } from '@/services/tmdbAPI';
import { searchArchiveMovies } from '@/services/archiveAPI';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const { data: featuredMovies, isLoading: featuredLoading, error: featuredError } = useQuery({
    queryKey: ['featuredMovies'],
    queryFn: getFeaturedMovies,
    meta: {
      onError: (error) => {
        console.error("Error fetching featured movies:", error);
        toast.error("Failed to load featured movies. Please try again later.");
      }
    }
  });

  const { data: trendingMovies, isLoading: trendingLoading, error: trendingError } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: getTrendingMovies,
    meta: {
      onError: (error) => {
        console.error("Error fetching trending movies:", error);
        toast.error("Failed to load trending movies. Please try again later.");
      }
    }
  });

  const { data: topRatedMovies, isLoading: topRatedLoading, error: topRatedError } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: getTopRatedMovies,
    meta: {
      onError: (error) => {
        console.error("Error fetching top rated movies:", error);
        toast.error("Failed to load top rated movies. Please try again later.");
      }
    }
  });

  const { data: archiveMovies, isLoading: archiveLoading } = useQuery({
    queryKey: ['archiveMovies'],
    queryFn: () => searchArchiveMovies("", 1),
    meta: {
      onError: (error) => {
        console.error("Error fetching archive movies:", error);
        toast.error("Failed to load archive movies. Please try again later.");
      }
    }
  });

  const isLoading = featuredLoading || trendingLoading || topRatedLoading || archiveLoading;
  const hasError = featuredError || trendingError || topRatedError;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Movies</h1>
          
          {isLoading ? (
            <div className="container px-4 mx-auto py-20 flex justify-center">
              <div className="animate-pulse text-xl">Loading movies...</div>
            </div>
          ) : hasError ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-500">Failed to load movies</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <ContentRow 
                title="Featured Movies" 
                items={Array.isArray(featuredMovies) ? featuredMovies : []} 
                type="movie"
              />
              
              <ContentRow 
                title="Trending Now" 
                items={Array.isArray(trendingMovies) ? trendingMovies : []} 
                type="movie"
              />
              
              <ContentRow 
                title="Top 10 Movies" 
                items={Array.isArray(topRatedMovies) ? topRatedMovies : []} 
                type="movie"
              />
              
              <section className="py-6">
                <div className="container px-4 mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Public Domain Movies</h2>
                    <Link 
                      to="/archive" 
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      View All Archives
                    </Link>
                  </div>
                  
                  {Array.isArray(archiveMovies) && archiveMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {archiveMovies.slice(0, 6).map(movie => (
                        <Link 
                          key={movie.id}
                          to={`/archive/${movie.id}`}
                          className="block relative rounded-md overflow-hidden aspect-[2/3] bg-secondary"
                        >
                          {movie.thumbnailUrl ? (
                            <img 
                              src={movie.thumbnailUrl} 
                              alt={movie.title} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-secondary">
                              <Archive className="h-16 w-16 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-sm font-medium line-clamp-1 text-white">{movie.title}</h3>
                            <p className="text-xs text-gray-300">{movie.year}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-lg text-muted-foreground">Explore our collection of free public domain movies</p>
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = "/archive"}
                        className="mt-4"
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Browse Archive
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Movies;
