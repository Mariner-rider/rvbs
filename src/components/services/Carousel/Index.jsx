import innovation from "../../../assets/icons/innovation1.png";
import excellence from "../../../assets/icons/excellence.png";
import integration from "../../../assets/icons/integration.png";
import { CircleCarousel } from "./CircleCarousel";
import "./styles.css";

const images = [innovation, excellence, integration, innovation, excellence];

const CarouselMain = () => {
  return (
    <div className=" min-h-dvh mb-32">
      <div className="flex flex-col justify-center items-center mx-auto p-7 mt-32 lg:p-0 ">
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
      <div className="flex flex-col mt-5 pt-14 lg:pt-0 lg:mt-32 lg:max-w-[90rem] lg:flex-row justify-evenly items-center 2xl:justify-between mx-auto overflow-hidden lg:overflow-visible">
        <div className="">
          <CircleCarousel
            images={images}
            carouselRadius={300}
            peripheralImageRadius={50}
            centralImageRadius={200}
            focusElementStyling={{ border: "6px solid #6366f1" }}
            autoRotateTime={3}
            borderWidth={2}
            borderHexColor={"c7c7c7"}
          />
        </div>

        <div className="lg:w-[40%] p-3 mt-14 lg:mt-0">
          <p className="text-indigo-500 font-black text-xl leading-8">
            Established fact
          </p>
          <h1 className="text-5xl pb-6 pt-3 text-gray-100">
            Introduction to Our Tools
          </h1>
          <p className="text-gray-200 text-xl leading-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters,
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarouselMain;
