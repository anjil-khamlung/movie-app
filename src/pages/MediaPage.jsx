import { useEffect, useState } from "react";
import tmdbAPI from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";

// TMDB API only allows up to page 500
const TMDB_MAX_PAGES = 500;

const MediaPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { type, genreId } = useParams();

  // Safe function to set page - prevents going beyond TMDB limit
  const safeSetPage = (newPage) => {
    const validPage = Math.min(Math.max(1, newPage), TMDB_MAX_PAGES);
    setPage(validPage);
  };

  const getData = async (page) => {
    if (genreId) {
      return await tmdbAPI.getMoviesByGenre(genreId, page);
    }
    switch (type) {
      case "movies":
        return await tmdbAPI.getPopular(page);

      case "tv":
        return await tmdbAPI.getPopularTV(page);

      case "top":
        return await tmdbAPI.getTopRated(page);

      default:
        return await tmdbAPI.getPopular(page);
    }
  };

  const genreName = genres.find((g) => g.id === Number(genreId))?.name;
  const toUpper = (str) => str?.toUpperCase();

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
    const fetchData = async () => {
      const res = await getData(page);

      setData(res.results);
      // Cap the total pages at TMDB's limit (500)
      const cappedTotalPages = Math.min(res.total_pages, TMDB_MAX_PAGES);
      setTotalPages(cappedTotalPages);
    };

    fetchData();
  }, [page, type, genreId]);

  useEffect(() => {
    safeSetPage(1); // Use safeSetPage instead of setPage
  }, [genreId, type]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await tmdbAPI.getGenres();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return (
    <div className="ml-25 mr-25 mx-auto px-4 py-8">
      <h2 className="text-2xl text-white mb-6 border-l-4 border-purple-500 pl-4">
        {genreId
          ? `${toUpper(genreName) || "Genre"} MOVIES`
          : type === "movies"
            ? "WATCH MOVIES"
            : type === "tv"
              ? "WATCH TV-SERIES"
              : type === "top"
                ? "TOP IMDB"
                : ""}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>

      {/* page numbers */}
      <div className="flex justify-center items-center  mt-10 text-white">
        <div className="flex items-center gap-3">
          {visiblePages.map((p) => (
            <button
              key={p}
              onClick={() => safeSetPage(p)}
              className={`px-4 py-2 rounded ${
                page === p ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {p === 1 && page > 3 ? "First" : p}
            </button>
          ))}

          {totalPages > 3 && page !== totalPages && (
            <button
              onClick={() => safeSetPage(totalPages)}
              className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
            >
              Last
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
