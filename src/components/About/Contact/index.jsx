import styles from "./style.module.scss";
import Rounded from "../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../common/Magnetic";
import image from "../../../assets/images/blogo.png";

export default function ContactInfo() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <motion.div ref={container} className={`${styles.contact} px-2`}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className="w-24 mr-4">
              <img className=" object-contain" alt={"image"} src={image} />
            </div>
            <h2 className=" text-5xl lg:text-[6rem] mt-4 font-bold">
              Let's work
            </h2>
          </span>
          <h2 className=" text-5xl lg:text-[6rem] mt-4  font-bold">together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
              <p>Get in touch</p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>Contact@bharatai.bsearch.in</p>
          </Rounded>
          <Rounded>
            <p>+91-05124050467</p>
          </Rounded>
        </div>
      </div>
    </motion.div>
  );
}
