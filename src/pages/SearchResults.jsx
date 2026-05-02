import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";
import { PiMagnifyingGlass, PiFilmStrip } from "react-icons/pi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await tmdbAPI.searchMovies(query, page);
        setResults(data.results || []);
        setTotalPages(Math.min(data.total_pages || 0, 500));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  if (loading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8 ml-25 mr-25">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
          <PiMagnifyingGlass className="text-purple-500" />
          Search Results
        </h1>
        <p className="text-gray-400">
          Found {results.length} results for "{query}"
        </p>
      </div>

      {/* Results Grid */}
      {error ? (
        <div className="bg-red-900 text-white p-4 rounded-lg text-center">
          <p>Error: {error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default SearchResults;