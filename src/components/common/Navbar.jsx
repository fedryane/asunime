import React, { useState } from "react";
import SearchBar from "../particles/SearchBar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
    <div>
      <nav
        className={
          changeColor
            ? "w-full bg-[#141414] text-white fixed transition duration-300 z-10 opacity-80"
            : " w-full  bg-transparent text-white fixed transition duration-300 z-10"
        }
      >
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <NavLink className="text-2xl font-bold" to="/">
              Asunime
            </NavLink>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-300 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-gray-300 hover:text-blue-600">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="text-gray-300 hover:text-blue-600">
                  <NavLink to="/movie">Movies</NavLink>
                </li>
                <li className="text-gray-500 ">
                  {/* <a href="#a">Anime List</a> */}
                  <p>Anime List</p>
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

export default Navbar;
