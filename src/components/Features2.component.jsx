import React, { useRef, useState } from "react";
import { motion as m, useInView } from "framer-motion";
import FeaturesImage from "../assets/images/about/image12.png";
import FeaturesImage3 from "../assets/images/about/image18.png";
import "./../Styles.css";
import aiprivacy from "../assets/images/about/image14.png";

const Features2InnerText = ({ heading, desc, images }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center "
      ref={ref}
    >
      <div>
        <h3
          className="min-w-[50%] w-full text-4xl leading-[1.277] tracking-[-0.017em] font-bold mb-2 font-hk text-gray-100 dark:text-gray-100"
          style={{
            transform: isInView ? "none" : "translateY(60px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          
          {heading}
        </h3>
        <div
          className="w-full text-lg leading-normal tracking-[-0.017em] text-gray-300 dark:text-gray-300"
          style={{
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
          }}
        >
          {desc}
        </div>
      </div>
      <img
        src={images}
        className="grid place-self-center min-w-[50%] h-[345px] object-contain px-10 pb-10 sm:px-32 md:px-0 md:pb-0 md:pl-0 lg:pl-[5rem]"
        alt="Feature"
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      />
    </div>
  );
};

const Features2Btn = ({ btnname, order, category, setCategory }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium leading-snug transition duration-300 ease-in-out m-1.5 px-5 py-3 shadow ${
        category === order
          ? "text-white bg-indigo-500"
          : "text-gray-800 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-600 border-slate-600"
      }`}
      onClick={() => setCategory(order)}
    >
      {btnname}
    </button>
  );
};

const Features2 = () => {
  const [category, setCategory] = useState("1");

  return (
    <section className="max-w-full relative mt-24">
      <div className="relative max-w-7xl 2xl:max-w-[88rem] px-4 xl:px-6 mx-auto py-12 md:py-20">
        <div className="m-auto w-full">
          <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
            <div className="flex justify-center mx-auto">
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
              <h1 className="images_blocks text-4xl font-black">
                Building AI for the Future
              </h1>
            </div>

            <div>
              <h2 className=" text-lg lg:text-xl  max-w-6xl mt-4 text-center font-bold text-gray-400">
                BharatAI’s foundation is built on advanced AI and autonomous
                systems that redefine how technology interacts with people. Our
                proprietary AI models are designed to enhance decision-making,
                improve efficiency, and enable seamless integration into diverse
                industries.
              </h2>
            </div>
          </div>

          {/* Box */}
          <div className="overflow-hidden  bg-slate-900 border border-gray-400 border-opacity-40 rounded-xl bg-opacity-40 backdrop-blur-sm flex flex-col md:flex-row items-start justify-between max-w-screen-[1104px] w-full mx-auto shadow-md">
            <div className="min-w-[50%] min-h-full p-6 lg:p-10">
              {/* Filters */}
              <div className="mb-6 lg:-mb-4">
                <div className="mt-[-0.375rem] mr-[-0.375rem] ml-[-0.375rem] flex flex-wrap sm:flex-nowrap">
                  <Features2Btn
                    btnname="Advanced Training"
                    order="1"
                    category={category}
                    setCategory={setCategory}
                  />
                  <Features2Btn
                    btnname="Privacy-Centric Design"
                    order="2"
                    category={category}
                    setCategory={setCategory}
                  />
                  <Features2Btn
                    btnname="Scalability and Modularity"
                    order="3"
                    category={category}
                    setCategory={setCategory}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="">
                {category === "1" && (
                  <Features2InnerText
                    heading="Advanced Training"
                    desc="Our LLMs are trained on some of the most complex datasets available globally, including BooksCorpus, ArXiv, and GitHub Repositories, ensuring they excel at understanding intricate queries, providing accurate responses, and adapting to specific use cases.
"
                    images={FeaturesImage}
                  />
                )}
                {category === "2" && (
                  <Features2InnerText
                    heading="Privacy-Centric Design"
                    desc=" BharatAI ensures data privacy by using closed AI systems that do not track or store user patterns.
"
                    images={aiprivacy}
                  />
                )}
                {category === "3" && (
                  <Features2InnerText
                    heading="Scalability and Modularity"
                    desc="From natural language processing to industry-specific solutions, our systems are designed to adapt and grow with the needs of businesses and individuals.
"
                    images={FeaturesImage3}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features2;
