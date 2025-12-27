import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiGitlab, SiKaggle } from "react-icons/si";
import logo from "../../assets/images/blogo.png";
import huggingFace from "../../assets/images/huggingFace.svg";
import { Link } from "react-router-dom";

export const RevealBento = () => {
  return (
    <div className="min-h-screen  px-2 lg:px-4 py-12 text-zinc-50">
      <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-20">
        <div className="flex justify-center items-center mx-auto">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="text-indigo-400 text-center text-4xl font-black">
            A seamless way to innovate and create
          </h1>
        </div>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-7xl grid-flow-dense grid-cols-12  gap-4 mb-48"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-gray-900 backdrop-blur-xl  p-5",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 border border-gray-400 border-opacity-20 rounded-xl row-span-2 md:col-span-6 bg-opacity-50">
    <img
      className=" object-contain w-8 mb-4 size-14 rounded-full"
      src={logo}
      alt=""
    />

    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Evolving the way we work, live and innovate.
    </h1>
    <Link
      to="/about"
      className="flex items-center gap-1 text-orange-500 hover:underline"
    >
      About me <FiArrowRight />
    </Link>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 rounded-xl bg-gray-900 md:col-span-3"
    >
      <a
        href="https://huggingface.co/BharatAidotin"
        className="grid h-full place-content-center text-3xl "
      >
        <img className="w-9" src={huggingFace} />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 rounded-xl bg-green-600 md:col-span-3"
    >
      <a
        href="https://github.com/BHARATTECH-ECOSYSTEMS/BharatAi_RS1"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 rounded-xl bg-orange-500 md:col-span-3 "
    >
      <a
        href="https://gitlab.bharat-tech.org/bharatai/bharatai"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGitlab />
      </a>
    </Block>

    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 rounded-xl bg-blue-400 md:col-span-3"
    >
      <a
        href="https://www.kaggle.com/models/bharatai/bharatai_rs1"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiKaggle className="text-4xl" />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 border border-gray-400 border-opacity-20 rounded-xl text-3xl leading-snug bg-opacity-50">
    <p>
      Harnessing the power of AI to drive innovation.{" "}
      <span className="text-zinc-400">
        Leverage the transformative potential of AI to elevate your business.
        Explore a future filled with possibilities through AI-driven solutions.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 border border-gray-400 border-opacity-20 rounded-xl flex flex-col items-center gap-4 md:col-span-3 bg-opacity-50">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">India</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9 bg-opacity-50 border border-gray-400 border-opacity-20 rounded-xl">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-gray-500 bg-gray-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail className="fill-gray-800 " /> Join the list
      </button>
    </form>
  </Block>
);

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-12 fill-zinc-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

// const Footer = () => {
//   return (
//     <footer className="mt-12">
//       <p className="text-center text-zinc-400">
//         Made with ❤️ by{" "}
//         <a href="#" className="text-red-300 hover:underline">
//           @tomisloading
//         </a>
//       </p>
//     </footer>
//   );
// };
