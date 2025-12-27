import { Link } from "react-router-dom";
import bharatAi from "../../assets/images/blogo.png";
import SphereComponent, { BackgroundSphere } from "./SphereComponent";
import { Sparkles } from "./Particles";
import Faq from "../Faq.component";
import {
  SiGithub,
  SiHuggingface,
  SiInstagram,
  SiLinkedin,
} from "react-icons/si";

const FooterBlock = ({ title, links }) => {
  return (
    <div>
      <h6 className="mb-3 text-sm leading-normal  uppercase text-gray-300 dark:text-gray-600 underline">
        {title}
      </h6>
      <ul className=" leading-6">
        {links.map((link, index) => (
          <li className="mt-1.5 " key={index}>
            <Link
              className=" text-lg transition ease-in-out duration-150 hover:text-orange-500 text-gray-300 dark:hover:text-white"
              to={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const footerLinks = [
  { label: "RS_1", href: "https://huggingface.co/BharatAidotin/BharatAI_RS1" },
  // { label: "Cube Analyse", href: "#0" },
  // { label: "Cube Launch", href: "#0" },
  // { label: "Experimentation", href: "#0" },
];

const footerLinks2 = [
  { label: "Blog", href: "#0" },
  { label: "Cheat Sheet", href: "#0" },
  // { label: "Channel Partners", href: "#0" },
  // { label: "Affiliate Program", href: "#0" },
];

const footerLinks3 = [
  { label: "Session Recording", href: "#0" },
  { label: "Feature Flags", href: "#0" },
  { label: "Heatmaps", href: "#0" },
  { label: "Correlation Analysis", href: "#0" },
];

const footerLinks4 = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "#0" },
  { label: "Work With Us", href: "#0" },
];

export const Footer2 = () => {
  return (
    <footer className="relative overflow-hidden ">
      <BackgroundSphere />
      <Sparkles />
      <div className="mx-auto  max-w-7xl w-full px-3 sm:px-6 pt-20 md:pt-28 lg:pt-32 pb-4 h-auto relative z-60">
        {/* Blocks */}
        <div className="grid gap-1 sm:gap-12 dark:border-gray-800 grid-cols-1 sm:grid-cols-2  py-12">
          {/* 1st block */}
          <div className="max-w-xs col-span-2 md:col-span-1">
            <div className="mb-2 w-36">
              {/* Logo */}
              <Link
                className="inline-flex items-center"
                to="/"
                aria-label="Cruip"
              >
                <img className="w-9 mr-3" src={bharatAi} alt="logo" />
                <p className=" text-xl">BharatAI</p>
              </Link>
            </div>
          </div>

          <div className="flex justify-between">
            <FooterBlock title="PRODUCTS" links={footerLinks} />
            <FooterBlock title="RESOURCES" links={footerLinks2} />
            {/* <FooterBlock title="PROJECTS" links={footerLinks3} /> */}
            <FooterBlock title="COMPANY" links={footerLinks4} />
          </div>
        </div>

        {/* Bottom area */}
        <div className="pb-8 flex items-center justify-between">
          <div className="text-md text-gray-300">
            <Link
              className="text-gray-300 transition ease-in-out duration-150 hover:text-orange-500  dark:hover:text-orange-500 dark:text-gray-300"
              to="/term-of-use"
            >
              Terms
            </Link>{" "}
            ·{" "}
            <Link
              className="text-gray-300 transition ease-in-out duration-150 hover:text-orange-500 dark:hover:text-orange-500  dark:text-gray-300"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social links */}
          <ul className="flex space-x-3 lg:space-x-5">
            <li>
              <a
                className="transition ease-in-out duration-150"
                href="https://www.linkedin.com/company/bharatartificialintelligence/"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                className="transition ease-in-out duration-150"
                href="https://www.instagram.com/bharattech_org/"
                aria-label="Instagram"
              >
                <SiInstagram className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                className="transition ease-in-out duration-150"
                href="https://huggingface.co/BharatAidotin"
                aria-label="HuggingFace"
              >
                <SiHuggingface className="text-2xl " />
              </a>
            </li>
            <li>
              <a
                className="transition ease-in-out duration-150"
                href="https://github.com/BHARATTECH-ECOSYSTEMS/BharatAi_RS1"
                aria-label="Github"
              >
                <SiGithub className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="relative w-screen    overflow-hidden">
        <Faq />
        <div className="relative ">
          <SphereComponent />
        </div>
        <div className="mx-auto pt-4 lg:pt-[10rem] max-w-7xl w-full px-3 sm:px-6 lg:pb-4 h-auto relative z-60">
          <div className="grid gap-1 sm:gap-12 dark:border-gray-800 grid-cols-1 sm:grid-cols-2 py-12">
            <div className="max-w-xs col-span-2 md:col-span-1">
              <div className="mb-2 w-36">
                <Link
                  className="inline-flex items-center"
                  to="/"
                  aria-label="Cruip"
                >
                  <img className="w-9 mr-3" src={bharatAi} alt="logo" />

                  <p className=" text-xl">BharatAI</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-between">
              <FooterBlock title="PRODUCTS" links={footerLinks} />
              <FooterBlock title="RESOURCES" links={footerLinks2} />
              {/* <FooterBlock title="PROJECTS" links={footerLinks3} /> */}
              <FooterBlock title="COMPANY" links={footerLinks4} />
            </div>
          </div>

          <div className="pb-8 flex items-center justify-between">
            <div className="text-md text-gray-300">
              <Link
                className="text-gray-300 transition ease-in-out duration-150 hover:text-orange-500  dark:hover:text-orange-500 dark:text-gray-300"
                to="/term-of-use"
              >
                Terms
              </Link>{" "}
              ·{" "}
              <Link
                className="text-gray-300 transition ease-in-out duration-150 hover:text-orange-500 dark:hover:text-orange-500  dark:text-gray-300"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>

            <ul className="flex space-x-3 lg:space-x-5 items-center">
              <li>
                <a
                  className="transition ease-in-out duration-150"
                  href="https://www.linkedin.com/company/bharatartificialintelligence/"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="text-2xl" />
                </a>
              </li>
              <li>
                <a
                  className="transition ease-in-out duration-150"
                  href="https://www.instagram.com/bharattech_org/"
                  aria-label="Instagram"
                >
                  <SiInstagram className="text-2xl" />
                </a>
              </li>
              <li>
                <a
                  className="transition ease-in-out duration-150"
                  href="https://huggingface.co/BharatAidotin"
                  aria-label="HuggingFace"
                >
                  <SiHuggingface className="text-2xl " />
                </a>
              </li>
              <li>
                <a
                  className="transition ease-in-out duration-150"
                  href="https://github.com/BHARATTECH-ECOSYSTEMS/BharatAi_RS1"
                  aria-label="Github"
                >
                  <SiGithub className="text-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
