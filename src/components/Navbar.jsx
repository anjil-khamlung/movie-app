import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMagnifyingGlass } from "react-icons/pi";

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
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-purple-300 transition"
          >
            🎬 MovieHub
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 text-white">
            <Link to="/" className="hover:text-purple-300 transition">
              Home
            </Link>
            <Link to="/popular" className="hover:text-purple-300 transition">
              Popular
            </Link>
            <Link to="/top-rated" className="hover:text-purple-300 transition">
              Top Rated
            </Link>
            <Link
              to="/now-playing"
              className="hover:text-purple-300 transition"
            >
              Now Playing
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
              />
              <PiMagnifyingGlass className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
