
import React from 'react';
import { ChevronRight } from 'lucide-react';
import WatchableMovieCard from './WatchableMovieCard';
import { Link } from 'react-router-dom';

interface WatchableContentRowProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    posterPath: string;
    year: string;
    watchLink: string;
  }>;
  slug?: string;
}

const WatchableContentRow: React.FC<WatchableContentRowProps> = ({ title, items, slug }) => {
  // Ensure items is always an array, even if it's null, undefined or an empty object
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <section className="py-6 bg-gradient-to-r from-primary/5 to-primary/10">
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
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {safeItems.map(item => (
            <WatchableMovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              posterPath={item.posterPath}
              year={item.year}
              watchLink={item.watchLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WatchableContentRow;
