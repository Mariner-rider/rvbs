import styles from "./styles.module.scss";
import ai1 from "../../../assets/images/about/image25.png";
import ai2 from "../../../assets/images/about/image28.png";
import ai3 from "../../../assets/images/about/image19.png";
import ai4 from "../../../assets/images/about/image24.png";
import ai5 from "../../../assets/images/about/image26.png";
import ai6 from "../../../assets/images/about/image1.png";
import ai7 from "../../../assets/images/about/image27.png";
import ai8 from "../../../assets/images/about/image1a.png";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: ai4,
      scale: scale4,
    },
    {
      src: ai3,
      scale: scale5,
    },
    {
      src: ai6,
      scale: scale6,
    },
    {
      src: ai5,
      scale: scale5,
    },
    {
      src: ai1,
      scale: scale6,
    },
    {
      src: ai7,
      scale: scale8,
    },
    {
      src: ai8,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <img className="" src={src} alt="image" placeholder="blur" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Ai industry
// jobs
// Security
