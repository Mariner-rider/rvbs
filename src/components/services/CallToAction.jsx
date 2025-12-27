const CallToAction = () => {
  return (
    <div className="flex justify-center h-screen items-center py-3 px-2">
      <div className=" bg-white flex flex-col gap-4 sm:flex-row justify-around p-8 lg:p-16 drop-shadow-lg rounded-lg max-w-5xl w-full">
        <div className="text-xl md:text-2xl font-bold whitespace-nowrap">
          Do not miss any important news.<br></br>
          <span className="text-[#365CCE] ">Subscribe to the Newsroom</span>
        </div>
        <div className="flex gap-2 items-center justify-center max-w-xs lg:max-w-md w-full">
          <input
            type="text"
            className="rounded-lg lg:py-2 flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#365CCE] focus:border-transparent"
            placeholder="Email"
          />
          <button
            className="px-4 py-1 lg:py-2 text-sm md:text-base lg:text-lg font-semibold text-white bg-[#365CCE] rounded-lg shadow-md hover:bg-[#3651BF] focus:outline-none focus:ring-2 focus:ring-[#547FDD] focus:ring-offset-2 focus:ring-offset-[#C7D9F6]"
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

// circle outline animation
// <span className="relative p-0.5 rounded-full bg-slate-200 group-hover:bg-slate-800 transition duration-500 overflow-hidden flex items-center justify-center before:opacity-0 group-hover:before:opacity-100 before:absolute before:w-1/2 before:pb-[100%] before:bg-[linear-gradient(90deg,_theme(colors.indigo.500/0)_0%,_theme(colors.indigo.500)_35%,_theme(colors.indigo.200)_50%,_theme(colors.indigo.500)_65%,_theme(colors.indigo.500/0)_100%)] before:animate-[spin_3s_linear_infinite]">
