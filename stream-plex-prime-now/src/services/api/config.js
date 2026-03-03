
// API configuration for TMDB

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
export const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN || "";
export const BASE_URL = "https://api.themoviedb.org/3";

export const buildUrl = (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (API_KEY) {
    url.searchParams.set("api_key", API_KEY);
  }
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    ...(BEARER_TOKEN ? { Authorization: `Bearer ${BEARER_TOKEN}` } : {}),
  },
};

export const fetchJson = async (path, params = {}) => {
  try {
    const response = await fetch(buildUrl(path, params), options);
    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("TMDB request error:", error);
    return null;
  }
};
