import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CrowdFundingContext } from '../Context/CrowdFunding';

const LandingPage = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-900 shadow-lg">
      <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
        Welcome to EMPOWERX
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48 text-center">
        Empowering decentralized applications with innovative funding solutions.
      </p>
      
      {/* MetaMask Connection Section */}
      <div className="mb-8 flex flex-col items-center space-y-4">
        {!currentAccount ? (
          <button
            onClick={connectWallet}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-105"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#F6851B"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#F6851B"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#F6851B"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#F6851B"/>
            </svg>
            Connect MetaMask Wallet
          </button>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 text-green-400 bg-green-900/20 rounded-lg border border-green-500/30">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              MetaMask Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </div>
          </div>
        )}
      </div>

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