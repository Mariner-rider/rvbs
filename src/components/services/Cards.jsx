import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Card = ({ src, title, hoverText }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="group mx-auto m-4 relative bg-gray-900 rounded-xl w-full sm:w-[80%] lg:w-[45%] xl:w-1/5 p-1"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
    >
      <div
        className="relative overflow-hidden rounded-lg shadow-lg bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${src})`,
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-2">
          <h3 className="text-white text-center text-lg font-semibold mb-1 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
            {title}
          </h3>

          <p className="text-white text-center text-sm opacity-0 transform transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-y-[-5px]">
            {hoverText}
          </p>

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </motion.div>
  );
};

const cards = [
  {
    src: "/images/about section/ai1.jpg",
    title: "Card 1",
    hoverText: "More information about Card 1",
  },
  {
    src: "/images/about section/ai1.jpg",
    title: "Card 2",
    hoverText: "More information about Card 2",
  },
  {
    src: "/images/about section/ai1.jpg",
    title: "Card 3",
    hoverText: "More information about Card 3",
  },
  {
    src: "/images/about section/ai1.jpg",
    title: "Card 4",
    hoverText: "More information about Card 4",
  },
];

const CardGrid = () => {
  return (
    <div className="mt-[20rem]">
      <div className="flex flex-col justify-center items-center mx-auto p-7 mt-32 lg:p-0 mb-20">
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
      <div className="container mx-auto px-4 lg:px-2 py-8 flex flex-wrap justify-between">
        {cards.map((card, index) => (
          <Card
            key={index}
            src={card.src}
            title={card.title}
            hoverText={card.hoverText}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
