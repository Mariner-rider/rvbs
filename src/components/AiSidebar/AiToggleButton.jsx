const AiToggleButton = ({ isAiOn, toggleAi }) => {
  return (
    <div className="flex justify-between items-center mb-2 border-2 dark:border-gray-400 dark:border-opacity-40 px-2 py-2 -mx-4 rounded-md">
      <label
        htmlFor="ripple-on"
        className="flex mt-px mb-0 dark:text-gray-100 dark:bg-transparent font-light text-gray-700 cursor-pointer select-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-2"
        >
          <path
            className="text-gray-500 dark:text-gray-100 dark:bg-slate-800"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
        {isAiOn ? "Closed AI" : "AI Off"}
      </label>
      <div className="inline-flex items-center">
        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
          <input
            checked={isAiOn}
            onChange={toggleAi}
            id="switch-6"
            type="checkbox"
            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-200 dark:bg-gray-300 checked:bg-indigo-500 peer-checked:border-indigo-500 peer-checked:before:bg-indigo-500"
          />
          <label
            htmlFor="switch-6"
            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-indigo-500 
            dark:peer-checked:bg-indigo-500 peer-checked:before:bg-indigo-500"
          ></label>
        </div>
      </div>
    </div>
  );
};
export default AiToggleButton;
