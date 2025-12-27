const HelpSupport = () => {
  return (
    <div className="hidden md:block absolute right-4 bottom-4 lg:bottom-2 lg:right-2 z-50">
      <button className="hidden lg:static group relative lg:inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#c0c7ff] to-[#4c64ff]  font-medium text-neutral-200 transition-all duration-300 hover:w-32">
        <div className="inline-flex whitespace-nowrap opacity-0 text-[11px] transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
          Help & Support
        </div>
        <div className="absolute right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              className="text-white "
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
export default HelpSupport;
