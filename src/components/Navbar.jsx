import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass } from "react-icons/pi";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Mlogo from "../assets/Mlogo.png";
import tmdbAPI from "../services/tmdbAPI";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);

  const [showDesktopGenres, setShowDesktopGenres] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const menuRef = useRef(null);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setShowMobileMenu(false);
  };

  // Show desktop genres dropdown
  const handleDesktopEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDesktopGenres(true);
  };

  // Hide desktop genres dropdown with a slight delay
  const handleDesktopLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDesktopGenres(false);
    }, 200);
  };

  // Fetch movie genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbAPI.getGenres();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-purple-900 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={Mlogo}
              alt="MovieHub logo"
              className="h-10 w-auto rounded-lg"
            />
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-white">
            <Link to="/" className="hover:text-purple-300 transition">
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={handleDesktopEnter}
              onMouseLeave={handleDesktopLeave}
            >
              <button className="hover:text-purple-300 transition cursor-pointer">
                Genres
              </button>

              {showDesktopGenres && (
                <div className="absolute left-0 top-full mt-2 bg-gray-800 text-white rounded-lg shadow-xl p-4 grid grid-cols-3 gap-3 min-w-105 ">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className="text-left hover:text-purple-400 transition cursor-pointer"
                      onClick={() => {
                        navigate(`/genre/${genre.id}`);
                        setShowDesktopGenres(false);
                      }}
                    >
                      {genre.name}
                    </button>
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

          {/* Desktop Search */}
          <form onSubmit={handleSearch}>
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <PiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-white"
            >
              {showMobileMenu ? (
                <HiXMark className="text-3xl" />
              ) : (
                <HiBars3 className="text-3xl" />
              )}
            </button>

            {/* Logo */}
            <Link to="/">
              <img
                src={Mlogo}
                alt="MovieHub logo"
                className="h-8 w-auto rounded-lg"
              />
            </Link>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <PiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div
              className="mt-3 bg-gray-800 rounded-lg p-4 text-white"
              ref={menuRef}
            >
              <div className="flex flex-col gap-3">
                <Link to="/" onClick={() => setShowMobileMenu(false)}>
                  Home
                </Link>

                <Link to="/movies" onClick={() => setShowMobileMenu(false)}>
                  Movies
                </Link>

                <Link to="/tv" onClick={() => setShowMobileMenu(false)}>
                  TV-Series
                </Link>

                <Link to="/top" onClick={() => setShowMobileMenu(false)}>
                  Top IMDb
                </Link>

                <hr className="border-gray-600 my-2" />

                <h3 className="font-semibold text-purple-300">Genres</h3>

                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className="text-left hover:text-purple-400"
                      onClick={() => {
                        navigate(`/genre/${genre.id}`);
                        setShowMobileMenu(false);
                      }}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};;

export default Navbar;
