import axios from "axios";
import { API_CONFIG, TMDB_TOKEN } from "./config";

//  base configuration
const tmdbApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.status_message || "API request failed");
  } else if (error.request) {
    console.error("Network Error:", error.request);
    throw new Error("Network error - please check your connection");
  } else {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};

// API Service functions
const tmdbAPI = {
  getTrending: async () => {
    try {
      const response = await tmdbApi.get("/trending/movie/week");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Search movies by query
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get("/search/movie", {
        params: { query, page, include_adult: false },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Get popular movies
  getPopular: async (page = 1) => {
    const res = await tmdbApi.get("/movie/popular", {
      params: { page },
    });

    return res.data; // keep full response for pagination
  },

  //Get top rated movies
  getTopRated: async (page = 1) => {
    try {
      const response = await tmdbApi.get("/movie/top_rated", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Get now playing movies
  getNowPlaying: async (page = 1) => {
    try {
      const response = await tmdbApi.get("/movie/now_playing", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Get movie images/posters
  getMovieImages: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/images`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //Get movie videos/trailers
  getMovieVideos: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/videos`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  //get similar movies
  getSimilarMovies: async (id) => {
    try {
      const res = await tmdbApi.get(`/movie/${id}/similar`);
      return res.data.results;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  //get popular tvseries
  getPopularTV: async () => {
    try {
      const res = await tmdbApi.get("/tv/popular");
      return res.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  //get similar Tv-series
  getSimilarTV: async (id) => {
    try {
      const res = await tmdbApi.get(`/tv/${id}/similar`);
      return res.data;
    } catch (err) {
      console.error(err);
      return { results: [] };
    }
  },
};


export default tmdbAPI;
