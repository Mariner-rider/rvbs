import React, { useRef, useState } from "react";
import "./../Styles.css";
import { useInView } from "framer-motion";

export const FaqCard = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-900 bg-opacity-50 border border-gray-400 border-opacity-20 rounded-xl dark:bg-gray-900 dark:bg-opacity-60 md:w-3/4 mx-auto my-3 backdrop-blur-sm py-1">
      <h2>
        <button
          id="faqs-title-01"
          className="justify-between items-center font-medium text-left w-full flex px-4 py-6"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="faqs-text-01"
        >
          <span className="text-gray-100 text-lg dark:text-white">
            {question}
          </span>
          <span
            className={`justify-center items-center rounded-full shrink-0 ml-2 flex h-5 w-5  transform transition-all duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 "
              >
                <path
                  className="text-gray-100 dark:text-white"
                  fillRule="evenodd"
                  d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  className="text-gray-100 dark:text-white"
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </button>
      </h2>
      <div
        id="faqs-text-01"
        role="region"
        aria-labelledby="faqs-title-01"
        className={`transition-all duration duration-300 ease-in-out h-0 text-sm leading-[1.5715] grid ${
          expanded
            ? "grid-rows-[1fr] opacity-100 h-full"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-visible">
          <p className="px-4 pb-2 text-[16px] text-gray-300 dark:text-gray-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FaqCard2 = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="bg-gray-300 bg-opacity-50 dark:bg-[#3f3f3f] dark:bg-opacity-60 backdrop-blur-sm rounded-lg py-1"
      ref={ref}
    >
      <h2
        style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s",
        }}
      >
        <button
          id="faqs-title-01"
          className="justify-between items-center font-medium text-left w-full flex px-4 py-2"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="faqs-text-01"
        >
          <span className="text-black text-md dark:text-white">{question}</span>
          <span
            className={`justify-center items-center rounded-full shrink-0 ml-2 flex h-5 w-5  transform transition-all duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 "
              >
                <path
                  className="text-gray-700 dark:text-white"
                  fillRule="evenodd"
                  d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  className="text-gray-700 dark:text-white"
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </button>
      </h2>
      <div
        id="faqs-text-01"
        role="region"
        aria-labelledby="faqs-title-01"
        className={`transition-all duration duration-300 ease-in-out h-0 text-sm leading-[1.5715] grid ${
          expanded
            ? "grid-rows-[1fr] opacity-100 h-full "
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-visible">
          <p className="px-4 pb-2 text-[16px] text-gray-500 dark:text-gray-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FaqCard3 = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="bg-gray-100 mx-auto dark:bg-[#242424] border border-gray-400 border-opacity-40 space-y-1 rounded-lg w-[73%] lg:w-[72%] backdrop-blur-sm overflow-hidden"
      ref={ref}
    >
      <h2
        style={{
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s",
        }}
      >
        {/*<button
          id="faqs-title-01"
          className="justify-between items-center font-medium text-left w-full flex px-4 py-3"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="faqs-text-01"
        >
          <span className="text-gray-700 dark:text-gray-200 text-lg ">
            {question}
          </span>
          <span
            className={`justify-center items-center rounded-full shrink-0  flex h-5 w-5  transform transition-all duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 "
              >
                <path
                  className="text-gray-700 dark:text-gray-200"
                  fillRule="evenodd"
                  d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  className="text-gray-700 dark:text-gray-200"
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </button>*/}
        <button
  id="faqs-title-01"
  className="justify-between items-center font-medium text-left w-full flex px-4 py-3"
  onClick={() => setExpanded(!expanded)}
  aria-expanded={expanded}
  aria-controls="faqs-text-01"
>
  <span className="text-gray-700 dark:text-gray-200 text-lg ">
    {question}
  </span>
  <span
    className="text-xl text-gray-700 dark:text-gray-200 transition-all duration-300"
  >
    {expanded ? "^" : "˅"}
  </span>
</button>

      </h2>
      <div
        id="faqs-text-01"
        role="region"
        aria-labelledby="faqs-title-01"
        className={`transition-all duration duration-300 ease-in-out h-0 text-sm leading-[1.5715] grid ${
          expanded
            ? "grid-rows-[1fr] opacity-100 h-[40vh]"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-y-scroll yes-scrollbar">
          <p className="px-4 pb-3 text-[16px] text-gray-300 dark:text-gray-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <main
      className="relative grow px-2 lg:px-4 sm:px-7 py-12 md:py-20 w-screen mx-auto z-40"
      id="faq"
    >
      <section className="pb-16 ">
        <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0 mb-10">
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
              Frequently Asked Questions (FAQs)
            </h1>
          </div>

          <div>
            <h1 className="text-lg lg:text-xl  max-w-6xl mt-4 text-center font-bold text-gray-400">
              General Questions
            </h1>
          </div>
        </div>
      </section>

      {/* <!-- Accordion --> */}
      <div className="flex flex-col gap-1 max-w-screen-lg mx-auto">
        <FaqCard
          question={"What is BharatAI's mission?"}
          answer={
            "BharatAI aims to transform India’s technological landscape by providing accessible, ethical, and innovative AI-driven solutions that empower individuals, businesses, and communities."
          }
        />
        <FaqCard
          question={"How is BharatAI different from other AI companies?"}
          answer={
            "BharatAI focuses on privacy-centric, affordable, and modular AI solutions tailored specifically for India’s diverse needs. Our advanced Large Language Models (LLMs) are trained on globally recognized datasets like RedPajama-V1, The Pile, and Common Crawl, ensuring unmatched performance and adaptability."
          }
        />
        <FaqCard
          question={" How does BharatAI ensure user privacy?"}
          answer={
            "BharatAI employs closed AI systems that do not track or store user patterns. Our solutions are designed to maintain strict data privacy, ensuring that user information remains secure and confidential."
          }
        />
        <FaqCard
          question={"What industries can benefit from BharatAI’s technology?"}
          answer={
            "BharatAI serves multiple industries, including education, customer service, business analytics, and technology-driven enterprises, by providing scalable AI solutions."
          }
        />
        <FaqCard
          question={"What are the key features of BharatAI’s technology?"}
          answer={
            "Advanced NLP Capabilities for seamless human-like conversations.Privacy-Centric Design to ensure data protection. Scalable & Modular AI Tools adaptable to various industries."
          }
        />
        <FaqCard
          question={"How can BharatAI support startups and small businesses?"}
          answer={
            "BharatAI provides scalable and cost-effective AI tools, empowering startups and small businesses with advanced capabilities like NLP, automation, and data insights to grow and compete in the market."
          }
        />
        <FaqCard
          question={"What makes BharatAI’s technology future-ready?"}
          answer={
            "BharatAI integrates state-of-the-art AI models with modular, scalable designs and robust data privacy measures, ensuring solutions that adapt to evolving technological demands while respecting ethical standards."
          }
        />
      </div>
    </main>
  );
};

export default Faq;
