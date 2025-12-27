import React, { useState, useEffect } from "react";
import "../styles/loader.css";
import { motion } from "framer-motion";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-0 backdrop-blur-xl transition-all duration-[2000ms] ease-in-out">
      <div className="boxes">
        {[...Array(4)].map((_, boxIndex) => (
          <div key={`box-${boxIndex}`} className="box">
            {[...Array(4)].map((_, divIndex) => (
              <div key={`div-${boxIndex}-${divIndex}`} />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-24 text-xl font-black text-white">
        BharatAI - Tech Ecosystem
      </p>
    </div>
  );
};

export default Preloader;
