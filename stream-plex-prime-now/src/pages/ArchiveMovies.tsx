
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchArchiveMovies } from '@/services/archiveAPI';
import { toast } from 'sonner';
import ArchiveMovieCard from '@/components/ArchiveMovieCard';
import { Search } from 'lucide-react';

const ArchiveMovies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: archiveMovies, isLoading, error, refetch } = useQuery({
    queryKey: ['archiveMovies', activeQuery, currentPage],
    queryFn: () => searchArchiveMovies(activeQuery, currentPage),
    meta: {
      onError: (error) => {
        console.error("Error fetching archive movies:", error);
        toast.error("Failed to load movies from Internet Archive. Please try again later.");
      }
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
    setCurrentPage(1);
    refetch();
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Internet Archive Movies</h1>
          
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search public domain movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-2">
              Browse and watch public domain movies from the Internet Archive
            </p>
          </div>
          
          {isLoading ? (
            <div className="container px-4 mx-auto py-20 flex justify-center">
              <div className="animate-pulse text-xl">Loading movies from Internet Archive...</div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-lg text-red-500">Failed to load movies from Internet Archive</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => refetch()}
              >
                Try Again
              </button>
            </div>
          ) : !archiveMovies || archiveMovies.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">No movies found</p>
              <p className="text-muted-foreground">Try a different search term or browse our featured content</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {archiveMovies.map(movie => (
                  <ArchiveMovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    thumbnailUrl={movie.thumbnailUrl}
                  />
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-8"
                >
                  {isLoading ? "Loading..." : "Load More Movies"}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArchiveMovies;
