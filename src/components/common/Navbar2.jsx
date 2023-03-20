import React, { useState } from "react";
import SearchBar from "../particles/SearchBar";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div className="relative">
      <nav
        className={changeColor ? "w-full fixed top-0 left-0 right-0 bg-[#141414] text-white transition duration-300 z-20 opacity-80" : "w-full bg-transparent text-white transition duration-500 z-20 "}
      >
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link className="text-2xl font-bold" to="/">
              asu.raidep
            </Link>

            <div className="md:hidden">
              <button className="p-2 text-gray-300 rounded-md outline-none focus:border-gray-400 focus:border" onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${navbar ? "block" : "hidden"}`}>
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-gray-300 hover:text-blue-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-gray-300 hover:text-blue-600">
                  <a href="#a">Movies</a>
                </li>
                <li className="text-gray-300 hover:text-blue-600">
                  <a href="#a">Genres</a>
                </li>
                <li>
                  <SearchBar />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar2;
