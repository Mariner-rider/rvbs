import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import ProfileComponent from "./ProfilePage/EditProfile";
import ResetPassword from "./ProfilePage/ResetPassword";
import ArchiveChats from "./ProfilePage/ArchiveChats";
import { FaqCard2 } from "../../Faq.component";

const PopupDropDown = () => {
  const { user, userToken } = useContext(AuthContext);
  // Fetch archived data from the API
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-archived-sessions/",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setChats(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch archived chats."
        );
      }
    };

    fetchChats();
  }, []);

  return (
    <div className=" ">
      <div className="flex flex-col gap-1 w-[36vh] lg:w-full mx-auto">
        <FaqCard2 question={"Profile"} answer={<ProfileComponent />} />
        <FaqCard2 question={"Change Password"} answer={<ResetPassword />} />
        <FaqCard2
          question={"Archived Chats"}
          answer={<ArchiveChats chats={chats} />}
        />
        <div className="py-2 px-2 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              className="text-gray-500 dark:text-gray-300"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
            />
          </svg>

          <h1 className="text-gray-800 dark:text-gray-300">Access</h1>
        </div>
        <div className="bg-gray-300 flex justify-between bg-opacity-50 dark:bg-[#3f3f3f] dark:bg-opacity-60 backdrop-blur-sm rounded-lg py-3 px-4 cursor-pointer">
          <p className="text-black dark:text-white">Change Login Details</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-gray-500 dark:text-gray-300"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </div>
        <div className="flex justify-between bg-gray-300 bg-opacity-50 dark:bg-[#3f3f3f] dark:bg-opacity-60 backdrop-blur-sm rounded-lg py-3 px-4 cursor-pointer ">
          <p className="text-black dark:text-white">Subscription</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-gray-500 dark:text-gray-300"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="flex justify-between bg-gray-300 bg-opacity-50 dark:bg-[#3f3f3f] dark:bg-opacity-60 backdrop-blur-sm rounded-lg py-3 px-4 cursor-pointer ">
          <p className="text-black dark:text-white">Feedback</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-gray-500 dark:text-gray-300"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </svg>
        </div>
        <div className="flex justify-between bg-gray-300 bg-opacity-50 dark:bg-[#3f3f3f] dark:bg-opacity-60 backdrop-blur-sm rounded-lg py-3 px-4 cursor-pointer ">
          <p className="text-red-600 dark:text-red-500 dark:font-bold">
            Account Deactivate
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-red-500  dark:text-red-500"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PopupDropDown;
