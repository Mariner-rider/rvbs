import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const ShareButtons = ({ item }) => {
  const parseResponse = (response) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(response, "text/html");
    return parsedHtml.body.textContent || "";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" border hover:bg-gray-300 dark:hover:bg-[#6b6b6b] bg-gray-200 dark:bg-[#121212] border-gray-400 dark:border-gray-200/30 p-1 rounded-[0.6rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              className="text-gray-500 dark:text-gray-200"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" flex bg-gray-100 dark:bg-[#333333]">
        <DropdownMenuItem>
          <WhatsappShareButton
            title={`${"Query : " + item.query}\n\n`}
            url={parseResponse(item.response)}
          >
            <div className="flex items-center  p-2 rounded-md bg-green-500 hover:bg-green-600">
              <FontAwesomeIcon className="text-xl" icon={faWhatsapp} />
            </div>
          </WhatsappShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkedinShareButton
            title={item.query}
            summary={parseResponse(item.response)}
            url={window.location.href}
          >
            <div className="flex items-center  p-2 rounded-md bg-blue-600 hover:bg-blue-700">
              <FontAwesomeIcon className="text-xl" icon={faLinkedin} />
            </div>
          </LinkedinShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FacebookShareButton
            quote={parseResponse(item.response)}
            url={window.location.href}
          >
            <div className="flex items-center  p-2 rounded-md bg-blue-500 hover:bg-blue-700">
              <FontAwesomeIcon className="text-xl" icon={faFacebook} />
            </div>
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TwitterShareButton
            title={item.query}
            url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              parseResponse(item.response)
            )}`}
          >
            <div className="flex items-center  p-2 rounded-md bg-black hover:bg-gray-700">
              <FontAwesomeIcon className="text-xl" icon={faXTwitter} />
            </div>
          </TwitterShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="w-14 mt-2 bg-white dark:bg-[#181818] border border-gray-400 border-opacity-40 rounded shadow-lg p-1 z-10">
    //   <WhatsappShareButton
    //     title={`${"Query : " + item.query}\n\n`}
    //     // title={`${query}\n\n`}
    //     url={parseResponse(item.response)}
    //   >
    //     <div className="flex items-center m-1 p-2 rounded-md bg-green-500 hover:bg-green-600">
    //       <FontAwesomeIcon className="text-2xl" icon={faWhatsapp} />
    //     </div>
    //   </WhatsappShareButton>

    //   <LinkedinShareButton
    //     title={item.query}
    //     summary={parseResponse(item.response)}
    //     url={window.location.href}
    //   >
    //     <div className="flex items-center m-1 p-2 rounded-md  bg-blue-600 hover:bg-blue-700">
    //       <FontAwesomeIcon className="text-2xl" icon={faLinkedin} />
    //     </div>
    //   </LinkedinShareButton>

    //   <FacebookShareButton
    //     quote={parseResponse(item.response)}
    //     url={window.location.href}
    //   >
    //     <div className="flex items-center m-1 p-2 rounded-md  bg-blue-500 hover:bg-blue-700 ">
    //       <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
    //     </div>
    //   </FacebookShareButton>

    //   <TwitterShareButton
    //     title={item.query}
    //     url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
    //       parseResponse(item.response)
    //     )}`}
    //   >
    //     <div className="flex items-center m-1 p-2 rounded-md  bg-black hover:bg-gray-700 ">
    //       <FontAwesomeIcon className="text-2xl" icon={faXTwitter} />
    //     </div>
    //   </TwitterShareButton>
    // </div>
  );
};

export default ShareButtons;
