import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const spanVariantBuilder = (side) => {
  return {
    initial: {
      transformOrigin: side + " center",
      scaleX: 1.8,
      opacity: 0,
    },
    exit: {
      transformOrigin: side + " center",
      scaleX: 1.8,
      opacity: 0,
    },
    animate: {
      transformOrigin: side + " center",
      scaleX: 1,
      opacity: 1,
    },
  };
};

const spanTransition = {
  duration: 0.4,
  delay: 0.07,
  type: "spring",
};

const ToggleView = ({ handleToggle, layout }) => {
  return (
    <div className="flex justify-between mx-8 relative">
      <hr className="h-px mt-14 absolute w-full bg-gray-800 border-0 dark:bg-gray-500" />
      <div className="flex items-center ">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100">Ai Models</h1>
      </div>

      <div className="relative w-24 ">
        <div className="bg-orange-500 relative flex justify-between px-2.5 py-2.5 rounded-lg">
          <motion.button onClick={handleToggle}>
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
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </motion.button>
          <motion.button onClick={handleToggle} whileTap="tapping">
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {layout && (
            <motion.span
              variants={spanVariantBuilder("left")}
              initial="initial"
              exit="exit"
              animate="animate"
              transition={spanTransition}
              className="pointer-events-none absolute left-0 top-0 flex h-full items-center w-12 px-1.5 text-[10px] font-semibold border-orange-200 border-[4px] rounded-l-lg "
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!layout && (
            <motion.span
              variants={spanVariantBuilder("right")}
              initial="initial"
              exit="exit"
              animate="animate"
              transition={spanTransition}
              className="pointer-events-none absolute right-0 top-0 flex h-full items-center w-12 px-1.5 text-[10px] font-semibold border-orange-200 border-[4px] rounded-r-lg"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToggleView;
