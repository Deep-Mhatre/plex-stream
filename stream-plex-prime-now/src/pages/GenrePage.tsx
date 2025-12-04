
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentRow from '@/components/ContentRow';
import { getMoviesByGenre } from '@/services/tmdbAPI';
import { toast } from 'sonner';
import { genreNameMapping } from '@/lib/genres';

const GenrePage = () => {
  const { genreSlug } = useParams();
  
  const genreName = genreNameMapping[genreSlug || ''] || 
    (genreSlug ? genreSlug.charAt(0).toUpperCase() + genreSlug.slice(1) : '');
  
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['moviesByGenre', genreSlug],
    queryFn: () => getMoviesByGenre(genreSlug || ''),
    meta: {
      onError: (error) => {
        console.error("Error fetching movies by genre:", error);
        toast.error("Failed to load genre content. Please try again later.");
      }
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{genreName} Movies & Shows</h1>
          
          {isLoading ? (
            <div className="container px-4 mx-auto py-20 flex justify-center">
              <div className="animate-pulse text-xl">Loading content...</div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-500">Failed to load content</p>
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
                title={`${genreName} Movies`}
                items={Array.isArray(movies) ? movies : []}
                type="movie"
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GenrePage;
