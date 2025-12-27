import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ZoomParallax from "./ZoomParalax";

const ZoomContainer = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      {/* <div className="text-center mt-44">
        <h1 className="text-[6rem]">Activities</h1>
      </div> */}
      <ZoomParallax />
    </div>
  );
};

export default ZoomContainer;
