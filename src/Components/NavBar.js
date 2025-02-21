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
                Dapp Funding
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

          {/* Connect Wallet Button */}
          {!currentAccount && (
            <button
              onClick={connectWallet}
              className="hidden lg:flex items-center justify-center h-12 px-6 font-medium text-white bg-deep-purple-accent-400 rounded shadow-md transition duration-200 hover:bg-deep-purple-accent-700"
            >
              Connect Wallet
            </button>
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
                        <button
                          onClick={connectWallet}
                          className="w-full h-12 px-6 font-medium text-white bg-deep-purple-accent-400 rounded shadow-md transition hover:bg-deep-purple-accent-700"
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
