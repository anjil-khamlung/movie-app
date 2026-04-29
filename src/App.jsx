
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
  
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
   
  );
}

export default App