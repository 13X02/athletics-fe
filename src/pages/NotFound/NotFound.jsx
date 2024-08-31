import React from 'react';
import Navbar from '../../component/Navbar.jsx';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <Navbar/>
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
