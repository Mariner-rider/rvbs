import React from "react";
import bharatAi from "../../assets/images/bharatai2.png";
import { Link } from "react-router-dom";
import Sidebar from "../AiSidebar/AsideToggle/MainSideBar";
import TextRevealButton from "./TextRevealButton";
import Table from "./Table";

const ReviewerLayout = () => {
  return (
    <div className="flex h-screen antialiased text-gray-800  dark:text-gray-300  dark:bg-slate-900">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-x-hidden ">
        <div className="absolute top-2 left-0 right-0  lg:hidden w-36 mx-auto">
          <Link to="/">
            <img src={bharatAi} alt="logo" />
          </Link>
        </div>
        <Sidebar />
        <div className="flex flex-col flex-auto h-full p-3 lg:p-6 lg:pl-3">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl mt-1 lg:mt-0 bg-gray-100 dark:bg-slate-800 h-[88vh] lg:h-full p-1 lg:p-4 relative">
            <div className="h-full overflow-y-scroll  yes-scrollbar ">
              <div className="max-w-[90rem] px-14 mx-auto bg-gray-900/50  rounded-xl">
                <div className="flex flex-col justify-center items-center py-5 mt-10 pt-10">
                  <h1 className="text-5xl font-black text-gray-300">
                    Repositories
                  </h1>
                  <p className="text-xl mt-4 ">
                    List of repositories accessible to Code Reviewer
                  </p>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <form className="flex w-[32rem]">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search branch name..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </form>
                  <TextRevealButton />
                </div>
                <div className="flex">
                  <Table />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerLayout;
