import React, { useContext, useState } from "react";
import DOMPurify from "dompurify";
import bharatAi from "../assets/images/bharatai2.png";
import axios from "axios";
import ChatHamMenu from "./ChatHamMenu";
import AiLogo from "../assets/images/blogo.png";
import { ModeContext } from "../context/Mode.context";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import AiSideBar from "./AiSidebar/AiSideBar";

import { Link } from "react-router-dom";
import Testimonials from "./Testimonials.component";
import Sidebar from "./AiSidebar/AsideToggle/MainSideBar";

const testimonials2 = [
  {
    title: "Great app - Easy to use",
    feedback:
      "Great value and so easy to use and saves me so much time! I was shocked by how much time and brain energy it saved me. Simple & easy...gotta love that. ✌️",
    rating: 3,
  },
  {
    name: "Derek Gehl",
    position: "CEO at Hire & Retain",
    title: "Time Saving and Better Than PLR Content",
    feedback:
      "CpoyGen is a fantastic tool for writing product descriptions and getting started on blog posts. No longer do I have to stare at a blank screen trying to figure out how to flesh out a topic beyond 50 words. For me, CopyGen replaces buying PLR content that I would similarly edit and personalize. This saves me time because I can actually tailor to my keyword and niche needs.",
    rating: 3,
    img: "https://themepanthers.com/wp/copygen/d1/wp-content/uploads/2023/05/sm-g.jpg",
  },
  {
    name: "Boris Elbert",
    position: "Green Tech",
    title: "Like the name the Software also very SIMPLE to use",
    feedback:
      "I was impressed I have to say, from the time it took me to come up with this stuff, your system improved my productivity. I think you have a creative tool, properly postured, it can generate a lot of positive impact.",
    rating: 4,
    img: "https://themepanthers.com/wp/copygen/d1/wp-content/uploads/2023/05/sm-c.jpg",
  },
  {
    name: "Martin Schoel",
    position: "Manager, Airlines",
    title: "A year of organic marketing in about 30 minutes",
    feedback:
      "Writing articles has never been easier for me. Since I started using CopyGen, I only need a few minutes 🎉",
    rating: 4,
    img: "https://themepanthers.com/wp/copygen/d1/wp-content/uploads/2023/05/sm-b.jpg",
  },
  {
    name: "Ben Tortora",
    position: "CEO at Hire & Retain",
    title: "Just wanna shout out the whole team for this amazing tool",
    feedback:
      "I love it! The simplicity of writing and designing in one app 🎉 Makes social media marketing a breeze ❤️",
    rating: 3,
    img: "https://themepanthers.com/wp/copygen/d1/wp-content/uploads/2023/05/sm-h.jpg",
  },
  {
    name: "Merri Evans",
    position: "CEO at Hire & Retain",
    title: "They've hit a home run with this AI tool",
    feedback:
      "I was literally speechless from the originality of the content that my very first CopyGen test was able to produce from only a small sample of my original content. I was anticipating useless gibberish, but was instead genuinely dumbfounded. I stared at it in amazement for a solid 3 minutes while the idea machine in my head spun wildly.",
    rating: 3,
    img: "https://themepanthers.com/wp/copygen/d1/wp-content/uploads/2023/05/sm-n.jpg",
  },
];

function TestimonialCard2({ testimonial }) {
  const { name, position, title, feedback, rating, img } = testimonial;

  return (
    <div className="bg-white dark:bg-slate-800 bg-opacity-50 shadow-md rounded-lg p-6 flex flex-col w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[250px] h-fit">
      {/* <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src={img} alt={name} />
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-white">{name}</h3>
                    <p className="text-gray-500 text-sm">{position}</p>
                </div>
            </div> */}
      <h4 className="text-xl font-bold mb-2 text-slate-700 dark:text-white">
        {title}
      </h4>
      <p className="text-gray-500">{feedback}</p>
      <div className="mt-4">
        {Array.from({ length: 5 }, (v, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

const ExploreComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Update chat history with the new query
      setChatHistory([...chatHistory, { query: searchQuery, response: null }]);

      const response = await axios.get(
        `http://127.0.0.1:8000/chat/${searchQuery}`
      );
      const searchResults = response.data.response;
      // const searchResults = parsedData;
      // console.log(parsedData);

      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory[updatedChatHistory.length - 1] = {
          query: searchQuery,
          response: searchResults,
        };
        return updatedChatHistory;
      });

      // Clear searchQuery after updating chat history
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching data from Bharat AI:", error);
    } finally {
      setLoading(false);
    }
  };
  const parseResponse = (response) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(response, "text/html");
    return parsedHtml.body.textContent || "";
  };

  const handleCopy = (htmlContent) => {
    // Sanitize the HTML content
    const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
      USE_PROFILES: { html: true },
    });

    // Create a temporary element to hold the sanitized HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedHtml;

    // Add the element to the DOM (off-screen)
    document.body.appendChild(tempElement);

    // Create a range and select the content
    const range = document.createRange();
    range.selectNodeContents(tempElement);

    // Remove any existing selections
    const selection = window.getSelection();
    selection.removeAllRanges();

    // Add the new range
    selection.addRange(range);

    // Try to copy the selection
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset to "Copy" after 3 seconds
    } catch (err) {
      console.error("Could not copy text: ", err);
    }

    // Remove the temporary element from the DOM
    document.body.removeChild(tempElement);
  };

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown2 = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex h-screen antialiased text-gray-800  dark:text-gray-300  dark:bg-slate-800">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-x-hidden ">
        <div className="absolute top-2 left-0 right-0  lg:hidden w-36 mx-auto">
          <Link to="/">
            <img src={bharatAi} alt="logo" />
          </Link>
        </div>
        {/* <AiSideBar chatHistory={chatHistory} /> */}
        <Sidebar chatHistory={chatHistory} />
        {/* Small screen Header---------------------------------------------------- */}
        {/* <ChatHamMenu chatHistory={chatHistory} /> */}
        {/* Ai result Chat Body  -------------------------------------*/}

        <div className="flex flex-col flex-auto h-full p-3 lg:p-6 lg:pl-3">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl mt-1 lg:mt-0 bg-gray-100 dark:bg-gray-700 h-[88vh] lg:h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4 yes-scrollbar">
              <h1 className="text-black text-center text-3xl">
                Bharat AI Model's
              </h1>
              <p className="text-gray-800 text-center text-lg mb-4">
                Discover and create custom versions of our Ai that combine
                instructions, extra knowledge, and any combination of skills.
              </p>
              <div className="flex flex-col flex-wrap justify-start items-center max-w-[1200px] m-auto mt-4 h-auto sm:max-h-[1400px] md:max-h-[1200px] lg:max-h-[900px] gap-6">
                {testimonials2.slice(0).map((testimonial, index) => (
                  <TestimonialCard2 key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreComponent;
