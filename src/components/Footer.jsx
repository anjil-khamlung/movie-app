import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Mlogo from "../assets/Mlogo.png";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
              <Link to="/">
                        <img
                          src={Mlogo}
                          alt="MovieHub logo"
                          className="h-8 auto rounded-lg"
                        />
                      </Link>
            <p className="text-gray-400 py-3 text-sm">
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
                  Tv-Series
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
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-5 pt-5 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} MovieHub. All rights reserved.Data provided by
            TMDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
