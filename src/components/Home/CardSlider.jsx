import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ai1 from "../../assets/images/aibot.png";
import ai2 from "../../assets/images/aibot2.png";
import ai3 from "../../assets/images/aibot3.png";
import "../../styles/cardslider.css";

const animation2 = {
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
      duration: 1,
    },
  },
};

const CardSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref, // Target the specific element's viewport
    offset: ["start end", "end start"], // Customize the offset as needed
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxIndex = cardArr.length - 1;
      // Calculate index based on scrollYProgress, with max index as the limit
      const newIndex = Math.min(
        maxIndex,
        Math.floor(scrollYProgress.get() * (maxIndex + 1))
      );
      setCurrentCardIndex(newIndex);
    };

    const unsubscribeScroll = scrollYProgress.onChange(handleScroll);

    return () => {
      unsubscribeScroll();
    };
  }, [scrollYProgress]);

  const height = useTransform(scrollYProgress, [0, 0.9], ["0", "100%"]);

  const cardArr = [
    {
      CardTitle: ai1,
      CardDescription: "",
    },
    {
      CardTitle: ai2,
      CardDescription: "",
    },
    {
      CardTitle: ai3,
      CardDescription: "",
    },
  ];

  const Card = ({ CardTitle, CardDescription }) => {
    return (
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="card bg-gray-900 backdrop-blur-xl bg-opacity-50"
          variants={animation2}
        >
          <div className="card-info border border-gray-400 border-opacity-20 rounded-xl flex flex-col items-center justify-center ">
            <img
              src={CardTitle}
              className="w-full sm:w-[80%] md:w-[50%] lg:w-[70%] 3xl:w-[80%] mx-auto "
            />
            {/* <div className="card-description">{CardDescription}</div> */}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const cardArr1 = [
    {
      CardHeading1: "India’s First Fully Indigenous AI",
      CardTitle1: "Driving Innovation, Speed & Efficiency",
      CardDescription1:
        "BharatAI is pioneering the Made in India AI ecosystem, built from the ground up by Indian developers to empower the nation with cutting-edge technology . ",
    },
    {
      CardHeading1: "Powering world with Indian AI Revolution",
      CardTitle1: "Optimized AI for Every Developer",
      CardDescription1:
        "Seamlessly transform and deploy AI models with ease. BharatAI is designed for India's AI enthusiasts, offering highly optimized models that run efficiently on low GPU, TPU, and NPU setups making AI accessible to all!",
    },
    {
      CardHeading1: "India’s Open-Source AI Community",
      CardTitle1: " Empowering Developers, Enabling Innovation",
      CardDescription1:
        "Join India's first open-source AI ecosystem, where developers can access, customize, and train AI models efficiently even in minimal GPU environments. Build, innovate, and push the boundaries of AI your way!",
    },
  ];

  const Card1 = ({ CardHeading1, CardTitle1, CardDescription1 }) => {
    return (
      <div>
        <div>
          <h1 className=" text-4xl lg:text-5xl 2xl:text-6xl lg:leading-[4.2rem] ">
            {CardHeading1}
          </h1>
          <p className=" mt-3 lg:mt-6 mb-2 text-xl xl:text-2xl">{CardTitle1}</p>
          <p className=" text-base xl:text-lg opacity-50 ">
            {CardDescription1}
          </p>
        </div>
      </div>
    );
  };

  // Display the current card based on the currentCardIndex
  const currentCard =
    cardArr.length > 0 ? cardArr[currentCardIndex % cardArr.length] : null;

  const currentCard1 =
    cardArr1.length > 0 ? cardArr1[currentCardIndex % cardArr1.length] : null;

  return (
    <section
      className="flex lg:flex-row mx-auto w-full lg:max-w-[98rem]"
      ref={ref}
    >
      <div className="section-2 lg:py-[5rem] lg:px-[20px] w-screen lg:mx-[111px] h-[400vh]">
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
              Built By India, Powered by Innovation.
            </h1>
          </div>
        </div>

        <div className="scroll-card flex flex-col items-center  lg:flex-row ">
          <div className="flex h-[28vh] lg:w-1/2 lg:h-fit">
            <div className="scroll lg:mr-[2rem] hidden lg:block">
              <span className="page">
                {String(currentCardIndex + 1).padStart(2, "0")}
              </span>
              <div className="scroll-bg">
                <motion.div
                  className="scroll-bar"
                  style={{
                    height: height,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.div>
              </div>
              <span className="page ">03</span>
            </div>
            <div className="left-card p-4 w-full mt-5">
              <div>
                {currentCard1 ? (
                  <Card1
                    CardHeading1={currentCard1.CardHeading1}
                    CardTitle1={currentCard1.CardTitle1}
                    CardDescription1={currentCard1.CardDescription1}
                  />
                ) : (
                  <p>No cards available</p>
                )}
              </div>
            </div>
          </div>
          <div className="right-card mCards mr-0 mt-[7rem] md:mt-0 lg:h-screen p-2 lg:w-1/2">
            {currentCard ? (
              <Card
                CardTitle={currentCard.CardTitle}
                CardDescription={currentCard.CardDescription}
              />
            ) : (
              <p>No cards available</p>
            )}
          </div>
          {/* <motion.div
            className="block lg:hidden right-card p-2 w-screen lg:w-1/2"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="card mb-4 bg-gray-900 border border-gray-400 border-opacity-20 backdrop-blur-xl bg-opacity-50"
              variants={animation2}
            >
              <div className="card-info flex flex-col justify-center ">
                <img
                  src={ai1}
                  className="w-screen md:w-[60%] lg:w-[80%] mx-auto mb-6"
                />
                <div className="card-description">
                  <p>
                    Insert blocks, perform powerful actions and leverage the
                    limitless power of AI - all without leaving your keyboard
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="card mb-14 bg-gray-900 border border-gray-400 border-opacity-20 backdrop-blur-xl bg-opacity-50"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className="card-info flex flex-col justify-center "
                variants={animation2}
              >
                <img
                  src={ai3}
                  className="w-screen md:w-[60%] lg:w-[80%] mx-auto mb-6"
                />
                <div className="card-description">
                  <p>
                    Insert blocks, perform powerful actions and leverage the
                    limitless power of AI - all without leaving your keyboard
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default CardSlider;
