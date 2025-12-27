import Navbar from "../Home/Navbar";
import { Footer2 } from "../Home/Footer";
import Timelines from "../About/TimelineComponent";
import Card2 from "../Home/CardStack/Card2";
import TestimonialCarousel from "../Home/Carousel";
import CardGrid from "../services/Cards";
import AnimatedBeams from "./AnimatedBeam/Index";

const Research = () => {
  return (
    <div className="bg-gray-950">
      <Navbar />
      <div className="mx-1 pt-52 pb-12 text-center">
        <h1 className="text-6xl lg:text-[6rem] mb-4">Research</h1>
        <p className="text-xl lg:text-2xl">
          Innovative AI, data accessibility, and advanced computing products.
        </p>
      </div>
      <AnimatedBeams />
      <Timelines />
      <Card2 />
      <TestimonialCarousel />
      <CardGrid />
      <Footer2 />
    </div>
  );
};

export default Research;
