import { Link } from "react-router-dom";
import { API_CONFIG } from "../services/config";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.POSTER_SIZE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0";

  // Determine rating color
  const ratingColor =
    rating >= 7
      ? "text-green-400"
      : rating >= 5
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        {/* Poster Image */}
        <div className="relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />

          {/* Rating Badge */}
          <div
            className={`absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded-lg ${ratingColor} font-bold`}
          >
            ⭐ {rating}
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-400 transition">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">{releaseYear}</p>

          {/* Overview (optional - shows on hover) */}
          <p className="text-gray-300 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {movie.overview || "No description available"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
