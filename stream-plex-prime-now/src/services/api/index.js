
// Re-export all API services for easier imports

// Movies
export { 
  getTrendingMovies,
  getFeaturedMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getMovieDetails,
  getHeroMovie,
  getMovieTrailers,
  getMoviesByGenre
} from './movies';

// TV Shows
export {
  getPopularTVShows,
  getTopRatedTVShows,
  getTVShowDetails,
  getTVShowTrailers
} from './tvshows';

// Search
export { searchMoviesAndShows } from './search';
