import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import HeroImg from "../assets/images/tabbg4.png";
import Hero1 from "../assets/images/slobe.svg";
import "./../Styles.css";

export const Scroll = () => {
  return (
    <motion.div className="flex flex-col ">
      <ScrollCore />
    </motion.div>
  );
};
export const ScrollCore = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref, // Target the specific element's viewport
    offset: ["start end", "end start"], // Customize the offset as needed
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <motion.div
      className=" transform  p-10 flex items-center justify-center relative "
      ref={ref}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
          scaleX: scrollYProgress,
        }}
      >
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </motion.div>
  );
};

// export const Header = ({ translate }) => {
//   return (
//     <motion.div
//       style={{
//         translateY: translate,
//       }}
//       className="div max-w-5xl mx-auto text-center"
//     >
//       <h1 className="text-4xl font-semibold">
//         Unleash the power of <br />{" "}
//         <span className="text-5xl lg:text-6xl  font-bold mt-1 leading-none">
//           Scroll Animations
//         </span>
//       </h1>
//     </motion.div>
//   );
// };

export const Card = ({ rotate, scale }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-[52rem] -mt-12 mx-auto h-[28rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-[0.7rem] md:p-4 bg-[#161616] rounded-[30px] shadow-2xl"
    >
      <motion.div
        className="bg-gray-100 h-full w-full rounded-[1.2rem] overflow-hidden p-[4px] md:p-2"
        // style={{ translateY: translate }}
        whileHover={{
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
      >
        {" "}
        {/* <img className="mx-auto w-full absolute opacity-15" src={Hero1} /> */}
        {/* <img
          className="mx-auto w-full h-full object-cover rounded-2xl"
          src={HeroImg}
          alt="Hero"
        /> */}
        <video
          className="mx-auto w-full h-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/medias/video1.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
};
