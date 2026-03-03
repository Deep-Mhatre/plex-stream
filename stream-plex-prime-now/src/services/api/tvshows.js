
// TV Show-related TMDB API services

import { fetchJson } from './config';

// Get popular TV shows
export const getPopularTVShows = async () => {
  try {
    const data = await fetchJson("/tv/popular");
    if (!data?.results) return [];
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
    const data = await fetchJson("/tv/top_rated");
    if (!data?.results) return [];
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
    return await fetchJson(`/tv/${id}`);
  } catch (error) {
    console.error(`Error fetching TV show details for ID ${id}:`, error);
    return null;
  }
};

// Get TV show trailers
export const getTVShowTrailers = async (tvId) => {
  try {
    const data = await fetchJson(`/tv/${tvId}/videos`);
    if (!data?.results) return [];
    
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
