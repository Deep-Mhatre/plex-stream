
// User-related services for MongoDB tracking

// Add a movie/show to user's watchlist
export const addToWatchlist = async (userId, contentId, contentTitle, contentType) => {
  try {
    // 1. First update local storage
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      const watchlist = userData.watchlist || [];
      
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
        userData.watchlist = watchlist;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    
    // 2. Then track in MongoDB
    const response = await fetch('/api/user-watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const removeFromWatchlist = async (userId, contentId) => {
  try {
    // 1. First update local storage
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      let watchlist = userData.watchlist || [];
      
      // Filter out the item
      watchlist = watchlist.filter(item => item.id !== contentId);
      
      // Update localStorage
      userData.watchlist = watchlist;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // 2. Then track in MongoDB
    const response = await fetch('/api/user-watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const getUserWatchlist = () => {
  try {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      return userData.watchlist || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
};

// Track user navigation
export const trackNavigation = async (userId, page) => {
  try {
    const response = await fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
