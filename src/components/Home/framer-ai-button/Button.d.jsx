// No need to import ButtonHTMLAttributes or MotionProps in plain JavaScript
import { motion } from "framer-motion";

const Button = ({ children = "Get Started", hueValue = 0, ...rest }) => {
  return (
    <motion.button
      {...rest} // Spread the remaining props, such as animation and HTML attributes
      style={{ filter: `hue-rotate(${hueValue}deg)` }} // Apply the hue rotation style
    >
      {children}
    </motion.button>
  );
};

export default Button;
