import { useEffect, useRef } from "react";

//gsap
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import MotionPathHelper from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathHelper);

const PathAnimation = () => {
  const lineRef = useRef(null);
  const carRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial position for the car
    gsap.set(carRef.current, {
      yPercent: 0,
      xPercent: 20,
      rotate: 0,
    });

    // Create the animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // Correctly reference DOM element
        scrub: true,
        start: "top center",
        end: "bottom center",
      },
    });

    tl.to(carRef.current, {
      motionPath: {
        path: lineRef.current, // Reference the line DOM element
        align: lineRef.current,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1,
      },
      ease: "sine.inOut",
    });

    // Cleanup ScrollTrigger and timeline on component unmount
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section
      className="py-16 px-4 md:px-2 bg-secondary w-full "
      ref={sectionRef}
    >
      <div
        className={`max-w-[1250px] h-full w-full mx-auto relative mt-16 mb-20`}
      >
        <svg
          width="462"
          height="844"
          viewBox="0 0 462 844"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <path
            ref={lineRef}
            d="M4 0L3.99996 951"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <svg
          ref={carRef}
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="57"
            height="57"
            rx="17"
            fill="#E9E9E9"
            fillOpacity="0.25"
          />
          <rect
            x="11"
            y="11"
            width="35"
            height="35"
            rx="13"
            fill="#E6E6E6"
            fillOpacity="0.4"
          />
          <rect x="19" y="19" width="19" height="19" rx="9.5" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default PathAnimation;
