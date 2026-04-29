// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/",
  BACKDROP_SIZE: "original",
  POSTER_SIZE: "w500",
  PROFILE_SIZE: "w185",
};

// Api token from environment variables
export const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

// Validate token exists
if (!TMDB_TOKEN) {
  console.error("TMDB API token is missing! Please check your .env file");
  console.error("Make sure it starts with VITE_TMDB_API_TOKEN=");
}
