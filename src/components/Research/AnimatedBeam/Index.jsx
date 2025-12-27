import React, { useRef } from "react";
import { AnimatedBeam, Circle } from "./Beams";
import { FacebookIcon } from "react-share";
import logo from "../../../assets/images/blogo.png";

export default function AnimatedBeams() {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);
  return (
    <div
      className="relative flex w-full max-w-[70rem] mx-auto items-center justify-center overflow-hidden rounded-lg p-4 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10 gap-y-32">
        <div className="flex flex-row items-center justify-between ">
          <Circle ref={div1Ref}>
            <FacebookIcon />
          </Circle>
          <Circle ref={div5Ref} className="p-2">
            <FacebookIcon />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="p-2">
            <FacebookIcon />
          </Circle>
          <Circle ref={div4Ref}>
            <img className="h-22 w-22 " src={logo} />
          </Circle>
          <Circle ref={div6Ref} className="p-2">
            <FacebookIcon />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="p-2">
            <FacebookIcon />
          </Circle>
          <Circle ref={div7Ref} className="p-2">
            <FacebookIcon />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-165}
        endYOffset={-10}
        dotted
        gradientStartColor="#00ac47"
        gradientStopColor="#ffba00"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        dotted
        gradientStartColor="#d948ae"
        gradientStopColor="#5b60ff"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={165}
        endYOffset={10}
        dotted
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-165}
        endYOffset={-10}
        reverse
        gradientStartColor="#48b0d9"
        gradientStopColor="#67aeff"
        dotted
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
        dotted
        gradientStartColor="#00ac47"
        gradientStopColor="#4fcc5d"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={165}
        endYOffset={10}
        reverse
        dotted
        gradientStartColor="#48b0d9"
        gradientStopColor="#67aeff"
      />
    </div>
  );
}
