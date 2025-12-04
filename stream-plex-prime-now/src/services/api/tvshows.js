
// TV Show-related TMDB API services

import { BASE_URL, options } from './config';

// Get popular TV shows
export const getPopularTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular`, options);
    const data = await response.json();
    return data.results.map(show => ({
      id: show.id,
      title: show.name,
      posterPath: show.poster_path,
      year: show.first_air_date ? show.first_air_date.substring(0, 4) : "",
      type: "tv"
    }));
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
};

// Get top rated TV shows (top 10)
export const getTopRatedTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/top_rated`, options);
    const data = await response.json();
    return data.results.slice(0, 10).map(show => ({
      id: show.id,
      title: show.name,
      posterPath: show.poster_path,
      year: show.first_air_date ? show.first_air_date.substring(0, 4) : "",
      type: "tv"
    }));
  } catch (error) {
    console.error("Error fetching top rated TV shows:", error);
    return [];
  }
};

// Get TV show details
export const getTVShowDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${id}`, options);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching TV show details for ID ${id}:`, error);
    return null;
  }
};

// Get TV show trailers
export const getTVShowTrailers = async (tvId) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvId}/videos`, options);
    const data = await response.json();
    
    // Filter for trailers and teasers
    const videos = data.results.filter(video => 
      video.type === 'Trailer' || video.type === 'Teaser'
    );
    
    return videos;
  } catch (error) {
    console.error(`Error fetching trailers for TV show ID ${tvId}:`, error);
    return [];
  }
};
