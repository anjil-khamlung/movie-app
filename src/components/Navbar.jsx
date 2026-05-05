import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass } from "react-icons/pi";
import Mlogo from "../assets/Mlogo.png"
import tmdbAPI from "../services/tmdbAPI";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const openGenres = () => setShowGenres(true);
  const closeGenres = () => setShowGenres(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  //  data
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await tmdbAPI.getGenres();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  //  UI behavior
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowGenres(false);
    }
  };

  document.addEventListener("pointerdown", handleClickOutside);

  return () => {
    document.removeEventListener("pointerdown", handleClickOutside);
  };
}, []);

  return (
    <nav className="bg-linear-to-r from-purple-900 to-indigo-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo */}
          <Link to="/">
            <img
              src={Mlogo}
              alt="MovieHub logo"
              className="h-10 auto rounded-lg"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 text-white">
            <Link to="/" className="hover:text-purple-300 transition">
              Home
            </Link>

            <div className="relative">
              <button
                onClick={openGenres}
                className="hover:text-purple-300 transition cursor-pointer"
              >
                Genres
              </button>

              {/* genre dropdown */}
              {showGenres && (
                <div
                  ref={dropdownRef}
                  className="absolute top-10 left-0 bg-gray-800 text-white rounded-lg shadow-lg p-4 grid grid-cols-3 gap-3 w-100 z-50"
                >
                  {genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="cursor-pointer hover:text-purple-400 transition"
                      onClick={() => {
                        setShowGenres(false);

                        navigate(`/genre/${genre.id}`);
                      }}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/movies" className="hover:text-purple-300 transition">
              Movies
            </Link>
            <Link to="/tv" className="hover:text-purple-300 transition">
              TV-Series
            </Link>
            <Link to="/top" className="hover:text-purple-300 transition">
              Top IMDb
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* Search Button */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition"
              >
                <PiMagnifyingGlass className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
