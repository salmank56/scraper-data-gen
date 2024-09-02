// Error.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mb-8 text-2xl text-gray-600">
          It looks like the page you're looking for doesn't exist.
        </p>
        <Link
          to="/scraper"
          className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
