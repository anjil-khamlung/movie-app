// pages/Terms.jsx
import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="text-gray-400 mb-4">
          By using MovieHub, you agree to the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Usage</h2>
        <p className="text-gray-400 mb-4">
          This website is for personal and educational use only.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Content</h2>
        <p className="text-gray-400 mb-4">
          All movie data is provided by TMDB API. We do not own any content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Limitation</h2>
        <p className="text-gray-400 mb-4">
          We are not responsible for incorrect or outdated information.
        </p>
      </div>
    </div>
  );
};

export default Terms;
