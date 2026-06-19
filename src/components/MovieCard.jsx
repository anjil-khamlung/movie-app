import { Link } from "react-router-dom";
import { API_CONFIG } from "../services/config";
import { FaPlayCircle } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.POSTER_SIZE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link to={`/movie/${movie.id}`} className="block group h-full">
      <div className="h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          {/* Poster */}
          <div className="aspect-2/3 overflow-hidden">
            <img
              src={posterUrl}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300" />

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <FaPlayCircle className="text-white text-4xl sm:text-5xl" />
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 via-black/50 to-transparent p-2 sm:p-3">
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold text-center line-clamp-2">
              {movie.title || movie.name || "No Title"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
