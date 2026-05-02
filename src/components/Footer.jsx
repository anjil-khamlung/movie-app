import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">MovieHub</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for discovering movies, checking
              ratings, and staying updated with the latest releases.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
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
                  to="/popular"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/top-rated"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  to="/now-playing"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Now Playing
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Action</li>
              <li className="text-gray-400">Comedy</li>
              <li className="text-gray-400">Drama</li>
              <li className="text-gray-400">Horror</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} MovieHub. All rights reserved.</p>
          <p className="mt-1">Data provided by TMDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
