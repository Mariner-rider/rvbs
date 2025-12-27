import { SplitText } from "./SplitText/SplitText";

const Privacy = () => {
  return (
    <section className="py-12 mt-24">
      <div className="py-12 lg:max-w-7xl mx-auto">
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
            <h1 className="images_blocks text-4xl font-black">
              Commitment to Privacy and Accessibility
            </h1>
          </div>

          <div>
            <h2 className=" text-lg lg:text-xl  max-w-6xl mt-4 text-center font-bold text-gray-400 capitalize">
              BharatAI is Focused on User Privacy and Accessibility
            </h2>
          </div>
        </div>
      </div>
      <div className=" px-6 w-full md:max-w-[90%] xl:max-w-[75%] mt-12 mx-auto">
        <div className="banner_headbtnright -ml-4 -mt-2  lg:-ml-4 mb-4">
          <li className="bannercircle"></li>
          <li className="bannercircle"></li>
          <li className="bannercircle"></li>
        </div>
        <div className="flex flex-col border-t border-b py-5 border-gray-400 border-opacity-40 justify-center items-center ">
          <SplitText />
        </div>
      </div>
    </section>
  );
};

export default Privacy;
