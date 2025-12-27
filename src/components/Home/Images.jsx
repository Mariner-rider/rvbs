import React, { useLayoutEffect, useRef } from "react";
import { Stack } from "@mui/material";
import gsap from "gsap";
import "../../styles/images.css";
import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";
import card4 from "../../assets/images/card4.png";
import card5 from "../../assets/images/card5.png";
import card6 from "../../assets/images/card6.png";
import { useInView } from "framer-motion";

const Images = () => {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".scroll-up",
      {},
      {
        transform: "translateY(40px)",
        scrollTrigger: {
          trigger: ".scroll-up",
          start: "top 50%",
          end: "top top",
          scrub: 1,
          toggleActions: "play play reverse reverse",
        },
      }
    );

    gsap.fromTo(
      ".scroll-down",
      {},
      {
        transform: "translateY(-40px)",
        scrollTrigger: {
          trigger: ".scroll-down",
          start: "top 50%",
          end: "top top",
          scrub: 1,
          toggleActions: "play play reverse reverse",
        },
      }
    );
  }, []);

  return (
    <section className="images_containter mt-44">
      <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
        <div className="flex justify-center items-center mx-auto">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" mr-3"
          >
            <path
              d="M8.75348 17.6952C7.72056 14.0706 3.94416 10.3084 0.305928 9.27938C-0.101976 9.14829 -0.101976 8.8599 0.305928 8.72226C3.95074 7.68666 7.72056 3.931 8.76005 0.299863C8.8719 -0.0999545 9.14164 -0.0999545 9.25349 0.299863C10.2864 3.931 14.0628 7.68666 17.6945 8.72226C18.1024 8.85335 18.1024 9.14829 17.6945 9.27938C14.0562 10.3084 10.2798 14.0706 9.24691 17.6952C9.13506 18.1016 8.86532 18.1016 8.75348 17.6952Z"
              fill="#8082ff"
            ></path>
          </svg>
          <h1 className="images_blocks text-4xl font-black">
            A Vision of Innovation & Progress
          </h1>
        </div>
      </div>

      <div className="w-full flex justify-center align-middle overflow-hidden p-2">
        <Stack
          className="px-4"
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
        >
          <div className="flex flex-col lg:flex-row  items-center">
            <div className="scroll-up mx-2">
              <div className="roundedcards" style={{ height: "230px" }}>
                <img src={card6} />
              </div>
              <div
                className="roundedcards 2xl:mb-14"
                style={{ height: "397px" }}
              >
                <img src={card1} />
              </div>
            </div>
            <div className="scroll-down mx-2" style={{ marginTop: "100px" }}>
              <div className="roundedcards" style={{ height: "397px" }}>
                <img src={card2} />
              </div>
              <div
                className="roundedcards hidden lg:static"
                style={{ height: "67px" }}
              ></div>
            </div>
            <div className="scroll-up mb-8 md:mb-0 -mt-2 lg:mt-[300px] mx-2">
              <div className="roundedcard h-[260px] lg:h-[250px]">
                <img src={card6} />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  items-center">
            <div className="scroll-down mx-2 mt-10 lg:mt-0">
              <div
                className="roundedcards hidden lg:static"
                style={{ height: "67px" }}
              />
              <div className="roundedcards mb-8 md:mb-0 h-[150px] lg:h-[250px]">
                <img src={card5} />
              </div>
            </div>
            <div className="scroll-up mx-2" style={{ marginTop: "93px" }}>
              <div className="roundedcard h-[490px] lg:h-[397px]">
                <img src={card4} />
              </div>
            </div>
            <div className="scroll-down mx-2">
              <div className="roundedcards" style={{ height: "397px" }}>
                <img src={card3} />
              </div>
            </div>
          </div>
        </Stack>
      </div>
    </section>
  );
};

export default Images;
