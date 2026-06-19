import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import GridSkeleton from "../components/skeletons/GridSkeleton";
import LoadingSkeleton from "../components/skeletons/LoadingSkeleton";



const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [tvSeries, setTvSeries]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData, tvSeriesData ] = await Promise.all([
          tmdbAPI.getTrending(),
          tmdbAPI.getPopular(),
          tmdbAPI.getPopularTV(),
        ]);

        setTrending(trendingData.results.slice(0, 12));
        setPopular(popularData.results.slice(0, 12));
        setTvSeries(tvSeriesData.results.slice(0, 12));
        setMovies(trendingData.results.slice(0,5));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

  }, []);

useEffect(() => {
  if (!movies.length) return; 

  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % movies.length);
  }, 4000);

  return () => clearInterval(interval);
}, [movies]);

  if (loading) return (
    <LoadingSkeleton>
      <GridSkeleton />
    </LoadingSkeleton>
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900 text-white p-4 rounded-lg text-center">
          <p className="font-bold">Error: {error}</p>
          <p className="mt-2">Please check your API token and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[45vh] sm:h-[50vh] md:h-[60vh]  overflow-hidden mb-5">
        {/* Slides */}
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${
              index === current
                ? "opacity-100 z-0"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent"></div>

            {/* Text */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] lg:w-[40%] text-white">
              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                {movie.title || movie.name}
              </h2>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base mb-2">
                {/* Rating */}
                <span className="text-yellow-400 font-semibold flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                {/* Quality */}
                <span className="bg-purple-600 px-2 py-0.5 rounded text-xs">
                  HD
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-3">
                {movie.overview || "No description available."}
              </p>

              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="bg-purple-600 px-4 py-2 rounded mt-4 text-sm sm:text-base cursor-pointer"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {movies.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-6 rounded-full cursor-pointer transition ${
                current === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trending Section */}
        <section className="mb-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 border-l-4 border-purple-500 pl-4">
            TRENDING THIS WEEK
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Popular Section */}
        <section className="mb-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 border-l-4 border-purple-500 pl-4">
            MOST POPULAR
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {popular.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Popular TvSeries */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 border-l-4 border-purple-500 pl-4">
            POPULAR TV-SERIES
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tvSeries.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
