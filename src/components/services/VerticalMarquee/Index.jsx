import React from "react";
import Marquee from "./Marquee";

const MarqueeMain = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto p-7  lg:p-0 mb-20 lg:mb-0">
        <div className="images_title">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[3px] "
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="leading-[24px] text-2xl text-indigo-400">
            Introducing Blocks
          </h1>
        </div>

        <div>
          <h1 className=" text-5xl lg:text-7xl mt-4 text-center font-bold">
            A new easy way to create.
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-w-[90rem] mx-auto justify-between h-screen md:h-[90vh] px-4 lg:px-10 items-center mb-40 md:mb-0">
        <div className="w-full md:w-[40%] p-3 mb-10 lg:mb-0">
          <p className="text-indigo-500 font-black text-xl leading-8">
            Established fact
          </p>
          <h1 className="text-5xl pb-6 pt-3 text-gray-100">
            Integrate with 100+ Tools
          </h1>
          <p className="text-gray-200 text-xl leading-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters,
          </p>
        </div>
        <div className="w-full relative flex h-[80vh] min-h-72 md:w-[30rem] items-center justify-center overflow-hidden ">
          <Marquee pauseOnHover className="items-center" vertical>
            <div className="w-[12rem] h-[10rem] md:w-[14rem] bg-gray-400 md:h-[12rem]">
              <h1 className="text-3xl text-center text-gray-100">Card One</h1>
            </div>
          </Marquee>
          <Marquee pauseOnHover className="items-center" vertical reverse>
            <div className=" w-[12rem] h-[10rem] md:w-[14rem] bg-gray-400 md:h-[12rem]">
              <h1 className="text-3xl text-center text-gray-100">Card One</h1>
            </div>
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default MarqueeMain;
