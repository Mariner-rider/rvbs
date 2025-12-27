import { useEffect, useState } from "react";
import "../../styles/banner.css";

import logo from "../../assets/images/blogo.png";
import { Scroll } from "../HomeTablet";
import { Link } from "react-router-dom";

const Banner = () => {
  // const [rotation, setRotation] = useState(0);
  // const [scrollValue, setScrollValue] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollValue(window.scrollY);
  //     console.log(scrollValue);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [window.scrollY]);

  // useEffect(() => {
  //   setRotation(scrollValue / 4);
  // }, [scrollValue]);

  return (
    <section className="h-fit lg:h-fit relative overflow-hidden mb-12 w-screen">
      <div className="relative z-40 pt-40 md:pt-56 lg:pt-44 ">
        <div className=" max-w-7xl text-center mx-auto">
          <img className="w-20 lg:w-24 mx-auto mb-14" src={logo} alt="" />
          <h1 className="text-[3em] lg:text-[5rem] leading-none font-bold md:leading-none md:tracking-normal mb-6  text-gray-50 text-center">
            Driving Innovation Through Intelligent Research
          </h1>
          <p className="mb-10 max-w-4xl mx-auto lg:text-xl leading-normal tracking-wide text-gray-50 dark:text-gray-300">
            Utilizing AI to foster innovation, envisioning a future abundant
            with possibilities through AI-powered solutions.
          </p>
        </div>
        <div className="button flex h-full w-full items-center justify-center z-0">
          <Link
            to={"/chat"}
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-10 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:-translate-x-2"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-4"></span>
            <span className="relative z-20 flex items-center text-sm !text-white">
              <svg
                className="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Try Bharat AI
            </span>
          </Link>
        </div>
      </div>
      <div className="z-0 ">
        <div
          className=" z-10 absolute top-[220px] md:top-[262px] lg:top-[199px] w-[1459px] h-[1461px]  "
          style={{ left: "50%", transform: "translate(-50%, 0%)" }}
        >
          <div
            className="w-[100%] h-[100%] relative"
            style={{
              transform: "rotate(180deg)",
              zIndex: 4,
              flexShrink: 0,
              borderRadius: "100%",
              opacity: "0.4",
              mixBlendMode: "luminosity",
              rotate: "180deg",
              background:
                "radial-gradient(60.42% 60.42% at 50.02% 60.42%, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 69.42%, rgba(255, 255, 255, 0.08) 75.33%, rgba(255, 255, 255, 0.13) 80.42%, rgba(255, 255, 255, 0.31) 86.39%, rgba(255, 255, 255, 0.57) 92.19%, #FFF 100%)",
              boxShadow: "0px -40px 40px 0px rgba(255, 255, 255, 0.40)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={1459}
              height={1461}
              viewBox="0 0 1459 1461"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M0.499936 730.5C0.499901 1133.67 326.885 1460.5 729.5 1460.5C1132.11 1460.5 1458.5 1133.67 1458.5 730.5C1458.5 327.331 1132.11 0.499971 729.5 0.499936C326.885 0.499901 0.499971 327.331 0.499936 730.5Z"
                stroke="url(#paint0_linear_3113_17586)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3113_17586"
                  x1="729.5"
                  y1="-6.37749e-05"
                  x2="729.5"
                  y2={1461}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset={1} stopColor="white" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div
          className="absolute top-0 w-screen lg:w-[99vw] z-0 min-w-[1440px] h-[1020px] "
          style={{
            background:
              "url(https://cdn-www.dora.run/__dora__/morpheus/static/images/ai/bg-first.webp) no-repeat center",
            backgroundSize: "100% 100%",
            flexShrink: 0,
          }}
        />
      </div>
      <div className="mt-16 ">
        <Scroll />
      </div>
    </section>
  );
};

export default Banner;
