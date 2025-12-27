import React from "react";
import ProductImage3 from "../../assets/images/about/research.png";
import { motion } from "framer-motion";

export const DrawCircleText = () => {
  return (
    <div className="grid place-content-center pt-52 pb-20 md:pb-36 px-4 text-yellow-50">
      <h1 className="max-w-7xl text-center text-6xl md:text-7xl xl:text-[8rem] font-black leading-snug">
        Scale your{" "}
        <span className="relative text-orange-500">
          Marketing
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#455ce9"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        with Simple AI Tools
      </h1>
    </div>
  );
};

const MainSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-3 xl:w-[105rem] mx-auto py-12 md:py-20 xl:pt-52">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-gray-600 text-lg pr-5 md:text-xl mb-6">
          Discover amazing features and seamless user experience designed just
          for you. Join us and take the first step towards innovation.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600">
          Get Started
        </button>
      </div>

      {/* Right Image Section */}
      <div
        className="relative w-[60%]"
        style={{
          aspectRatio: "1213/710",
          backgroundColor: "tomato",
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      >
        <img
          src={ProductImage3} // Replace with your image URL
          alt="Main section illustration"
          className="w-full  h-full object-cover  aspect-square hover:scale-105 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default MainSection;
