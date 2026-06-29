import { useEffect, useState } from "react";
import tmdbAPI from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import { useLocation, useParams } from "react-router-dom";
import GridSkeleton from "../components/skeletons/GridSkeleton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

// TMDB API only allows up to page 500
const TMDB_MAX_PAGES = 500;

const MediaPage = ({ type }) => {
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

  // Trigger loading the next page when the last movie becomes visible
  const lastItemRef = useInfiniteScroll(loading, page < totalPages, () =>
    safeSetPage(page + 1),
  );

  // Fetch movies based on the selected category or genre
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

  // Get the selected genre name
  const genreName = genres.find((g) => g.id === Number(genreId))?.name;

  const toUpper = (str) => str?.toUpperCase();

  // Fetch movies whenever the page, category, or genre changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getData(page);

        const movies = (res.results || []).slice(0, 18);

        if (page === 1) {
          setData(movies);
        } else {
          setData((prev) => [...prev, ...movies]);
        }

        setTotalPages(Math.min(res.total_pages, TMDB_MAX_PAGES));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, type, genreId]);

  // Reset the movie list when the category or genre changes
  useEffect(() => {
    setData([]);
    safeSetPage(1);
  }, [type, genreId]);

  // Fetch available movie genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await tmdbAPI.getGenres();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  // Only show skeleton on the initial load
  if (loading && data.length === 0) {
    return <GridSkeleton />;
  }

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {data.map((item, index) => {
          if (index === data.length - 1) {
            return (
              <div ref={lastItemRef} key={item.id}>
                <MovieCard movie={item} />
              </div>
            );
          }

          return <MovieCard key={item.id} movie={item} />;
        })}
      </div>

      {loading && data.length > 0 && (
        <div className="flex justify-center py-8 text-white text-2xl">
          Loading more...
        </div>
      )}
    </div>
  );
};;;

export default MediaPage;
