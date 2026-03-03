
// User-related services for MongoDB tracking

const getWatchlistKey = (userId) => `watchlist:${userId}`;

// Add a movie/show to user's watchlist
export const addToWatchlist = async (userId, contentId, contentTitle, contentType, authToken) => {
  try {
    if (!userId || !authToken) return false;

    // 1. First update local storage
    const watchlistKey = getWatchlistKey(userId);
    const watchlistStr = localStorage.getItem(watchlistKey);
    const watchlist = watchlistStr ? JSON.parse(watchlistStr) : [];
    
    // Check if already in watchlist
    if (!watchlist.some(item => item.id === contentId)) {
      // Add to watchlist
      watchlist.push({
        id: contentId,
        title: contentTitle,
        type: contentType,
        addedAt: new Date().toISOString()
      });
      
      // Update localStorage
      localStorage.setItem(watchlistKey, JSON.stringify(watchlist));
    }
    
    // 2. Then track in MongoDB
    const response = await fetch('/api/user-watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        userId,
        contentId,
        contentTitle,
        contentType,
        action: 'add_to_watchlist',
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (userId, contentId, authToken) => {
  try {
    if (!userId || !authToken) return false;

    // 1. First update local storage
    const watchlistKey = getWatchlistKey(userId);
    const watchlistStr = localStorage.getItem(watchlistKey);
    let watchlist = watchlistStr ? JSON.parse(watchlistStr) : [];
    
    // Filter out the item
    watchlist = watchlist.filter(item => item.id !== contentId);
    
    // Update localStorage
    localStorage.setItem(watchlistKey, JSON.stringify(watchlist));
    
    // 2. Then track in MongoDB
    const response = await fetch('/api/user-watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        userId,
        contentId,
        action: 'remove_from_watchlist',
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

// Get user's watchlist
export const getUserWatchlist = (userId) => {
  try {
    if (!userId) return [];
    const watchlistKey = getWatchlistKey(userId);
    const watchlistStr = localStorage.getItem(watchlistKey);
    if (watchlistStr) {
      return JSON.parse(watchlistStr);
    }
    return [];
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
};

// Track user navigation
export const trackNavigation = async (userId, page, authToken) => {
  try {
    if (!userId || !authToken) return false;
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        userId,
        action: 'navigation',
        page,
        timestamp: new Date().toISOString(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error tracking navigation:', error);
    return false;
  }
};
