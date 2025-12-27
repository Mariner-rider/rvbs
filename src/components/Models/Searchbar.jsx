import React, { useState } from "react";
import { motion } from "framer-motion";

const ModelSearchBar = () => {
  return (
    <motion.div className=" mx-6">
      <div>
        <motion.form className="mx-auto py-12" method="post">
          <motion.div className="flex flex-row items-center h-20 rounded-xl mx-auto bg-white border border-gray-400 border-opacity-40 dark:bg-gray-900 ">
            <div className="flex-grow mx-2">
              <input
                type="text"
                className="w-full p-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 rounded-lg mx-1 focus:outline-none focus:outline-indigo-500 text-lg"
                name="context"
                placeholder="Search Models..."
              />
            </div>
            <div className="ml-2">
              <button
                type="submit"
                className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white mr-4 lg:ml-0 px-8 lg:px-10 py-6 flex-shrink-0  overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange-500 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ModelSearchBar;
