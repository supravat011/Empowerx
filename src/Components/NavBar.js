import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Logo, Menu } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const menuList = [
    { name: "Home", path: "/campaign" },
    { name: "EasyLoan", path: "/EasyLoan" },
    { name: "Mentorship", path: "/youtube" },
    { name: "Chat", path: "/chat" },
    { name: "About", path: "/about" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Contact", path: "/contact" },
    { name: "Lang", path: null }, // Lang will still have dropdown
  ];
  const langList = [
    { name: "English", path: "/eng" },
    { name: "Hindi", path: "/hin" },
    { name: "Tamil", path: "/Tam" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
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
              {menuList.map((item, i) => (
                <li key={i} className="relative group">
                  {item.name === "Lang" ? (
                    <>
                      <button
                        className="font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-teal-accent-400 group-hover:text-white"
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      >
                        {item.name}
                      </button>
                      {/* Language Dropdown */}
                      {isLangDropdownOpen && (
                        <ul className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 shadow-xl rounded-lg z-50 w-32 overflow-hidden">
                          {langList.map((langItem) => (
                            <li key={langItem.name}>
                              <Link
                                to={langItem.path}
                                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                onClick={() => setIsLangDropdownOpen(false)}
                              >
                                {langItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-teal-accent-400 group-hover:text-white"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Wallet Button */}
          {!currentAccount && (
            <button
              onClick={connectWallet}
              className="hidden lg:flex items-center justify-center h-10 px-6 font-medium text-white bg-gradient-to-r from-teal-400 to-purple-500 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition duration-200"
            >
              Connect Wallet
            </button>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden z-40">
            <button
              className="p-2 transition rounded focus:outline-none focus:shadow-outline text-gray-300 hover:bg-gray-800"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full bg-[#1a1a1a] border-b border-gray-800 shadow-xl">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="inline-flex items-center">
                      <Logo color="text-white" />
                      <span className="ml-2 text-xl font-bold text-gray-100 uppercase">
                        EMPOWERX
                      </span>
                    </Link>
                    <button
                      className="p-2 transition rounded hover:bg-gray-800 focus:outline-none text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-300" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,10.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.316.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((item, i) => (
                        <li key={i}>
                          {item.name !== "Lang" ? (
                            <Link
                              to={item.path}
                              className="font-medium tracking-wide text-gray-300 transition hover:text-teal-accent-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <span className="font-medium tracking-wide text-gray-300 border-b border-gray-700 block pb-2">
                              {item.name}
                            </span>
                          )}
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={connectWallet}
                          className="w-full h-12 px-6 font-medium text-white bg-gradient-to-r from-teal-400 to-purple-500 rounded shadow-md transition hover:opacity-90"
                        >
                          Connect Wallet
                        </button>
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
