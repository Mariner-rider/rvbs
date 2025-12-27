import React, { useEffect, useRef } from "react";
import "../../styles/text.css";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useInView } from "framer-motion";

export const Text2 = () => {
  const text3 =
    "BharatAI was established as a transformative force in India's technological landscape, with the mission of making AI accessible, ethical, and impactful. It envisions a future where AI drives progress across industries, empowers communities, and creates sustainable opportunities, shaping India into a thriving AI-powered nation by 2030.";
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const splitTypes = document.querySelectorAll(".reveal-type");

    splitTypes.forEach((word) => {
      const text3 = new SplitType(word, { types: "words" });

      gsap.from(text3.words, {
        scrollTrigger: {
          trigger: word,
          start: "top 62%",
          end: "bottom 50%",
          scrub: true,
          toggleActions: "play play reverse reverse",
        },
        opacity: 0.1,
        stagger: 0.1,
        color: "#363636",
      });
    });
  }, []);

  return (
    <div className="mx-auto w-screen text-pretty xl:text-justify lg:w-[80%] 2xl:w-[60%] max-h-full text-4xl lg:text-3xl p-4 lg:p-0 ">
      <div className="flex justify-center pb-8 mx-auto">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="m-3"
        >
          <path
            d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
            fill="#8082ff"
          ></path>
        </svg>
        <h1 className="images_blocks text-4xl font-black">BharatAI Vision</h1>
      </div>

      <p className="reveal-type leading-[2.4rem]  ">{text3}</p>
    </div>
  );
};

export const Text = () => {
  const text =
    "BharatAI is transforming India's AI landscape with open-source, developer-friendly models, optimized for efficiency and accessibility. This ecosystem empowers AI enthusiasts to collaborate, innovate, and customize models, driving India's technological future and empowering the next generation of AI pioneers.";

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const splitTypes = document.querySelectorAll(".reveal-type");

    splitTypes.forEach((word) => {
      const text2 = new SplitType(word, { types: "words" });

      gsap.from(text2.words, {
        scrollTrigger: {
          trigger: word,
          start: "top 62%",
          end: "bottom 50%",
          scrub: true,
          toggleActions: "play play reverse reverse",
        },
        opacity: 0.1,
        stagger: 0.1,
      });
    });
  }, []);

  return (
    <div className="mx-auto p-6 lg:p-0 my-40 w-screen lg:w-[80%] 3xl:w-[70%] max-h-full font-black text-4xl lg:text-5xl 3xl:text-6xl leading-[3.4rem] lg:leading-[4.2rem] 3xl:leading-[5rem]">
      {/* <div className="flex justify-center mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-[3px] m-2"
        >
          <path
            d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
            fill="#8082ff"
          ></path>
        </svg>
        <h1 className="images_blocks">A Vision of Innovation & Progress</h1>
      </div> */}
      <p className="reveal-type">{text}</p>
    </div>
  );
};

export default Text;
