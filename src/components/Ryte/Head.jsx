// import React, { useState, useEffect } from "react";
// import { FaSun, FaMoon } from "react-icons/fa";

// const Head = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   // Toggle light and dark mode
//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6 shadow-md flex justify-between items-center">
//       {/* Logo Section */}
//       <div className="text-xl font-bold text-gray-800 dark:text-white">
//         <span className="text-indigo-600">MyApp</span> Logo
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex items-center space-x-6">
//         <a
//           href="#documents"
//           className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
//         >
//           Documents
//         </a>
//         <a
//           href="#write"
//           className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
//         >
//           Write
//         </a>
//         <a
//           href="#chat"
//           className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
//         >
//           Chat
//         </a>

//         {/* Light/Dark Mode Toggle */}
//         <button
//           onClick={toggleDarkMode}
//           className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//           aria-label="Toggle Light/Dark Mode"
//         >
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </nav>
//     </header>
//   );
// };

// export default Head;

import React, { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Head = ({ darkMode, toggleDarkMode }) => {

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6 shadow-md flex justify-between items-center">
      {/* Logo Section */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        <span className="text-indigo-600"></span> Logo
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <a
          href="#documents"
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          Documents
        </a>
        <a
          href="#write"
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          Write
        </a>
        <a
          href="#chat"
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          Chat
        </a>

        {/* Light/Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle Light/Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
};

export default Head;
