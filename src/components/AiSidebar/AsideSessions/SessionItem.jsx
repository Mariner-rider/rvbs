// Updated SessionItem.jsx component

import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../ui/dropdown-menu';

const SessionItem = ({ 
  item, 
  onArchiveSuccess, 
  onDeleteSuccess, 
  onUnarchiveSuccess,
  handleSessionClick,
  toggleDropdown,
  chatArchiveDropdown,
  isArchived = false 
}) => {
  const { userToken } = useContext(AuthContext);


  // Archive Session Handler
  const handleArchiveSession = async (id) => {
   if (window.confirm("You can see your archived chats in settings->profile->Archived Chat")) {
    try {
      const response = await axios.post(
        `http://localhost:8000/archive-session/${id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Session Succesfully Archived! You can see Archive session in setting->profile.");
        if (onArchiveSuccess) {
          onArchiveSuccess(id);
        }
      }
    } catch (error) {
      console.error("Error archiving session:", error);
      alert("Failed to archive the session.");
    }
  }
  };

  // Unarchive Session Handler
  const handleUnarchiveSession = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/unarchive-session/${id}/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Session unarchived successfully!");
        if (onUnarchiveSuccess) {
          onUnarchiveSuccess(id);
        }
      }
    } catch (error) {
      console.error("Error unarchiving session:", error);
      alert("Failed to unarchive the session.");
    }
    
  };

  // Delete Session Handler
  const handleDeleteSession = async (id) => {
    if (window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/delete-session/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Session deleted successfully!");
          if (onDeleteSuccess) {
            onDeleteSuccess(id);
          }
        }
      } catch (error) {
        console.error("Error deleting session:", error);
        alert("Failed to delete the session.");
      }
    }
  };

  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
      {/* Session Name - Clickable */}
      <span 
        className="flex-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer truncate"
        onClick={() => handleSessionClick && handleSessionClick(item)}
      >
        {item.name}
      </span>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown && toggleDropdown(item.id);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-32 dark:bg-gray-900">
          {/* Archive/Unarchive Button */}
          {!isArchived ? (
            <button
              className="p-2 w-full text-left text-sm rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:font-bold"
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveSession(item.id);
              }}
            >
              Archive
            </button>
          ) : (
            <button
              className="p-2 w-full text-left text-sm rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:font-bold"
              onClick={(e) => {
                e.stopPropagation();
                handleUnarchiveSession(item.id);
              }}
            >
              Unarchive
            </button>
          )}

          {/* Share Button with dropdown */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <button
      className="p-2 w-full text-left text-sm rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:font-bold"
      onClick={(e) => e.stopPropagation()}
    >
      Share
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-48 dark:bg-gray-900 space-y-1 p-2">
    {/* Facebook */}
    <button
      className="text-sm text-blue-600 hover:underline"
      onClick={() => {
        const url = `https://your-app-url.com/session/${item.id}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }}
    >
      Share on Facebook
    </button>

    {/* Twitter */}
    <button
      className="text-sm text-sky-500 hover:underline"
      onClick={() => {
        const url = `https://your-app-url.com/session/${item.id}`;
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check%20this%20chat%20session!`, '_blank');
      }}
    >
      Share on Twitter
    </button>

    {/* LinkedIn */}
    <button
      className="text-sm text-blue-700 hover:underline"
      onClick={() => {
        const url = `https://your-app-url.com/session/${item.id}`;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      }}
    >
      Share on LinkedIn
    </button>

    {/* WhatsApp */}
    <button
      className="text-sm text-green-600 hover:underline"
      onClick={() => {
        const url = `https://your-app-url.com/session/${item.id}`;
        window.open(`https://api.whatsapp.com/send?text=Check%20out%20this%20chat%20session:%20${encodeURIComponent(url)}`, '_blank');
      }}
    >
      Share on WhatsApp
    </button>

    {/* Copy to Clipboard */}
    <button
      className="text-sm text-gray-700 dark:text-gray-200 hover:underline"
      onClick={() => {
        const url = `https://your-app-url.com/session/${item.id}`;
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }}
    >
      Copy Link to Clipboard
    </button>
  </DropdownMenuContent>
</DropdownMenu>
          {/* Delete Button */}
          <button
            className="p-2 w-full text-left text-sm rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 dark:font-bold"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSession(item.id);
            }}
          >
            Delete
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default SessionItem;