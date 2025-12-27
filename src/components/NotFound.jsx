import React from 'react';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center text-center px-4">
        
        <img 
          src="/images/PageNotFound.png" 
          alt="Page not found"
          className="max-w-md w-full h-auto drop-shadow-lg"
        />

        <h1 className="text-3xl font-bold mt-4 text-gray-800">Oops! Page Not Found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for does not exist or has been moved.</p>

        <a 
          href="/" 
          className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
