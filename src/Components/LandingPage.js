import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-900  shadow-lg">
      <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
        Welcome to DAPP FUNDING
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48 text-center">
        Empowering decentralized applications with innovative funding solutions.
      </p>
      <Link
        to="/campaign"
        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900 transition duration-300"
      >
        Get Started
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default LandingPage;