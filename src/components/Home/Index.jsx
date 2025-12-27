import Banner from "./Banner";
import CardSlider from "./CardSlider";
import { Sparkles } from "./Particles";
import Text from "./Text";
import Cards from "./cardParallax/Index";
import Footer from "./Footer";
import Images from "./Images";
import Navbar from "./Navbar";
import Testimonials from "../Testimonials.component";
import { RevealBento } from "./GridComponent";
import JumpToTop from "../JumpToTop.component";
import LogoCloud from "../LogoCloud.component";

const MainComponents = () => {
  return (
    <div className="bg-black w-screen ">
      <Navbar />
      <Banner />
      <LogoCloud />
      <Sparkles />
      <Images />
      <Text />
      <CardSlider />
      <div className="mx-auto w-auto xl:w-[82%] 2xl:w-auto">
        <RevealBento />
        {/* <Cards /> */}
        <Testimonials />
      </div>
      <Footer />
      <JumpToTop />
    </div>
  );
};

export default MainComponents;
