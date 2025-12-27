import React, { useState } from "react";

const LikeDislikeButtons = ({ onLike, onDislike, item }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (disliked) setDisliked(false);
    if (newLiked && onLike) onLike(item);
  };

  const handleDislike = () => {
    const newDisliked = !disliked;
    setDisliked(newDisliked);
    if (liked) setLiked(false);
    if (newDisliked && onDislike) onDislike(item);
  };

  return (
    <div className="flex gap-2 ml-4">
      <button
        onClick={handleLike}
        className={`border p-1 rounded-[0.6rem] hover:bg-gray-300 dark:hover:bg-[#6b6b6b] ${
          liked
            ? "bg-green-200 dark:bg-green-800"
            : "bg-gray-200 dark:bg-[#121212] border-gray-400 dark:border-gray-200/30"
        }`}
        title="Like"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            className="text-gray-500 dark:text-gray-200 cursor-pointer"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 21h4V9H2v12zM23 10c0-1.104-.896-2-2-2h-6.31l.95-4.57.03-.33c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.104.896 2 2 2h9c.82 0 1.54-.5 1.85-1.22l2.64-6.59c.07-.19.11-.39.11-.59V10z"
          />
        </svg>
      </button>

      <button
        onClick={handleDislike}
        className={`border p-1 rounded-[0.6rem] hover:bg-gray-300 dark:hover:bg-[#6b6b6b] ${
          disliked
            ? "bg-red-200 dark:bg-red-800"
            : "bg-gray-200 dark:bg-[#0c0c0c] border-gray-400 dark:border-gray-200/30"
        }`}
        title="Dislike"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            className="text-gray-500 dark:text-gray-200 cursor-pointer"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 3h4v12H2V3zm21 10c0 1.104-.896 2-2 2h-6.31l.95 4.57.03.33c0 .41-.17.79-.44 1.06L14.17 23l-6.58-6.59C7.22 16.05 7 15.55 7 15V5c0-1.104.896-2 2-2h9c.82 0 1.54.5 1.85 1.22l2.64 6.59c.07.19.11.39.11.59v2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default LikeDislikeButtons;
