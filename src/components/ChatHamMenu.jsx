import React, { useState } from "react";
import { Link } from "react-router-dom";
import bharatAi from "../assets/images/bharatai2.png";
import parse from "html-react-parser";
import axios from "axios";

const ChatHamMenu = ({ chatHistory }) => {
  const [MobileScreenMenu, setMobileScreenMenu] = useState(false);

  const toggleSmallScreenMenu = () => {
    if (MobileScreenMenu) {
      setMobileScreenMenu(false);
    } else {
      setMobileScreenMenu(true);
    }
  };

  return (
    <div className="lg:hidden fixed w-full z-20 bg-white">
      <div className="ham-container01">
        <div className="flex justify-between items-center">
          <div className=" w-32 m-2">
            <Link to="/">
              <img src={bharatAi} alt="logo" />
            </Link>
          </div>
          <div>
            <button
              className=" text-gray-800 mr-5 mt-3"
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
                  className="text-gray-500 dark:text-gray-300"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        {MobileScreenMenu && (
          <>
            <button
              className=" text-gray-800 fixed top-6 right-5 bg-white"
              onClick={toggleSmallScreenMenu}
              aria-label="menu close button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 hover:rotate-90 "
              >
                <path
                  className="text-gray-400"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav
              className={`mt-[16em] rounded-lg absolute right-3 h-auto -top-[12em] z-20 ${
                MobileScreenMenu ? "transition1" : null
              }`}
            >
              <div className="flex flex-col justify-between p-6 rounded-lg w-64 bg-slate-100 drop-shadow-md flex-shrink-0">
                <div className="flex flex-col">
                  <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs bg-indigo-100 border border-gray-200 space-y-1  -mx-2 py-2 px-4 rounded-lg">
                      <span className="font-bold text-xl text-slate-800">
                        Chat Archive
                      </span>
                      <span className="flex items-center text-xl justify-center text-gray-800 bg-white h-8 w-8 rounded-full">
                        +
                      </span>
                    </div>
                    {/* Archive Chat Mapped queries start -------------------- */}
                    <div
                      className="flex flex-col space-y-1 mt-4 -mx-2 h-4/5 overflow-y-auto 
              "
                    >
                      <ul>
                        {chatHistory.map((item, index) => (
                          <li
                            key={index}
                            className="text-black ml-2 text-md capitalize flex flex-row items-center mt-1 bg-slate-50 hover:bg-gray-100 rounded-lg p-2 px-3"
                          >
                            {" "}
                            {item.query}{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Archive Queries end -------------------- */}
                  </div>
                </div>

                <div className="  mb-4 ">
                  {/* <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Archivied</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                7
              </span>
            </div> */}
                  <div className="flex flex-col space-y-1 mt-4 -mx-2">
                    <button className="flex flex-row items-center border border-indigo-100 hover:bg-gray-100 rounded-xl p-2">
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        H
                      </div>
                      <div className="ml-2 text-sm font-semibold text-gray-600">
                        Empty Container
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center mt-2 bg-indigo-100 border border-gray-200 space-y-1  -mx-2 py-6 px-4 rounded-lg">
                    <img
                      src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                      alt="Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-sm text-gray-800 font-semibold">
                        Aminos Co.
                      </div>
                      <div className="text-xs text-gray-500">Freemium</div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHamMenu;
