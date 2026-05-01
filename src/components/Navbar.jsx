import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass } from "react-icons/pi";
import Mlogo from "../assets/Mlogo.png"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

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
            <Link to="/popular" className="hover:text-purple-300 transition">
              Genres
            </Link>
            <Link to="/top-rated" className="hover:text-purple-300 transition">
              Country
            </Link>
            <Link
              to="/now-playing"
              className="hover:text-purple-300 transition"
            >
              Movies
            </Link>
            <Link to="/top-rated" className="hover:text-purple-300 transition">
              TV-Series
            </Link>
            <Link
              to="/now-playing"
              className="hover:text-purple-300 transition"
            >
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
