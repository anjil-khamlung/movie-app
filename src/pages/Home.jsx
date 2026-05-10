import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [tvSeries, setTvSeries]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

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
      <div className="relative h-[50vh] md:h-[60vh]  overflow-hidden mb-5">
        {/* Slides */}
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Text */}
            <div className="ml-20 absolute bottom-10 left-10 right-10 text-white max-w-xl">
              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {movie.title || movie.name}
              </h2>

              {/* Meta info */}
              <div className="flex items-center gap-4 text-sm md:text-base mb-2">
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
              <p className="text-gray-300 text-sm md:text-base line-clamp-3 ">
                {movie.overview || "No description available."}
              </p>

              <button className="bg-purple-600 px-2 py-1 rounded mt-4 cursor-pointer">Watch Now</button>
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
      <div className="max-w-7xl mx-auto">
        {/* Trending Section */}
        <section className="mb-5">
          <h2 className="text-2xl md:text-3xl  text-white mb-6 border-l-4 border-purple-500 pl-4">
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
          <h2 className="text-2xl md:text-3xl  text-white mb-6 border-l-4 border-purple-500 pl-4">
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
          <h2 className="text-2xl md:text-3xl  text-white mb-6 border-l-4 border-purple-500 pl-4">
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
