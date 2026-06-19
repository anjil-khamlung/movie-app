import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import tmdbAPI from "../services/tmdbAPI";
import { PiMagnifyingGlass, PiFilmStrip } from "react-icons/pi";
import GridSkeleton from "../components/skeletons/GridSkeleton";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  
        const pages = new Set([1]);

        if (page <= 2) {
          pages.add(2);
          pages.add(3);
        } else if (page >= totalPages - 1) {
          pages.add(totalPages - 2);
          pages.add(totalPages - 1);
          pages.add(totalPages);
        } else {
          pages.add(page - 1);
          pages.add(page);
          pages.add(page + 1);
        }

        const visiblePages = [...pages]
          .filter((p) => p > 0 && p <= totalPages)
          .sort((a, b) => a - b);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;


      try {
        setLoading(true);
        const data = await tmdbAPI.searchMovies(query, page);
        setResults((data.results || []).slice(0,18));
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

if (loading) return <GridSkeleton/>

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* page numbers */}
          <div className="flex justify-center mt-8 sm:mt-10 text-white px-2">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded cursor-pointer transition ${
                    page === p
                      ? "bg-purple-600"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {p === 1 && page > 3 ? "First" : p}
                </button>
              ))}

              {totalPages > 3 && page !== totalPages && (
                <button
                  onClick={() => setPage(totalPages)}
                  className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"
                >
                  Last
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SearchResults;