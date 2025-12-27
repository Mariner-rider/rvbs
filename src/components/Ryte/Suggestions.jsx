const Suggestions = ({
  renderParamFields,
  handleGenerate,
  useCase,
  loading,
}) => {
  return (
    <div className="absolute bottom-1 lg:bottom-8 -left-2 right-0 mx-auto ">
      <div className="flex justify-center mx-4 lg:mx-10 ">
        <div className="w-full p-4 xl:w-[80rem] bg-gray-900 rounded-xl">
          <h2 className=" font-semibold mb-2 text-gray-800 dark:text-white">
            Input Parameters
          </h2>
          {useCase ? (
            <form
              className="flex items-center justify-center"
              onSubmit={handleGenerate}
            >
              {renderParamFields()}
              <div className=" ml-2 mt-5 w-[8rem] md:w-[10rem]">
                <button
                  type="submit"
                  className="relative flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white mr-4 lg:ml-0 px-8 lg:px-10 py-7 md:py-8 flex-shrink-0  overflow-hidden font-medium transition duration-300 w-full ease-out shadow-md group"
                  disabled={loading}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange-500 group-hover:translate-x-0 ease font-black text-md lg:text-xl ">
                    Generate
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              Please select a use case from the configuration panel
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
