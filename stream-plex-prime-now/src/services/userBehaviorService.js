
// User behavior tracking service for MongoDB

const MONGODB_URI = "mongodb+srv://mhatredeep27:esSRaC9F8CRx8l9b@cluster0.j1cfvr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Track user view of movie
export const trackMovieView = async (userId, movieId, movieTitle) => {
  try {
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: movieId,
        contentTitle: movieTitle,
        contentType: 'movie',
        action: 'view',
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking movie view:', error);
    return false;
  }
};

// Track user watching trailer
export const trackTrailerView = async (userId, movieId, movieTitle) => {
  try {
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: movieId,
        contentTitle: movieTitle,
        contentType: 'movie',
        action: 'trailer_view',
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking trailer view:', error);
    return false;
  }
};

// Track user watching full movie
export const trackWatchMovie = async (userId, movieId, movieTitle) => {
  try {
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: movieId,
        contentTitle: movieTitle,
        contentType: 'movie',
        action: 'watch_movie',
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking movie watch:', error);
    return false;
  }
};

// Track user watching full TV show
export const trackWatchTVShow = async (userId, showId, showTitle, episode = null) => {
  try {
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        contentId: showId,
        contentTitle: showTitle,
        contentType: 'tv',
        action: 'watch_show',
        episode,
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking TV show watch:', error);
    return false;
  }
};
