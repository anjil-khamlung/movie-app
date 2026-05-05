
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from "./pages/SearchResults";
import Footer from './components/Footer';
import MediaPage from './pages/MediaPage';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:type" element={<MediaPage />} />
          <Route path="/genre/:genreId" element={<MediaPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App