import React from "react";
import PopUpModal from "./Profile/ProfileSettings";

const AsideSettings = ({ isOpen, toggleDropdown, toggleMode, darkMode }) => {
  return (
    <div className="relative inline-block text-left">
      {/* Settings Button */}
      <button type="button" onClick={toggleDropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7 mr-2 cursor-pointer hover:rotate-45"
        >
          <path
            className="text-gray-500 dark:text-gray-200 hover:text-gray-700"
            fillRule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-10 w-60 lg:w-64 -mx-2 mb-4 bg-white border border-gray-400 border-opacity-40 rounded-lg shadow-lg z-20 dark:text-gray-300 dark:bg-[#121212]">
          <ul className="">
            {/* Dark/Light Mode Toggle */}
            <li className="px-1 border-b border-gray-400 border-opacity-40 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#3b3b3b] rounded-t-lg dark:text-gray-50 cursor-pointer">
              <div className="">
                <input
                  type="checkbox"
                  name="light-switch"
                  id="light-switch"
                  className="light-switch absolute w-px h-px overflow-hidden whitespace-nowrap -m-px p-0 border-0"
                  onClick={toggleMode}
                />
                <label
                  className="flex items-center cursor-pointer py-5 px-3 text-gray-700 dark:text-gray-50"
                  htmlFor="light-switch"
                >
                  <svg
                    className="mr-3"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-gray-500"
                      d="M9 0H7v2h2V0ZM14.294 3.052 12.88 1.637 11.466 3.05l1.413 1.414 1.415-1.413ZM16 7h-2v2h2V7ZM11.535 13.02l1.415 1.413 1.414-1.415-1.415-1.413-1.414 1.414ZM9 14H7v2h2v-2ZM1.566 12.948l1.414 1.415 1.415-1.413-1.414-1.415-1.415 1.413ZM2 7H0v2h2V7ZM4.465 3.12 3.05 1.707 1.636 3.12l1.415 1.414L4.465 3.12Z"
                    ></path>
                    <path
                      className={darkMode ? "fill-gray-200" : "fill-gray-800"}
                      d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                    ></path>
                  </svg>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </label>
              </div>
            </li>

            {/* Profile Settings */}
            <li className="flex items-center px-2 py-2 border-b border-gray-400 border-opacity-40 text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-3"
              >
                <path
                  className="text-gray-500 dark:text-gray-50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <PopUpModal />
            </li>

            {/* Follow Us */}
            <li className="flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <button className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-3"
                >
                  <path
                    className="text-gray-500 dark:text-gray-50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                Follow Us
              </button>
            </li>

            {/* Privacy Policy */}
            <li className="flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <button className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-3"
                >
                  <path
                    className="text-gray-500 dark:text-gray-50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                  />
                </svg>
                Privacy Policy
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  className="text-gray-500 dark:text-gray-50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </li>

            {/* Terms and Conditions */}
            <li className="flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <button className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-3"
                >
                  <path
                    className="text-gray-500 dark:text-gray-50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                Terms and Conditions
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  className="text-gray-500 dark:text-gray-50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </li>
              {/* Help & Support */}
            <li className="flex items-center px-2 py-2 border-b border-gray-400 border-opacity-40 text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <button className="flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-3"
                >
                  <path
                    className="text-gray-500 dark:text-gray-50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                Help & Support
              </button>
            </li>
            {/* Logout */}
            <li className="flex items-center border-t border-gray-400 border-opacity-40 justify-between px-2 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-50 dark:hover:bg-[#3b3b3b]">
              <button className="flex text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-3"
                >
                  <path
                    className="text-gray-500 dark:text-gray-50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AsideSettings;