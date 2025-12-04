
// Re-export all API services for easier imports

// Movies
export { 
  getTrendingMovies,
  getFeaturedMovies,
  getTopRatedMovies,
  getMovieDetails,
  getHeroMovie,
  getMovieTrailers,
  getMoviesByGenre,
  getBestMoviesOfAllTime
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
