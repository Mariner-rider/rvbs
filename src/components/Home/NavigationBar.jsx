import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SlideNav = () => {
  return (
    <div className="">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex lg:w-fit rounded-full  bg-transparent border-2 backdrop-filter backdrop-blur-xl bg-opacity-60 border-gray-500 p-1"
    >
      <Tab href="#" setPosition={setPosition}>
        Research
      </Tab>
      <Tab href="/ryte" setPosition={setPosition}>
        products
      </Tab>
      <Tab href="/about" setPosition={setPosition}>
        About
      </Tab>
      <Tab href="#" setPosition={setPosition}>
        Career
      </Tab>
      <Tab href="/contact" setPosition={setPosition}>
        Contact
      </Tab>
      <Tab href="/test" setPosition={setPosition}>
        Test
      </Tab>
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);

  return (
    <Link
      ref={ref}
      to={href}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer lg:px-3 lg:py-2.5 text-xs uppercase text-white mix-blend-screen md:px-5 md:py-3 md:text-base"
    >
      {children}
    </Link>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-orange-500 md:h-11"
    />
  );
};

// import { motion } from "framer-motion";
// import { useState } from "react";

// const tabs = ["Home", "Docs", "Components", "Effects"];

// const Tab = ({ text, selected, setSelected }) => {
//   return (
//     <button
//       onClick={() => setSelected(text)}
//       className={`${
//         selected
//           ? "text-white"
//           : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
//       } relative z-10 block cursor-pointer lg:px-3 lg:py-2.5 text-xs uppercase text-white mix-blend-screen md:px-5 md:py-3 md:text-base`}
//     >
//       <span className="relative z-10">{text}</span>
//       {selected && (
//         <motion.span
//           layoutId="tab"
//           transition={{ type: "spring", duration: 0.4 }}
//           className="absolute inset-0 z-0 h-7 rounded-full bg-orange-500 md:h-11"
//         ></motion.span>
//       )}
//     </button>
//   );
// };

// export const SlideNav = () => {
//   const [selected, setSelected] = useState(tabs[0]);
//   return (
//     <div className="relative mx-auto flex lg:w-fit rounded-full  bg-transparent border-2 backdrop-filter backdrop-blur-xl bg-opacity-60 border-gray-500 p-1">
//       {tabs.map((tab, index) => (
//         <Tab
//           text={tab}
//           selected={selected === tab}
//           setSelected={setSelected}
//           key={tab}
//         />
//       ))}
//     </div>
//   );
// };
