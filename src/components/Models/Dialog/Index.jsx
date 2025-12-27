import React, { useState } from "react";
import { FramerModal, ModalContent } from "./Modal";
import { FileUploadIndex } from "./FileUpload/Index";

const AddModals = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className=" h-full my-4 mb-8">
      <button
        onClick={() => setModalOpen(true)}
        className="i h-[200px] w-[200px]   border-2 rounded-xl dark:border-[#656fe2] border-[#c0c6fc] dark:bg-[linear-gradient(110deg,#1e2a78,45%,#3749be,55%,#1e2a78)] bg-[linear-gradient(110deg,#3d5af1,45%,#5471ff,55%,#3d5af1)] bg-[length:200%_100%] dark:hover:border-white px-6 font-medium text-white dark:text-white transition-colors focus:outline-none focus:ring-2 dark:focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 hover:scale-105 transition-transform duration-300 ease-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-20 m-auto "
        >
          <path
            className="fill-indigo-200 hover:fill-indigo-600 "
            d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z"
          />
        </svg>
      </button>

      <FramerModal open={modalOpen} setOpen={setModalOpen}>
        <ModalContent>
          <div className="flex flex-col space-y-1.5 items-center text-center">
            <h2 className="text-gray-800 dark:text-gray-100 text-lg font-semibold leading-none ">
              Create Model
            </h2>
            <p className="text-gray-800 dark:text-gray-100 text-sm text-muted-foreground">
              Create your Model here. Make sure to upload your Model PDF.
            </p>
          </div>
          <div className="grid gap-4 py-4">
            <div className=" flex flex-col items-center gap-4">
              <label className="text-gray-800 dark:text-gray-100 text-lg font-medium leading-none text-right">
                Your Model Name
              </label>
              <input
                className="flex text-gray-800 dark:text-gray-100 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 border-gray-400 border-opacity-60 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                id="name"
                defaultValue="Ai Video Creater"
              />
            </div>
            <div className="flex flex-col space-y-1.5 items-center text-center">
              <label className="text-gray-800 dark:text-gray-300 text-lg font-medium leading-none text-right">
                What it is for?
              </label>
              <input
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors  border-gray-400 border-opacity-60 text-gray-800 dark:text-gray-100 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                id="username"
                defaultValue="To Create video using text..."
              />
            </div>
          </div>
          <div className="">
            <FileUploadIndex setModalOpen={setModalOpen} />
          </div>
        </ModalContent>
      </FramerModal>
    </div>
  );
};
export default AddModals;
