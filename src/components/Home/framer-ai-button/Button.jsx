import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  buttonAnim,
  highlightContainerAnim,
  highlightAnim,
  labelAnim,
} from "./Button.anim";
import Sparkles from "./components/Sparkles";
import Stars from "./components/Stars";
import S from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ children = "Get Started", hueValue = 0, ...rest }) => {
  const [hover, setHover] = useState(false);
  const [sparkles] = useState(Array(30).fill(0));

  return (
    <Link to="/signup" className="flex mx-auto justify-center relative">
      <Sparkles sparkles={sparkles} hover={hover} />
      <motion.button
        {...rest}
        variants={buttonAnim}
        initial="init"
        animate={hover ? "anim" : "init"}
        whileTap="tap"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className={S.btn}
        type="button"
        style={{ filter: `hue-rotate(${hueValue}deg)` }}
      >
        <motion.div
          data-testid="highlight"
          variants={highlightContainerAnim}
          className={S.highlightContainer}
          animate={hover ? "anim" : "init"}
        >
          <motion.div
            variants={highlightAnim}
            className={S.highlight}
          ></motion.div>
        </motion.div>
        <Stars hover={hover} />
        <motion.span variants={labelAnim}>{children}</motion.span>
      </motion.button>
    </Link>
  );
};

export default Button;
