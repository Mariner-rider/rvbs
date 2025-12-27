import React, { useRef } from "react";
import { motion as m, useInView } from "framer-motion";
import solution from "../../assets/images/slide2.png";
import transform from "../../assets/images/slide1.png";
import success from "../../assets/images/slide5.png";
import { Glow, GlowArea } from "../Glow";

const animation = {
  offscreen: {
    x: 300,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};
const animation2 = {
  offscreen: {
    x: -300,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};
const animation3 = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 2,
    },
  },
};

const Categories = () => {
  return (
    <div className="mt-24">
      <section className="py-12">
        <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
          <div className="images_title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[3px]"
            >
              <path
                d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
                fill="#8082ff"
              ></path>
            </svg>
            <h1 className="leading-[2w-full lg:4px] text-xl text-indigo-400">
              Introducing Blocks
            </h1>
          </div>

          <div>
            <h1 className=" text-5xl lg:text-7xl mt-4 text-center font-bold">
              A new easy way to create.
            </h1>
          </div>
        </div>
      </section>
      <GlowArea className="p-4 mx-auto w-full 2xl:w-[90%]">
        <div className="mb-12 lg:mb-32 3xl:mb-12">
          <div
            color="indigo"
            className=" flex flex-col lg:flex-row justify-evenly items-center"
          >
            <m.div className="lg:w-[35%]" variants={animation2}>
              <h2 className="mb-4 text-4xl xl:text-5xl leading-[3rem] lg:leading-[4.2rem] font-bold">
                Transforming Indian <span>Technology</span>
              </h2>
              <p className=" text-lg leading-[1.9rem] text-gray-200 tracking-wider">
                Bharattech is revolutionizing India's technology ecosystem with
                innovative AI, data accessibility, and advanced computing
                products. Emphasizing privacy, efficiency, and sustainability,
                Bharattech supports startups through its Startup Support
                Program, fostering innovation and shaping India's technological
                future.
              </p>
            </m.div>

            <m.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <m.div
                className="w-full lg:w-full lg:w-[500px] xl:w-[600px]"
                variants={animation}
              >
                <img className="w-full" src={transform} alt="" />
              </m.div>
            </m.div>
          </div>
        </div>
        <div className="mb-12 lg:mb-32 3xl:mb-12">
          <div
            color="indigo"
            className="  flex flex-col lg:flex-row-reverse justify-evenly items-center"
          >
            <m.div className="lg:w-[35%]" variants={animation}>
              <h2 className="mb-4 text-4xl xl:text-5xl leading-[3rem] lg:leading-[4.2rem] font-bold">
                Empowering India with Tailored <br /> Technology{" "}
                <span>Solution</span>
              </h2>
              <p className=" text-lg leading-[1.9rem] text-gray-200 tracking-wider">
                Technology Solution Bharattech is an Indian technology company
                offering personalized solutions for Indian users, including
                BharatAI, Recag, Collegecue, and Bsearch. These products address
                high computing resource costs, provide education and
                skill-building opportunities, and offer AI-enabled hyper-local
                search capabilities. They aim to make technology more inclusive,
                affordable, and efficient while maintaining privacy and
                security.
              </p>
            </m.div>

            <m.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <m.div
                className="w-full lg:w-[500px] xl:w-[600px]"
                variants={animation2}
              >
                <img className="" src={solution} alt="" />
              </m.div>
            </m.div>
          </div>
        </div>
        <div className="mb-12 lg:mb-32 3xl:mb-12">
          <div
            color="indigo"
            className=" flex flex-col lg:flex-row justify-evenly items-center"
          >
            <m.div className="lg:w-[35%]" variants={animation2}>
              <h2 className="mb-4 text-4xl xl:text-5xl leading-[3rem] lg:leading-[4.2rem] font-bold">
                <span>Innovative</span> Solutions for Growth & Success
              </h2>
              <p className=" text-lg leading-[1.9rem] text-gray-200 tracking-wider">
                Bharattech offers affordable, scalable solutions for India's
                startup community, including BharatAI, Recag GPU rental,
                Collegecue, and Bsearch, enabling startups to innovate, scale,
                and succeed in a competitive market.
              </p>
            </m.div>

            <m.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <m.div
                className="w-full lg:w-[500px] xl:w-[600px]"
                variants={animation}
              >
                <img src={success} alt="" />
              </m.div>
            </m.div>
          </div>
        </div>
      </GlowArea>
    </div>
  );
};

export default Categories;
