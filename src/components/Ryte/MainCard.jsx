const MainCard = ({ loading, error, result }) => {
  return (
    <div className="h-fit mb-44 mt-5  flex items-center justify-center p-6 rounded-xl dark:bg-gray-700/30 bg-gray-200 shadow-md transition-all">
      {loading ? (
        <div className="flex justify-center items-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : result ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="overflow-auto ">
            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {result}
            </pre>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center py-16">
          Generated content will appear here
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default MainCard;
