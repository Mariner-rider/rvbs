import React, { useState } from "react";

const SearchBarPage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      setIsSearched(true);
    }
  };

  return (
    <div className={`flex flex-col h-screen transition-all duration-500 ${isSearched ? "justify-end" : "justify-center"}`}>
      <div className="w-full flex justify-center">
        <div className="w-4/5 md:w-2/3 lg:w-1/2">
          <input
            type="text"
            className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBarPage;
