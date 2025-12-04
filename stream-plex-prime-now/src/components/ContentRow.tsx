
import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

interface ContentRowProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    posterPath: string;
    year: string;
  }>;
  type?: 'movie' | 'tv';
  slug?: string;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, type = 'movie', slug }) => {
  // Ensure items is always an array, even if it's null, undefined or an empty object
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <section className="py-6">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          {slug && (
            <Link 
              to={`/${slug}`} 
              className="flex items-center text-sm text-primary hover:underline"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {safeItems.map(item => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              posterPath={item.posterPath}
              year={item.year}
              type={type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentRow;
