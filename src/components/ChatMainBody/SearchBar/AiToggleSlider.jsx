import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AiToggle = ({ onToggle, initialToggleOn = true, disableText }) => {
  const [toggled, setToggled] = useState(initialToggleOn || false);
  const springConfig = { type: "spring", stiffness: 500, damping: 30 };

  const handleToggle = () => {
    const newState = !toggled;
    setToggled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

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

  return (
    <div className="flex items-center">
      <motion.button
        className={`relative h-[25px] w-[45px] cursor-pointer rounded-full outline-offset-2 duration-200 focus-within:outline-orange-500 ${
          toggled ? "bg-orange-500" : "bg-gray-700/50"
        }`}
        onClick={handleToggle}
        whileTap="tapping"
      >
        <motion.span
          className="inline-block aspect-square h-full transform rounded-full bg-white shadow-lg"
          variants={{
            tapping: {
              aspectRatio: "1/0.85",
              marginLeft: toggled ? "-10px" : "10px",
            },
          }}
          initial={{
            x: toggled ? 10 : -10,
            opacity: toggled ? 1 : 0.8,
            scale: toggled ? 0.7 : 0.5,
          }}
          animate={{
            x: toggled ? 10 : -10,
            opacity: toggled ? 1 : 0.8,
            scale: toggled ? 0.7 : 0.5,
          }}
          transition={springConfig}
        />
        {/* {!disableText && (
          <>
            <AnimatePresence>
              {toggled && (
                <motion.span
                  variants={spanVariantBuilder("left")}
                  initial="initial"
                  exit="exit"
                  animate="animate"
                  transition={spanTransition}
                  className="pointer-events-none absolute left-0 top-0 flex h-full items-center px-1.5 text-[10px] font-semibold text-white"
                >
                  ON
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!toggled && (
                <motion.span
                  variants={spanVariantBuilder("right")}
                  initial="initial"
                  exit="exit"
                  animate="animate"
                  transition={spanTransition}
                  className="pointer-events-none absolute right-0 top-0 flex h-full items-center px-1.5 text-[10px] font-semibold text-white/70"
                >
                  OFF
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )} */}
      </motion.button>
      <p className="ml-2 text-lg font-black text-gray-400">Close Ai</p>
    </div>
  );
};

export default AiToggle;
