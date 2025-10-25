import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Logo, Menu } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const menuList = ["Home", "About", "Campaigns", "Contact", "Lang"];
  const dropdownList = [
    { name: "EasyLoan", path: "/EasyLoan" },
    { name: "Mentorship", path: "/youtube" },
    { name: "Chat", path: "/chat" },
  ];
  const langList = [
    { name: "English", path: "/eng" },
    { name: "Hindi", path: "/hin" },
    { name: "Tamil", path: "/Tam" },
  ];

  return (
    <div className="backgroundMain">
      <div className="px-4 py-5 max-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/campaign" className="inline-flex items-center mr-8">
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                EMPOWERX
              </span>
            </Link>
            <ul className="hidden lg:flex space-x-8">
              {menuList.map((el, i) => (
                <li key={i} className="relative">
                  <button
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                    onClick={() => {
                      if (el === "Home") setIsDropdownOpen(!isDropdownOpen);
                      if (el === "Lang") setIsLangDropdownOpen(!isLangDropdownOpen);
                    }}
                  >
                    {el}
                  </button>

                  {/* Home Dropdown */}
                  {el === "Home" && isDropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-50">
                      {dropdownList.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Language Dropdown */}
                  {el === "Lang" && isLangDropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-50">
                      {langList.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={() => setIsLangDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Wallet Connection Section */}
          {!currentAccount ? (
            <button
              onClick={connectWallet}
              className="hidden lg:flex items-center justify-center h-12 px-6 font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md transition duration-200 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#F6851B"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#F6851B"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#F6851B"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#F6851B"/>
              </svg>
              Connect MetaMask Wallet
            </button>
          ) : (
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 text-green-400 bg-green-900/20 rounded-lg border border-green-500/30">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden z-40">
            <button
              className="p-2 transition rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full bg-white border shadow-lg rounded">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="inline-flex items-center">
                      <Logo color="text-black" />
                      <span className="ml-2 text-xl font-bold text-gray-800 uppercase">
                        Company
                      </span>
                    </Link>
                    <button
                      className="p-2 transition rounded hover:bg-gray-200 focus:outline-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,10.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.316.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((el, i) => (
                        <li key={i}>
                          <Link
                            to="/"
                            className="font-medium tracking-wide text-gray-700 transition hover:text-deep-purple-accent-400"
                          >
                            {el}
                          </Link>
                        </li>
                      ))}
                      <li>
                        {!currentAccount ? (
                          <button
                            onClick={connectWallet}
                            className="w-full h-12 px-6 font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md transition hover:from-purple-700 hover:to-blue-700"
                          >
                            Connect MetaMask Wallet
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center px-4 py-2 text-green-400 bg-green-900/20 rounded-lg border border-green-500/30">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                              <span className="text-sm font-medium">
                                {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                              </span>
                            </div>
                            <button
                              onClick={() => window.location.reload()}
                              className="w-full px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
                            >
                              Disconnect
                            </button>
                          </div>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
