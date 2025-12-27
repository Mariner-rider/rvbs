import React, { useContext, useRef, useEffect } from "react";
import { motion as m } from "framer-motion";
import AiToggle from "./AiToggleSlider";
import { ModeContext } from "../../../context/Mode.context";

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

const NewSearchbar = ({ handleSearch, searchQuery, setSearchQuery }) => {
  const { darkMode } = useContext(ModeContext);
  const textareaRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    handleSearch(e); // call parent submit logic
  };

  return (
    <m.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative max-w-4xl mx-auto">
        <m.div
          className="flex flex-row items-center h-auto rounded-xl bg-white border border-gray-400/40 border-opacity-40 dark:bg-[#1c1c1c] px-4 lg:px-2"
          variants={animation2}
        >
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              method="post"
              className="relative py-1"
              ref={formRef}
            >
              <textarea
                ref={textareaRef}
                className="flex w-full text-gray-700 text-sm dark:text-gray-100 rounded-xl focus:outline-none dark:bg-[inherit] focus:border-indigo-500 min-h-[2.5rem] max-h-[10rem] pl-4 pt-2 resize-none overflow-y-auto custom-scrollbar"
                name="context"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Send a message..."
                autoComplete="off"
              />
              <div className="absolute right-1 bottom">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-indigo-400 hover:bg-indigo-800 rounded-xl text-white px-4 py-3 transition duration-300 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <div className="flex p-1 pb-2 items-center">
              <div className="flex w-[14rem] lg:w-[18rem] items-center justify-between py-1">
                <div className="w-34 scale-75">
                  <AiToggle />
                </div>
              </div>
            </div>
          </div>
        </m.div>
        {/* Add your new info line here */}
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-center">
        BharatAi may not always be accurate. Always verify crucial details.{" "}
        <a
          href="/cookie-settings"
          className="underline hover:text-indigo-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Review your cookie settings
        </a>
      </p>
      </div>
    </m.div>
  );
};

export default NewSearchbar;
