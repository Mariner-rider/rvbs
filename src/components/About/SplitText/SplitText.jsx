import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const phrases = [
  "BharatAI is committed to creating solutions that respect user privacy ",
  "and provide equitable access to technology. Our closed AI systems ensure  ",
  " user data remains secure and is never exploited for commercial gain. ",
  "By combining affordability with cutting-edge technology, ",
  "BharatAI ensures that even small businesses and underserved",
  " communities can benefit from the power of AI.",
];
const phrase2 = [
  "BharatAI stands as a beacon of innovation, driving a future where technology",
  "and humanity work hand in hand to create a smarter, more sustainable India. ",
  "Join us on this journey as we build AI that truly makes a difference.",
];

// export default function Home() {
//   return (
//     <div className={styles.container10}>
//       <SplitText />
//       <SplitText />
//       <SplitText />
//       <SplitText />
//       <SplitText />
//       <SplitText />
//     </div>
//   );
// }

export function SplitText() {
  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={styles.body03}>
      {phrases.map((phrase, index) => {
        return (
          <div key={index} className={styles.lineMask}>
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
      <div className="mt-12">
        {phrase2.map((phrase, index) => {
          return (
            <div key={index} className={`${styles.lineMask}`}>
              <motion.p
                custom={index}
                variants={animation}
                initial="initial"
                animate={inView ? "enter" : ""}
              >
                {phrase}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
