import React, { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import PopupDropDown from "./ProSettingDropDown";

const PopUpModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <>
      <button
        className="flex justify-between w-[80%]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Profile
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            className="text-gray-500 dark:text-gray-50"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full h-[40rem] bg-white dark:bg-[#121212] border border-gray-400 border-opacity-40 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid rounded-t border-b-gray-400 border-opacity-40">
                  <h3 className="text-2xl mt-1 w-full flex p-2 items-center font-medium leading-6 capitalize text-gray-900 dark:text-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.0}
                      stroke="currentColor"
                      className="size-10 mr-2"
                    >
                      <path
                        className="text-indigo-500"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {user ? user.name : "UserName"}
                  </h3>
                  <button
                    className="p-2 my-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 hover:rotate-90 "
                    >
                      <path
                        className="text-gray-400"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-scroll overflow-x-hidden yes-scrollbar">
                  <PopupDropDown />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PopUpModal;
