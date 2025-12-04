
// Archive.org API service to fetch public domain movies

// Function to search for movies in the Internet Archive
export const searchArchiveMovies = async (query = "", page = 1) => {
  try {
    // Base query to get movies from the "moviesandfilms" collection
    // Adding format:mp4 to ensure we get videos that can be played
    const baseQuery = "mediatype:(movies) AND format:(mp4 OR h.264)";
    const fullQuery = query ? `${baseQuery} AND (${query})` : baseQuery;
    const rows = 24; // Number of results per page
    
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(fullQuery)}&fl[]=identifier&fl[]=title&fl[]=description&fl[]=year&fl[]=mediatype&fl[]=thumbs&sort[]=downloads desc&rows=${rows}&page=${page}&output=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.response || !data.response.docs) {
      console.error("Invalid response format from Archive.org API");
      return [];
    }

    return data.response.docs.map(item => ({
      id: item.identifier,
      title: item.title || "Untitled",
      description: item.description || "No description available",
      year: item.year || "Unknown year",
      thumbnailUrl: item.thumbs && item.thumbs.length > 0 
        ? `https://archive.org/download/${item.identifier}/${item.thumbs[0]}` 
        : null,
    }));
  } catch (error) {
    console.error("Error fetching movies from Archive.org:", error);
    return [];
  }
};

// Function to get a specific movie's details and files
export const getArchiveMovieDetails = async (identifier) => {
  try {
    // Get metadata about the item
    const metadataUrl = `https://archive.org/metadata/${identifier}`;
    const metadataResponse = await fetch(metadataUrl);
    const metadata = await metadataResponse.json();
    
    if (!metadata || !metadata.metadata) {
      throw new Error("Invalid metadata response");
    }
    
    // Find video files (MP4, WebM, etc.)
    const files = metadata.files || [];
    const videoFiles = files.filter(file => 
      file.format && (
        file.format.toLowerCase().includes("mp4") || 
        file.format.toLowerCase().includes("webm") ||
        file.format.toLowerCase().includes("h.264") ||
        file.format.toLowerCase().includes("mpeg")
      )
    );
    
    // Sort by size (largest first) as a proxy for quality
    videoFiles.sort((a, b) => (b.size || 0) - (a.size || 0));
    
    // Get the highest quality video file
    const videoFile = videoFiles.length > 0 ? videoFiles[0] : null;
    const videoUrl = videoFile ? `https://archive.org/download/${identifier}/${videoFile.name}` : null;
    
    return {
      id: identifier,
      title: metadata.metadata.title || "Untitled",
      description: metadata.metadata.description || "No description available",
      year: metadata.metadata.year || "Unknown year",
      videoUrl: videoUrl,
      creator: metadata.metadata.creator || "Unknown creator",
      thumbnailUrl: metadata.misc?.image 
        ? `https://archive.org${metadata.misc.image}` 
        : null,
    };
  } catch (error) {
    console.error(`Error fetching details for movie ${identifier}:`, error);
    return null;
  }
};

// New function to get direct playable movie URLs
export const getPlayableMovieUrl = (movieId, videoPath) => {
  if (!movieId || !videoPath) return null;
  return `https://archive.org/download/${movieId}/${videoPath}`;
};
