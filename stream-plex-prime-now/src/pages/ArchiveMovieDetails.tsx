
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getArchiveMovieDetails } from '@/services/archiveAPI';
import { toast } from 'sonner';
import { ArrowLeft, Info } from 'lucide-react';

const ArchiveMovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['archiveMovie', id],
    queryFn: () => id ? getArchiveMovieDetails(id) : null,
    meta: {
      onError: (error) => {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to load movie details. Please try again later.");
      }
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 mx-auto pt-24 pb-10 flex justify-center">
          <div className="animate-pulse text-xl">Loading movie details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 mx-auto pt-24 pb-10">
          <div className="text-center py-10">
            <p className="text-lg text-red-500">Failed to load movie details</p>
            <Link to="/archive">
              <Button className="mt-4">Return to Archive Movies</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <Link to="/archive" className="inline-flex items-center mb-6 text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Archive Movies
          </Link>
          
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {movie.year !== "Unknown year" && (
              <div className="bg-secondary rounded-full px-3 py-1 text-sm">{movie.year}</div>
            )}
            {movie.creator !== "Unknown creator" && (
              <div className="text-sm text-muted-foreground">By: {movie.creator}</div>
            )}
            <a 
              href={`https://archive.org/details/${movie.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary text-sm hover:underline"
            >
              <Info className="h-3 w-3 mr-1" /> View on Archive.org
            </a>
          </div>
          
          {movie.videoUrl ? (
            <div className="mb-8">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  src={movie.videoUrl} 
                  controls 
                  className="w-full h-full"
                  poster={movie.thumbnailUrl || undefined}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                This video is provided by the Internet Archive under their terms of use
              </p>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-muted rounded-lg text-center">
              <p>No playable video found for this movie.</p>
              <a 
                href={`https://archive.org/details/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block"
              >
                <Button>View on Archive.org</Button>
              </a>
            </div>
          )}
          
          {movie.description && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-2">About this movie</h2>
              <p>
                {typeof movie.description === 'string'
                  ? movie.description
                  : "No description available"}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArchiveMovieDetails;
