
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from "./pages/SearchResults";
import Footer from './components/Footer';
import MediaPage from './pages/MediaPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 ">
      <Navbar />
      <main className="grow ">
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies" element={<MediaPage type="movies" />} />
          <Route path="/tv" element={<MediaPage type="tv" />} />
          <Route path="/top" element={<MediaPage type="top" />} />
          <Route path="/genre/:genreId" element={<MediaPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App