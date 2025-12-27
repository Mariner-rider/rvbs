// import React, { useContext } from "react";
// import AnimatedSearch from "./IntroAnimatedSearch";
// import { AuthContext } from "../../context/AuthContext";
// import logo from "../../assets/images/blogo.png";

// const IntroSearchComponent = ({
//   handleSearch,
//   searchQuery,
//   setSearchQuery,
// }) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div className="z-10 absolute inset-0 flex items-center justify-center">
//       <div className=" flex-col py-8 px-2 bg-gray-900/50 lg:w-[50rem] mx-auto rounded-3xl">
//         <div className="flex justify-center border border-gray-400 border-opacity-40 w-64 rounded-xl py-3 mx-auto items-center text-gray-400 text-sm mb-10 md:mb-0">
//           <span>Using limited free plan.</span>
//           <button className="text-orange-400 hover:text-blue-300 ml-1">
//             Upgrade
//           </button>
//         </div>
//         <div className=" mx-auto rounded-2xl p-2 md:p-12">
//           {/* Greeting */}
//           <div className="mb-10 flex flex-col md:flex-row justify-center items-center">
//             <img
//               className="w-12 md:w-8 mb-2 md:mb-0 md:mr-3 "
//               src={logo}
//               alt=""
//             />
//             <h1 className="text-2xl lg:text-4xl text-gray-200 flex items-center ">
//               Hi there, {user ? user.name : "UserName"}
//             </h1>
//           </div>

//           {/* Chat input */}
//           <div className=" rounded-lg py-2">
//             <AnimatedSearch
//               handleSearch={handleSearch}
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//             />
//           </div>

//           {/* Suggestion buttons */}
//           <div className="w-[90%] lg:w-[40rem] mx-auto grid md:grid-cols-2 gap-2">
//             <button className="bg-slate-900/50 hover:bg-slate-900/70 border border-gray-400 border-opacity-40 rounded-xl text-gray-300 p-1 flex items-center gap-2 text-sm">
//               <span className="text-sm bg-gray-800 px-4 py-3 rounded-lg">
//                 🏔
//               </span>
//               World's greatest hikes
//             </button>
//             <button className="bg-slate-900/50 hover:bg-slate-900/70 border border-gray-400 border-opacity-40 rounded-xl text-gray-300 p-1 flex items-center gap-2 text-sm">
//               <span className="text-sm bg-gray-800 p-3 rounded-lg">🧹</span>
//               Top vacuums to clean up pet hair
//             </button>
//             <button className="bg-slate-900/50 hover:bg-slate-900/70 border border-gray-400 border-opacity-40 rounded-xl text-gray-300 p-1 flex items-center gap-2 text-sm">
//               <span className="text-sm bg-gray-800 p-3 rounded-lg">🎵</span>
//               Upcoming music festivals
//             </button>
//             <button className="bg-slate-900/50 hover:bg-slate-900/70 border border-gray-400 border-opacity-40 rounded-xl text-gray-300 p-1 flex items-center gap-2 text-sm">
//               <span className="text-sm bg-gray-800 p-3 rounded-lg">💊</span>
//               Market size of pharmaceutical industry
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntroSearchComponent;
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import logo from "../../../assets/images/blogo.png";
import FeatureIllustration from "../../../assets/images/features-illustration.svg";

const IntroSearchComponent = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const { user } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="z-10 absolute inset-0 flex items-center justify-center">
      <div className="flex-col py-8 px-2 bg-gray-300 dark:bg-gray-900/50 lg:w-[50rem] mx-auto rounded-3xl">
        <div className="flex justify-center border border-gray-400 border-opacity-40 bg-gray-50/50 dark:bg-transparent w-64 rounded-xl py-3 mx-auto items-center text-gray-400 text-sm mb-10 md:mb-0">
          <span className="text-gray-600 dark:text-gray-50">
            Using limited free plan.
          </span>
          <button className="text-orange-400 hover:text-blue-300 ml-1">
            Upgrade
          </button>
        </div>
        <div className="mx-auto rounded-2xl p-2 md:p-12">
          {/* Greeting */}
          <div className="mb-10 flex flex-col md:flex-row justify-center items-center">
            <img
              className="w-12 md:w-8 mb-2 md:mb-0 md:mr-3"
              src={logo}
              alt=""
            />
            <h1 className="text-2xl lg:text-4xl text-gray-700 dark:text-gray-200 flex items-center">
              Hi there, {user ? user.name : "UserName"}
            </h1>
          </div>

          {/* Chat input */}
          <motion.div
            initial={{
              y: 200,
              scale: 1,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            animate={{
              y: isFocused ? 0 : -20,
              scale: isFocused ? 1.1 : 1,
              backgroundColor: isFocused ? "#1e293b" : "transparent",
              boxShadow: isFocused
                ? "0px 4px 8px rgba(0,0,0,0.2)"
                : "0px 2px 4px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="pointer-events-none absolute left-[50%] md:left-[40%] opacity-0 dark:opacity-70 -translate-x-1/2 top-[-10rem] -z-0 mt-[-5rem]"
              aria-hidden="true"
            >
              <img
                src={FeatureIllustration}
                className="max-w-none w-[800px] lg:w-[1440px]"
                height="0"
                alt="Illustration"
              />
            </div>
            <motion.form
              className="w-full"
              onSubmit={handleSearch}
              method="post"
            >
              <motion.div className="flex flex-row items-center h-20 rounded-xl mx-auto bg-white border border-gray-400 border-opacity-40 dark:bg-gray-900">
                <div className="flex items-center p-2 lg:p-2 ml-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full">
                  <svg
                    className="w-5 h-5"
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
                </div>
                <div className="flex-grow mr-2">
                  <input
                    type="text"
                    className="w-full p-3 dark:bg-gray-900 rounded-xl focus:outline-none focus:outline-indigo-500"
                    name="context"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Query..."
                    // onFocus={() => setIsFocused(true)}
                    // onBlur={() => setIsFocused(false)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white mr-4 lg:ml-0 px-8 lg:px-10 py-6 flex-shrink-0 overflow-hidden font-medium transition duration-300 ease-out shadow-md group"
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
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Suggestion buttons */}
          <div className="w-[90%] lg:w-[40rem] mx-auto grid md:grid-cols-2 gap-2">
            <button className="bg-gray-100 dark:bg-slate-900/50 hover:dark:bg-slate-600 hover:bg-gray-500 border border-gray-400 border-opacity-40 rounded-xl text-gray-600 hover:text-gray-200 dark:text-gray-300 p-1 flex items-center gap-2 text-sm">
              <span className="text-sm bg-gray-400 dark:bg-gray-800 px-4 py-3 rounded-lg">
                🏔
              </span>
              World's greatest hikes
            </button>
            <button className="bg-gray-100 dark:bg-slate-900/50 hover:dark:bg-slate-600 hover:bg-gray-500 border border-gray-400 border-opacity-40 rounded-xl text-gray-600 hover:text-gray-200 dark:text-gray-300 p-1 flex items-center gap-2 text-sm">
              <span className="text-sm bg-gray-400 dark:bg-gray-800 p-3 rounded-lg">
                🧹
              </span>
              Top vacuums to clean up pet hair
            </button>
            <button className="bg-gray-100 dark:bg-slate-900/50 hover:dark:bg-slate-600 hover:bg-gray-500 border border-gray-400 border-opacity-40 rounded-xl text-gray-600 hover:text-gray-200 dark:text-gray-300 p-1 flex items-center gap-2 text-sm">
              <span className="text-sm bg-gray-400 dark:bg-gray-800 p-3 rounded-lg">
                🎵
              </span>
              Upcoming music festivals
            </button>
            <button className="bg-gray-100 dark:bg-slate-900/50 hover:dark:bg-slate-600 hover:bg-gray-500 border border-gray-400 border-opacity-40 rounded-xl text-gray-600 hover:text-gray-200 dark:text-gray-300 p-1 flex items-center gap-2 text-sm">
              <span className="text-sm bg-gray-400 dark:bg-gray-800 p-3 rounded-lg">
                💊
              </span>
              Market size of pharmaceutical industry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSearchComponent;
