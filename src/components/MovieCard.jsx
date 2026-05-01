import { Link } from "react-router-dom";
import { API_CONFIG } from "../services/config";
import { FaPlayCircle } from "react-icons/fa";


const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${API_CONFIG.IMAGE_BASE_URL}${API_CONFIG.POSTER_SIZE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

 

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl">
        <div className="relative">
          {/* Poster */}
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300"></div>

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300  ">
            <FaPlayCircle className="text-white text-4xl" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
