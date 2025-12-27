import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ModeContext } from "../context/Mode.context";
import TryBharatScroll from "./TryBharatScroll";

const HamburgerMenu = () => {
  const [MobileScreenMenu, setMobileScreenMenu] = useState(false);
  const { darkMode, toggleMode } = useContext(ModeContext);

  const toggleSmallScreenMenu = () => {
    if (MobileScreenMenu) {
      setMobileScreenMenu(false);
    } else {
      setMobileScreenMenu(true);
    }
  };

  return (
    <div>
      <div className="flex items-center z-50">
        <div>
          <TryBharatScroll />
        </div>
        <button
          className=" mr-2 z-50"
          onClick={toggleSmallScreenMenu}
          aria-label="menu button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-gray-600 dark:text-gray-100"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      {MobileScreenMenu && (
        <>
          <div className="absolute top-5 z-50">
            <TryBharatScroll />
          </div>
          <button
            className="  z-40 text-gray-800 fixed top-6 right-4"
            onClick={toggleSmallScreenMenu}
            aria-label="menu close button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                className="text-gray-600 dark:text-gray-100"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav
            className={`mt-[17.2em] rounded-lg ${
              MobileScreenMenu ? "transition1" : null
            }`}
          >
            <ul
              className={`flex flex-col justify-start p-2 rounded-t-md drop-shadow-md backdrop-filter backdrop-blur-lg mt-[1em] ${
                MobileScreenMenu ? "transition1" : null
              }`}
            >
              <li className="py-1 my-1">
                <Link
                  to="/#updates"
                  className="whitespace-nowrap transition-colors ease-in-out duration text-black dark:text-white rounded-lg py-1.5 px-3 hover:bg-gradient-3 dark:bg-none dark:hover:bg-slate-900 dark:hover:bg-opacity-20"
                >
                  Research
                </Link>
              </li>
              <li className="py-1 my-1">
                <Link
                  to="/#updates"
                  className="whitespace-nowrap transition-colors ease-in-out duration text-black dark:text-white rounded-lg py-1.5 px-3 hover:bg-gradient-3 dark:bg-none dark:hover:bg-slate-900 dark:hover:bg-opacity-20"
                >
                  Company
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/#faq"
                  className="whitespace-nowrap transition-colors ease-in-out duration text-black dark:text-white rounded-lg py-1.5 px-3 hover:bg-gradient-3 dark:bg-none dark:hover:bg-slate-900 dark:hover:bg-opacity-20"
                >
                  Career
                </Link>
              </li>
              <li className="py-1 mt-1 ">
                <Link
                  to="/contact#contact"
                  className="whitespace-nowrap transition-colors ease-in-out duration text-black dark:text-white rounded-lg py-1.5 px-3 hover:bg-gradient-3 dark:bg-none dark:hover:bg-slate-900 dark:hover:bg-opacity-20"
                >
                  News
                </Link>
              </li>
              <li className="py-1 mt-1">
                <Link
                  to="/login"
                  className="whitespace-nowrap transition-colors ease-in-out duration text-black dark:text-white rounded-lg py-1.5 px-3 hover:bg-gradient-3 dark:bg-none dark:hover:bg-slate-900 dark:hover:bg-opacity-20"
                >
                  Login
                </Link>
              </li>
            </ul>
            {/* Dark / Light mode toggle */}
            <div className=" w-36 p-2 rounded-b-md backdrop-filter backdrop-blur-lg  ">
              <input
                type="checkbox"
                name="light-switch"
                id="light-switch"
                className="light-switch absolute w-px h-px overflow-hidden whitespace-nowrap -m-px p-0 border-0"
                onClick={toggleMode}
              />
              <label
                className="cursor-pointer p-2 flex items-center"
                htmlFor="light-switch"
              >
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-gray-800 "
                    d="M9 0H7v2h2V0ZM14.294 3.052 12.88 1.637 11.466 3.05l1.413 1.414 1.415-1.413ZM16 7h-2v2h2V7ZM11.535 13.02l1.415 1.413 1.414-1.415-1.415-1.413-1.414 1.414ZM9 14H7v2h2v-2ZM1.566 12.948l1.414 1.415 1.415-1.413-1.414-1.415-1.415 1.413ZM2 7H0v2h2V7ZM4.465 3.12 3.05 1.707 1.636 3.12l1.415 1.414L4.465 3.12Z"
                  ></path>
                  <path
                    className={darkMode ? "fill-gray-200" : "fill-gray-800"}
                    d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                  ></path>
                </svg>
                <span className="text-black ml-2 dark:text-white">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </label>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu;
