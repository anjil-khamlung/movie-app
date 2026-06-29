import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";
import { PiMagnifyingGlass, PiFilmStrip } from "react-icons/pi";
import GridSkeleton from "../components/skeletons/GridSkeleton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Get the search query from the URL
  const query = searchParams.get("q");

  const lastItemRef = useInfiniteScroll(loading, page < totalPages, () =>
    setPage((prev) => prev + 1),
  );

  // Fetch search results whenever the query or page changes
  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;

      try {
        setLoading(true);

        const data = await tmdbAPI.searchMovies(query, page);

        const movies = (data.results || []).slice(0, 18);

        if (page === 1) {
          setResults(movies);
        } else {
          setResults((prev) => [...prev, ...movies]);
        }

        setTotalPages(Math.min(data.total_pages || 0, 500));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [query, page]);

  // Reset page when query changes
  useEffect(() => {
    setResults([]);
    setPage(1);
  }, [query]);

  // Only show skeleton on the initial load
  if (loading && results.length === 0) {
    return <GridSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white mb-2 flex items-center gap-2 uppercase">
          <PiMagnifyingGlass className="text-purple-500 " />
          Search Results for : {query}
        </h1>
      </div>

      {/* Results Grid */}
      {error ? (
        <div className="bg-red-900 text-white p-4 rounded-lg text-center">
          <p>Error: {error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-10 sm:py-12 px-4">
          <PiFilmStrip className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No movies found for "{query}"</p>
          <p className="text-gray-500 mt-2">Try searching for something else</p>
          <Link
            to="/"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300"
          >
            Go back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {results.map((movie, index) => {
              if (index === results.length - 1) {
                return (
                  <div ref={lastItemRef} key={movie.id}>
                    <MovieCard movie={movie} />
                  </div>
                );
              }

              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>

          {loading && results.length > 0 && (
            <div className="flex justify-center py-8 text-white text-2xl">
              Loading more...
            </div>
          )}
        </>
      )}
    </div>
  );
};;;
export default SearchResults;