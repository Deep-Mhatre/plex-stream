
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Film, Tv, Award, Clock, Star, Heart, Users, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toggle } from '@/components/ui/toggle';

const categories = [
  { name: "Action", icon: <Zap className="h-5 w-5" />, slug: "action" },
  { name: "Drama", icon: <Award className="h-5 w-5" />, slug: "drama" },
  { name: "Comedy", icon: <Users className="h-5 w-5" />, slug: "comedy" },
  { name: "Sci-Fi", icon: <Globe className="h-5 w-5" />, slug: "sci-fi" },
  { name: "Horror", icon: <Zap className="h-5 w-5" />, slug: "horror" },
  { name: "Romance", icon: <Heart className="h-5 w-5" />, slug: "romance" },
  { name: "Documentary", icon: <Film className="h-5 w-5" />, slug: "documentary" },
  { name: "Animation", icon: <Film className="h-5 w-5" />, slug: "animation" },
  { name: "Thriller", icon: <Zap className="h-5 w-5" />, slug: "thriller" },
];

const contentTypes = [
  { name: "Movies", icon: <Film className="h-5 w-5" />, slug: "movies" },
  { name: "TV Shows", icon: <Tv className="h-5 w-5" />, slug: "tvshows" },
  { name: "Top Rated", icon: <Star className="h-5 w-5" />, slug: "top-rated" },
  { name: "New Releases", icon: <Clock className="h-5 w-5" />, slug: "new-releases" },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Categories</h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Browse by Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => (
                <Link 
                  key={type.slug} 
                  to={`/${type.slug}`}
                  className="bg-card hover:bg-card/80 border border-border rounded-lg p-6 flex flex-col items-center text-center transition-colors"
                >
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    {type.icon}
                  </div>
                  <h3 className="font-medium">{type.name}</h3>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/genre/${category.slug}`}
                  className="bg-card hover:bg-card/80 border border-border rounded-lg p-4 flex flex-col items-center text-center transition-colors"
                >
                  <div className="bg-primary/10 p-2 rounded-full mb-2">
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
