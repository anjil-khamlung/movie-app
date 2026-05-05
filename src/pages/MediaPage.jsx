import { useEffect, useState } from "react";
import tmdbAPI from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";

const MediaPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { type, genreId } = useParams();

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
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(page);

      setData(res.results);
      setTotalPages(res.total_pages);
    };

    fetchData();
  }, [page, type, genreId]);

  useEffect(() => {
    setPage(1);
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

      <div className="flex justify-center items-center gap-2 mt-10 text-white">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {/* First page */}
          <button
            onClick={() => setPage(1)}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            1
          </button>

          {/* Ellipsis */}
          {page > 3 && <span className="px-2">...</span>}

          {/* Current - 1 */}
          {page > 2 && (
            <button
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
            >
              {page - 1}
            </button>
          )}

          {/* Current page */}
          {page !== 1 && page !== totalPages && (
            <button className="px-3 py-1 rounded bg-purple-600">{page}</button>
          )}

          {/* Current + 1 */}
          {page < totalPages - 1 && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
            >
              {page + 1}
            </button>
          )}

          {/* Ellipsis */}
          {page < totalPages - 2 && <span className="px-2">...</span>}

          {/* Last page */}
          <button
            onClick={() => setPage(totalPages)}
            className={`px-3 py-1 rounded ${
              page === totalPages
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {totalPages}
          </button>
        </div>

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MediaPage;
