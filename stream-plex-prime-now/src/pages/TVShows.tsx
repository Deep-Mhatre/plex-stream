
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { getPopularTVShows, getTopRatedTVShows } from '@/services/tmdbAPI';
import { searchArchiveMovies } from '@/services/archiveAPI';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

const TVShows = () => {
  const { data: popularTVShows, isLoading: popularLoading, error: popularError } = useQuery({
    queryKey: ['popularTVShows'],
    queryFn: getPopularTVShows,
    meta: {
      onError: (error) => {
        console.error("Error fetching popular TV shows:", error);
        toast.error("Failed to load popular TV shows. Please try again later.");
      }
    }
  });

  const { data: topRatedTVShows, isLoading: topRatedLoading, error: topRatedError } = useQuery({
    queryKey: ['topRatedTVShows'],
    queryFn: getTopRatedTVShows,
    meta: {
      onError: (error) => {
        console.error("Error fetching top rated TV shows:", error);
        toast.error("Failed to load top rated TV shows. Please try again later.");
      }
    }
  });

  // Adding archive query for classic TV shows
  const { data: archiveShows, isLoading: archiveLoading } = useQuery({
    queryKey: ['archiveShows'],
    queryFn: () => searchArchiveMovies("subject:(television)", 1),
    meta: {
      onError: (error) => {
        console.error("Error fetching archive TV shows:", error);
        toast.error("Failed to load archive TV shows. Please try again later.");
      }
    }
  });

  const isLoading = popularLoading || topRatedLoading || archiveLoading;
  const hasError = popularError || topRatedError;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">TV Shows</h1>
          
          {isLoading ? (
            <div className="container px-4 mx-auto py-20 flex justify-center">
              <div className="animate-pulse text-xl">Loading TV shows...</div>
            </div>
          ) : hasError ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-500">Failed to load TV shows</p>
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
                title="Popular TV Shows" 
                items={Array.isArray(popularTVShows) ? popularTVShows : []} 
                type="tv"
              />
              <ContentRow 
                title="Top Rated TV Shows" 
                items={Array.isArray(topRatedTVShows) ? topRatedTVShows : []} 
                type="tv"
              />
              
              <section className="py-6">
                <div className="container px-4 mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Classic Television Archives</h2>
                    <Link 
                      to="/archive" 
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      View All Archives
                    </Link>
                  </div>
                  
                  {Array.isArray(archiveShows) && archiveShows.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {archiveShows.slice(0, 6).map(show => (
                        <Link 
                          key={show.id}
                          to={`/archive/${show.id}`}
                          className="block relative rounded-md overflow-hidden aspect-[2/3] bg-secondary"
                        >
                          {show.thumbnailUrl ? (
                            <img 
                              src={show.thumbnailUrl} 
                              alt={show.title} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-secondary">
                              <Archive className="h-16 w-16 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-sm font-medium line-clamp-1 text-white">{show.title}</h3>
                            <p className="text-xs text-gray-300">{show.year}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-lg text-muted-foreground">Discover classic television in our free archives</p>
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

export default TVShows;
