import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Mlogo from "../assets/Mlogo.png";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
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

            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Discover movies, explore ratings, watch trending titles, and stay
              updated with the latest releases powered by TMDB.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/movies"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Movies
                </Link>
              </li>

              <li>
                <Link
                  to="/tv"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  TV Series
                </Link>
              </li>

              <li>
                <Link
                  to="/top"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Top IMDb
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Genres</h3>

            <ul className="space-y-2">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Link
                    to={`/genre/${genre.id}`}
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex gap-4 text-gray-400 mb-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaTwitter size={20} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} MovieHub. All rights reserved.
            <span className="mx-2">•</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Powered by TMDB
            </a>
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
