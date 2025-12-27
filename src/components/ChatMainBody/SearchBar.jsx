import React from "react";
import { motion as m } from "framer-motion";
import IntroSearchComponent from "./IntroScreen/IntroSearchComponent";

const animation2 = {
  offscreen: {
    y: -300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const SearchBar = ({ handleSearch, searchQuery, setSearchQuery }) => {
  return (
    <>
      {/* {searchQuery ? (
        <m.form
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSearch}
          method="post"
        >
          <m.div
            className="flex flex-row items-center h-20 rounded-xl mx-auto bg-white  border border-gray-400 border-opacity-40 dark:bg-gray-900 lg:w-[75%] px-2 lg:px-4"
            variants={animation2}
          >
            <button className="flex items-center p-2 lg:mr-2  lg:p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full">
              <svg
                className="w-5 h-5 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="text-gray-500 dark:text-gray-200"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
            <div className="flex-grow ">
              <textarea
                className="flex w-[98%] text-gray-200 border border-gray-400 border-opacity-40  rounded-xl focus:outline-none dark:bg-gray-900 focus:border-indigo-500 pt-4 pl-4 h-14"
                name="context"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Query..."
              />
            </div>
            <div>
              <button
                type="submit"
                className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white  px-7 lg:px-12 py-[1.7rem] flex-shrink-0  overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </m.div>
        </m.form>
      ) : (
        <IntroSearchComponent
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )} */}

      <m.form
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        onSubmit={handleSearch}
        method="post"
      >
        <m.div
          className="flex flex-row items-center h-20 rounded-xl mx-auto bg-white  border border-gray-400 border-opacity-40 dark:bg-gray-900 lg:w-[75%] px-2 lg:px-4"
          variants={animation2}
        >
          <button className="flex items-center p-2 lg:mr-2  lg:p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full">
            <svg
              className="w-5 h-5 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-gray-500 dark:text-gray-200"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
          <div className="flex-grow ">
            <textarea
              className="flex w-[98%] text-gray-200 border border-gray-400 border-opacity-40  rounded-xl focus:outline-none dark:bg-gray-900 focus:border-indigo-500 pt-4 pl-4 h-14"
              name="context"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Query..."
            />
          </div>
          <div>
            <button
              type="submit"
              className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white  px-7 lg:px-12 py-[1.7rem] flex-shrink-0  overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </span>
            </button>
          </div>
        </m.div>
      </m.form>
    </>
  );
};

export default SearchBar;

// import React, { useState, useEffect } from "react";
// import { motion as m } from "framer-motion";
// import IntroSearchComponent from "./IntroSearchComponent";

// const animation2 = {
//   offscreen: {
//     y: -300,
//     opacity: 0,
//   },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.2,
//       duration: 1,
//     },
//   },
// };

// const SearchBar = ({ handleSearch, searchQuery, setSearchQuery, tabId }) => {
//   const [searchMade, setSearchMade] = useState(() => {
//     // Get state for the specific tab from localStorage
//     const savedState = localStorage.getItem(`searchMade_${tabId}`);
//     return savedState === "true"; // Convert string to boolean
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       setSearchMade(true);
//       handleSearch();
//       // Save state for the specific tab to localStorage
//       localStorage.setItem(`searchMade_${tabId}`, "true");
//     }
//   };

//   useEffect(() => {
//     // Listen for storage changes to synchronize state across tabs
//     const syncState = (event) => {
//       if (event.key === `searchMade_${tabId}`) {
//         setSearchMade(event.newValue === "true");
//       }
//     };

//     window.addEventListener("storage", syncState);
//     return () => {
//       window.removeEventListener("storage", syncState);
//     };
//   }, [tabId]);

//   useEffect(() => {
//     // Clear localStorage for this tab if needed
//     if (!searchMade) {
//       localStorage.removeItem(`searchMade_${tabId}`);
//     }
//   }, [searchMade, tabId]);

//   return (
//     <>
//       {!searchMade ? (
//         <IntroSearchComponent
//           handleSearch={handleSearch}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />
//       ) : (
//         <m.form
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: true, amount: 0.2 }}
//           onSubmit={handleSearch}
//           method="post"
//         >
//           <m.div
//             className="flex flex-row items-center h-20 rounded-xl mx-auto bg-white  border border-gray-400 border-opacity-40 dark:bg-gray-900 lg:w-[75%] px-2 lg:px-4"
//             variants={animation2}
//           >
//             <button className="flex items-center p-2 lg:mr-2  lg:p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full">
//               <svg
//                 className="w-5 h-5 "
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   className="text-gray-500 dark:text-gray-200"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                 ></path>
//               </svg>
//             </button>
//             <div className="flex-grow ">
//               <textarea
//                 className="flex w-[98%] text-gray-200 border border-gray-400 border-opacity-40  rounded-xl focus:outline-none dark:bg-gray-900 focus:border-indigo-500 pt-4 pl-4 h-14"
//                 name="context"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Enter Query..."
//               />
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white  px-7 lg:px-12 py-[1.7rem] flex-shrink-0  overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
//               >
//                 Submit
//               </button>
//             </div>
//           </m.div>
//         </m.form>
//       )}
//     </>
//   );
// };

// export default SearchBar;
