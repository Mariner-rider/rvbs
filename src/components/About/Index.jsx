import React from "react";
import ZoomContainer from "./ZoomParallax";
import TextClip from "./TextClipMask/Index";
import Navbar from "../Home/Navbar";
import { Footer2 } from "../Home/Footer";
import ContactInfo from "./Contact";
import ProjectMain from "./Projects";
import SparkleMain from "./Partners/Index";
import StoryPage from "./Story";
import Features2 from "../Features2.component";
import { ValuesCard } from "./ValuesCard";
import Privacy from "./Privacy";

const About = () => {
  return (
    <div className="bg-gray-950">
      <Navbar />
      <div className="mx-1 pt-52 text-center">
        <h1 className="text-6xl lg:text-[6rem] mb-4">About US</h1>
        <p className="text-xl lg:text-2xl">
          BharatAI delivers cutting-edge AI solutions and seamless data access,
          empowering businesses to excel.
        </p>
      </div>
      <SparkleMain />
      <ZoomContainer />
      <StoryPage />
      <ValuesCard />
      <Features2 />
      {/* <TextClip /> */}
      <ProjectMain />
      <Privacy />
      <ContactInfo />
      <Footer2 />
    </div>
  );
};

export default About;
