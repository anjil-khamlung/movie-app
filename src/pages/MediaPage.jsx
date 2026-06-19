import { useEffect, useState } from "react";
import tmdbAPI from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import { useLocation, useParams } from "react-router-dom";
import GridSkeleton from "../components/skeletons/GridSkeleton";

// TMDB API only allows up to page 500
const TMDB_MAX_PAGES = 500;

const MediaPage = ({type}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
    const { genreId } = useParams();
  

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
      try {
        setLoading(true); // START LOADING

        const res = await getData(page);

        setData((res.results || []).slice(0, 18));

        const cappedTotalPages = Math.min(res.total_pages, TMDB_MAX_PAGES);

        setTotalPages(cappedTotalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // STOP LOADING
      }
     console.log("Fetching TV page:", page);
    };

    fetchData();
  }, [page, type, genreId]);

  // reset page when route changes
  useEffect(() => {
    safeSetPage(1);
  }, [type,genreId]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await tmdbAPI.getGenres();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  if (loading) return <GridSkeleton  />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 border-l-4 border-purple-500 pl-3 sm:pl-4">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {data.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>

      {/* page numbers */}
      <div className="flex justify-center mt-8 sm:mt-10 text-white">
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {visiblePages.map((p) => (
            <button
              key={p}
              onClick={() => safeSetPage(p)}
              className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded cursor-pointer transition ${
                page === p ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {p === 1 && page > 3 ? "First" : p}
            </button>
          ))}

          {totalPages > 3 && page !== totalPages && (
            <button
              onClick={() => safeSetPage(totalPages)}
              className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"
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
