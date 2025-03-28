import React from "react";

const Searchbar = ({ onSearch }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 h-14 w-full bg-white shadow-sm">
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search by title, category, price, or rating..."
        className="outline-none bg-transparent text-gray-700 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
