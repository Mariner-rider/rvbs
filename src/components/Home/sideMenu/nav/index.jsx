import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { menuSlide } from "../anim";
import Link from "./Link";
import Curve from "./Curve";
import Footer from "./Footer";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Research",
    href: "#",
  },
  {
    title: "Products",
    href: "#",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Career",
    href: "#",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function index() {
  const pathname = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.menu} bg-gray-900 backdrop-blur-xl bg-opacity-50`}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <Link
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></Link>
            );
          })}
        </div>
        {/* <Footer /> */}
      </div>
      <Curve />
    </motion.div>
  );
}
