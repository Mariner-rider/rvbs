import { GoArchive, GoImage, GoPlus } from "react-icons/go";
import logo from "../../../../assets/images/blogo.png";
import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "./AttachmentLogic";

export const Attachments = () => {
  const actions = [
    {
      icon: <GoPlus className="w-4 h-4 fill-gray-800 dark:fill-gray-100" />,
      label: "New File",
      action: () => console.log("New File"),
    },
    {
      icon: <GoImage className="w-4 h-4 fill-gray-800 dark:fill-gray-100" />,
      label: "Upload Image",
      action: () => console.log("Upload Image"),
    },
    {
      icon: <GoArchive className="w-4 h-4 fill-gray-800 dark:fill-gray-100" />,
      label: "Edit Colors",
      action: () => console.log("Edit Colors"),
    },
  ];

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            className="fill-gray-500 dark:fill-gray-100"
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-40 text-sm h-35 ">
        {/* <PopoverHeader>Quick Actions</PopoverHeader> */}
        <PopoverBody>
          {actions.map((action, index) => (
            <PopoverButton
              className="px-1 "
              key={index}
              onClick={action.action}
            >
              {action.icon}
              <span className="text-gray-800 dark:text-gray-100">
                {action.label}
              </span>
            </PopoverButton>
          ))}
        </PopoverBody>
      </PopoverContent>
      {/*<img src={logo} className="w-7 ml-5" />*/}
    </PopoverRoot>
  );
};
