import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData] = await Promise.all([
          tmdbAPI.getTrending(),
          tmdbAPI.getPopular(),
        ]);

        setTrending(trendingData.results.slice(0, 10));
        setPopular(popularData.results.slice(0, 10));
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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to MovieHub
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Discover the best movies, trending now, and all-time classics
        </p>
      </div>

      {/* Trending Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
           Trending This Week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
           Most Popular
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
