import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import bharatAi from "/src/assets/images/bharatai2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#f5f6f7] text-black px-4 sm:px-8 md:px-12 py-16 sm:py-20 rounded-3xl mx-4 sm:mx-8 md:mx-16 mt-8 sm:mt-16 mb-2 font-inter">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start flex-wrap gap-y-12 gap-x-8">
          {/* Logo & Support Section */}
          <div className="w-full lg:w-1/4 flex flex-col items-start -ml-0 md:-ml-4 -mt-4">
            <div className="flex flex-col items-start">
              <img
                src={bharatAi}
                alt="BharatAi"
                className="h-[70px] w-auto mb-1 mt-0"
              />
              <div className="w-full flex justify-end">
                <div className="flex items-center text-xs text-black">
                  <span>Owned by</span>
                  <img
                    src="https://www.collegecue.com/static/media/bharat.de0668a069a72296acf9.webp"
                    alt="BharatTech"
                    className="w-[50px] ml-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-semibold text-base mb-1 text-gray-800">
                Support Inquiries:
              </p>
              <div className="flex items-center gap-2 text-base text-black">
                <MdEmail className="text-lg" />
                <span>Contact@bharatai.bsearch.in</span>
              </div>
            </div>

            {/* Terms & Policy Links */}
            <div className="mt-6 text-sm text-gray-600 flex gap-4">
              <Link to="/test/terms" className="cursor-pointer hover:underline">
                Terms
              </Link>

              <Link
                to="/test/privacy"
                className="cursor-pointer hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Middle Section - Three Columns Data */}
          <div className="w-full sm:w-2/3 lg:w-2/5 flex justify-between gap-8 mt-2">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-gray-900">
                Products
              </h3>
              <ul className="space-y-2 text-base text-gray-500">
                <li> <Link to="https://huggingface.co/BharatAidotin/BharatAI_RS1" className="hover:underline">
                  RS_1
                  </Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-gray-900">
                Resources
              </h3>
              <ul className="space-y-2 text-base text-gray-500">
                <li>Blog</li>
                <li>Cheat Sheet</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-gray-900">
                Company
              </h3>
              <ul className="space-y-2 text-base text-gray-500">
                <li>
                  <Link to="/test/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>Our Story</li>
              
                <li> <Link to="https://www.bharat-tech.org/careers" className="hover:underline">
                  Work With Us
                  </Link></li>
              </ul>
            </div>
          </div>

          {/* Get in touch */}
          <div className="w-full lg:w-1/4 lg:ml-auto flex flex-col items-start">
            <h3 className="font-bold text-xl mb-3 text-gray-900">
              Get in touch
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              We don't send spam so don't worry
            </p>

            <div className="flex flex-col w-[70%]">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 mb-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
              />
              <button className="px-4 py-2 bg-black text-white rounded-3xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Sign Up
              </button>

              {/* Social Media Icons with links */}
              <div className="flex gap-8 mt-6 text-xl">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookSquare className="text-blue-600 hover:scale-110 transition-transform cursor-pointer" />
                </a>
                <a
                  href="https://www.instagram.com/bharattech_org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-600 hover:scale-110 transition-transform cursor-pointer" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-gray-800 hover:scale-110 transition-transform cursor-pointer" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-red-600 hover:scale-110 transition-transform cursor-pointer" />
                </a>
                <a
                  href="https://www.linkedin.com/company/bharatartificialintelligence/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-blue-700 hover:scale-110 transition-transform cursor-pointer" />
                </a>
                <a
                  href="https://github.com/BHARATTECH-ECOSYSTEMS/BharatAi_RS1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    alt="GitHub"
                    className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="text-center text-sm sm:text-base text-gray-900 mb-8 px-4">
        <p>© 2024 BHARATTECH Technoecosystem Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
