
// Simple API proxy to handle requests that would normally go to a backend

// MongoDB connection info - in a real app, this would be in a backend environment file
const MONGODB_URI = "mongodb+srv://mhatredeep27:esSRaC9F8CRx8l9b@cluster0.j1cfvr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mock handler for the track-view endpoint
export const handleTrackView = async (requestData) => {
  console.log('Tracking user behavior:', requestData);
  
  // In a real app, this would connect to MongoDB and store the data
  // For now, we'll simulate a successful response
  
  // Log that we would save to MongoDB with the provided connection string
  console.log(`Would save to MongoDB at: ${MONGODB_URI}`);
  console.log('User:', requestData.userId);
  console.log('Content:', requestData.contentId, requestData.contentTitle);
  console.log('Action:', requestData.action);
  console.log('Timestamp:', requestData.timestamp);
  
  // Simulate a successful response after a short delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
};

// Mock handler for the track-auth endpoint (new)
export const handleTrackAuth = async (requestData) => {
  console.log('Tracking auth event:', requestData);
  
  // Log that we would save to MongoDB with the provided connection string
  console.log(`Would save to MongoDB at: ${MONGODB_URI}`);
  console.log('User:', requestData.userId);
  console.log('Action:', requestData.action);
  console.log('Timestamp:', requestData.timestamp);
  
  // Simulate a successful response after a short delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
};

// Mock handler for the user-watchlist endpoint (new)
export const handleWatchlistUpdate = async (requestData) => {
  console.log('Updating user watchlist:', requestData);
  
  // Log that we would save to MongoDB with the provided connection string
  console.log(`Would save to MongoDB at: ${MONGODB_URI}`);
  console.log('User:', requestData.userId);
  console.log('Action:', requestData.action);
  console.log('Content:', requestData.contentId, requestData.contentTitle);
  
  // Simulate a successful response after a short delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
};

// Intercept fetch calls to our simulated API endpoints
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // Handle our internal API endpoints
  if (url === '/api/track-view' && options?.method === 'POST') {
    const requestData = JSON.parse(options.body);
    const result = await handleTrackView(requestData);
    return {
      ok: true,
      json: async () => result
    };
  }
  
  // Handle auth tracking endpoint
  if (url === '/api/track-auth' && options?.method === 'POST') {
    const requestData = JSON.parse(options.body);
    const result = await handleTrackAuth(requestData);
    return {
      ok: true,
      json: async () => result
    };
  }
  
  // Handle watchlist updates
  if (url === '/api/user-watchlist' && options?.method === 'POST') {
    const requestData = JSON.parse(options.body);
    const result = await handleWatchlistUpdate(requestData);
    return {
      ok: true,
      json: async () => result
    };
  }
  
  // Pass through all other requests to the original fetch
  return originalFetch.apply(this, [url, options]);
};
