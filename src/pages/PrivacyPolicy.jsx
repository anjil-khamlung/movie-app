// pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-gray-400 mb-4">
          We respect your privacy. This MovieHub app does not collect personal
          data from users.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Data Usage</h2>
        <p className="text-gray-400 mb-4">
          We use TMDB API to fetch movie information such as titles, ratings,
          posters, and descriptions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="text-gray-400 mb-4">
          This website may use basic cookies for improving user experience.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Third Party</h2>
        <p className="text-gray-400 mb-4">
          We use The Movie Database (TMDB) as our data provider.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
