import React from "react";
import { Footer2 } from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { DrawCircleText } from "./MinsSection";
import CarouselMain from "./Carousel/Index";
import Categories from "./Caterogies";

import MarqueeMain from "./VerticalMarquee/Index";

import ContactInfo from "../About/Contact";

const Services = () => {
  return (
    <div className="bg-gray-950 overflow-hidden ">
      <Navbar />
      <DrawCircleText />
      <Categories />
      <CarouselMain />
      <MarqueeMain />
      <ContactInfo />
      <Footer2 />
    </div>
  );
};

export default Services;
