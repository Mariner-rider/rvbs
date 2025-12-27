import transform from "../../assets/images/heroimg1.png";

const StoryPage = () => {
  return (
    <div className="mt-40">
      <section className="py-12 lg:max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center mx-auto p-7 lg:p-0">
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
            <h1 className="images_blocks text-4xl font-black">BharatAI</h1>
          </div>

          <div>
            <h2 className=" text-lg lg:text-xl max-w-6xl mt-4 text-center font-bold text-gray-400">
              Empowering India with Innovative AI Solutions
            </h2>
          </div>
        </div>
      </section>
      <div className="p-4">
        <div className="px-4 lg:px-6 2xl:px-12 w-full lg:max-w-[90rem] mx-auto">
          <div className="banner_headbtnright -ml-4  lg:-ml-4 mb-4">
            <li className="bannercircle"></li>
            <li className="bannercircle"></li>
            <li className="bannercircle"></li>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center ">
            <ul className=" leading-[1.4rem] text-gray-200 tracking-wide lg:w-[40%] ">
              <li className="p-2 pt-4 text-lg border-t border-gray-400 border-opacity-40">
                <span className="text-orange-500 font-bold">BharatAI</span> is
                dedicated to developing cutting-edge AI technologies with a
                strong focus on innovation and privacy.
              </li>
              <li className="p-2 text-lg ">
                <span className="text-orange-500 font-bold capitalize">
                  The core offering
                </span>{" "}
                is a Large Language Model (LLM), trained on diverse datasets
                like RedPajama-V1 and V2, The Pile, Common Crawl, and C4.
              </li>
              <li className="p-2 text-lg ">
                <span className="text-orange-500 font-bold capitalize">
                  BharatAI Datasets{" "}
                </span>
                enable us to understand and generate human-like text, solve
                complex problems, and adapt to evolving challenges.
              </li>
              <li className="p-2 text-lg ">
                <span className="text-orange-500 font-bold capitalize">
                  BharatAI is a movement
                </span>{" "}
                aimed at redefining how AI can serve people by prioritizing
                privacy, efficiency, and affordability.
              </li>
              <li className="p-2 pb-4 text-lg border-b border-gray-400 border-opacity-40">
                <span className="text-orange-500 font-bold capitalize">
                  The mission
                </span>{" "}
                is to bridge the gap between technology and human potential,
                fostering an inclusive and empowered society.
              </li>
            </ul>

            <div className="lg:w-[50%] mt-12 lg:mt-0">
              <img className="w-full" src={transform} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
