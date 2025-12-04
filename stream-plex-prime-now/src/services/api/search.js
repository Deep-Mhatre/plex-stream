
// Search-related TMDB API services

import { BASE_URL, options } from './config';

// Search movies and TV shows
export const searchMoviesAndShows = async (query) => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      options
    );
    const data = await response.json();
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .map(item => ({
        id: item.id,
        title: item.media_type === 'movie' ? item.title : item.name,
        posterPath: item.poster_path,
        year: item.media_type === 'movie' 
          ? (item.release_date ? item.release_date.substring(0, 4) : '')
          : (item.first_air_date ? item.first_air_date.substring(0, 4) : ''),
        type: item.media_type
      }));
  } catch (error) {
    console.error("Error searching:", error);
    return [];
  }
};
