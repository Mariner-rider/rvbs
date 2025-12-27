import React, { useState } from "react";
import { FileUpload } from "./FileUploadComponent";

export function FileUploadIndex({ setModalOpen }) {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto border border-dashed bg-gray-200 dark:bg-gray-900 border-neutral-200 dark:border-neutral-400 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
      <div>
        <button
          onClick={() => setModalOpen(false)}
          className="w-full p-3 mt-4 bg-black dark:bg-white text-white dark:text-black rounded-md"
          type="button"
        >
          Create Model
        </button>
      </div>
    </>
  );
}
