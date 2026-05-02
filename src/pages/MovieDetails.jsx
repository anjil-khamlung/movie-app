import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_CONFIG } from "../services/config";
import tmdbAPI from "../services/tmdbAPI";
import {
  FaStar,
  FaRegClock,
  FaDownload,
  FaPlay,
  FaPlayCircle,
} from "react-icons/fa";
import { PiFilmStrip, PiUsers, PiFlagBanner } from "react-icons/pi";
import MovieCard from "../components/MovieCard";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);

useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
      setLoading(true);

      const [movieData, creditsData, relatedData] = await Promise.all([
        tmdbAPI.getMovieDetails(id),

        fetch(`${API_CONFIG.BASE_URL}/movie/${id}/credits`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }).then((res) => res.json()),

        fetch(`${API_CONFIG.BASE_URL}/movie/${id}/similar`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }).then((res) => res.json()),
      ]);

      setMovie(movieData);
      setCredits(creditsData);
      setRelatedMovies(relatedData.results.slice(0,12)); 
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movie details:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMovieDetails();
}, [id]);

  // Get main actors (first 3-4)
  const mainActors = credits?.cast?.slice(0, 4) || [];

  // Get director
  const director =
    credits?.crew?.find((person) => person.job === "Director")?.name ||
    "Unknown";

  // Get backdrop or poster for background
  const backgroundImage = movie?.backdrop_path
    ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.BACKDROP_SIZE}${movie.backdrop_path}`
    : movie?.poster_path
      ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.POSTER_SIZE}${movie.poster_path}`
      : null;

  const posterUrl = movie?.poster_path
    ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.POSTER_SIZE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    return `${minutes} min`;
  };

  const getRatingPercentage = (rating) => {
    if (!rating) return "N/A";
    return Math.round(rating * 10);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">
            Error: {error || "Movie not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 ml-40 mr-40 mt-5">
      {/* Hero Section with Background Image */}
      <div className="bg-gray-800 rounded overflow-hidden">
        <div
          className="relative group h-[50vh] md:h-[60vh] bg-cover bg-center bg-no-repeat cursor-pointer"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundColor: "gray",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition duration-300"></div>

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <FaPlayCircle className="text-white text-5xl" />
          </div>
        </div>

        <div className="container p-5">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Movie Poster */}
            <div className="w-32 md:w-50 shrink-0 mx-auto md:mx-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl border-2 border-gray-700"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white ">
              <h1 className="text-3xl md:text-3xl font-bold mb-2">
                {movie.title}
              </h1>

              {/* Overview */}
              <p className="text-gray-300  leading-relaxed mb-4 text-sm md:text-base  line-clamp-2">
                {movie.overview || "No description available."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
                {/* LEFT COLUMN */}
                <div className="space-y-2">
                  {movie.genres?.length > 0 && (
                    <div>
                      <span className="text-white font-bold">Genres: </span>
                      <span className="text-purple-500">
                        {movie.genres.map((genre) => genre.name).join(", ")}
                      </span>
                    </div>
                  )}

                  {mainActors.length > 0 && (
                    <div>
                      <span className="text-white font-bold">Actor: </span>
                      <span className="text-purple-500">
                        {mainActors.map((actor) => actor.name).join(", ")}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-white font-bold">Director: </span>
                    <span className="text-purple-500">{director}</span>
                  </div>

                  {movie.production_countries?.length > 0 && (
                    <div>
                      <span className="text-white font-bold">Country: </span>
                      <span className="text-purple-500">
                        {movie.production_countries
                          .map((c) => c.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-2">
                  {movie.runtime && (
                    <div>
                      <span className="text-white font-bold">Duration: </span>
                      <span className="text-purple-500">
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-white font-bold">Quality: </span>
                    <span className="text-purple-500 ">HD</span>
                  </div>

                  {movie.release_date && (
                    <div>
                      <span className="text-white font-bold">Release: </span>
                      <span className="text-purple-500">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                  )}

                  {movie.vote_average && (
                    <div>
                      <span className="text-white font-bold">IMDb: </span>
                      <span className="text-purple-500">
                        {movie.vote_average.toFixed(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 cursor-pointer rounded-lg font-semibold flex items-center gap-2 transition">
                  <FaPlay className="text-sm" /> Stream in HD
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg cursor-pointer font-semibold flex items-center gap-2 transition">
                  <FaDownload className="text-sm" /> Download in HD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related movies section */}
      <div className="mt-5">
        <h2 className="text-2xl md:text-3xl  text-white mb-6 border-l-4 border-purple-500 pl-4">
          RELATED MOVIES
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {relatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;