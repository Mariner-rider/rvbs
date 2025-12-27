import { useContext, useState } from "react";
import { FaqCard3 } from "../Faq.component";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  faLinkedin,
  faFacebook,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SessionItem = ({
  item,
  index,
  toggleDropdown3,
  chatArchiveDropdown,
  onArchiveSuccess,
  onDeleteSuccess,
  currentSessionId,
  onSessionClick,
  onDeleteSession,
}) => {
  const { userToken } = useContext(AuthContext);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  // Check if this session is currently active
  const isActiveSession = currentSessionId === item.id;

  // Archive Session Handler
  const handleArchiveSession = async (id) => {
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
        alert("You can see your archived chat in setting->Profile");
        onArchiveSuccess(id);
      }
    } catch (error) {
      console.error("Error archiving session:", error);
      alert("Failed to archive the session.");
    }
  };

  // Delete Session Handler
  const handleDeleteSession = async (id, e) => {
    e.stopPropagation(); // Prevent session click when deleting
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
        onDeleteSuccess(id);
        // Also call the parent's onDeleteSession if provided
        if (onDeleteSession) {
          onDeleteSession(id, e);
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete the session.");
    }
  };

  // Handle session click
  const handleSessionClick = (e) => {
    // Don't trigger session click if clicking on dropdown or its children
    if (e.target.closest('[data-dropdown-trigger]') || e.target.closest('[data-dropdown-content]')) {
      return;
    }
    if (onSessionClick) {
      onSessionClick(item.id);
    }
  };

  // Generate shareable link
  const shareLink = `${window.location.origin}/share/${item.id}`;

  // Share session handler
  const handleShare = (platform) => {
    const encodedLink = encodeURIComponent(shareLink);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedLink}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div
      key={index}
      className={`relative flex flex-row justify-between items-center text-md capitalize my-1 rounded-lg p-2 cursor-pointer ${
        isActiveSession
          ? "bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700"
          : "bg-gray-300 hover:bg-gray-200 dark:bg-[#3f3f3f] dark:hover:bg-[#2b2b2b]"
      }`}
      onClick={handleSessionClick}
    >
      <li className="flex flex-row justify-between items-center text-gray-800 dark:text-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="size-6"
        >
          <path
            className="text-gray-500 dark:text-gray-100"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 ..."
          />
        </svg>
        {item?.name ? item.name.slice(0, 15) + "..." : ""}
      </li>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button data-dropdown-trigger onClick={(e) => e.stopPropagation()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                className="text-gray-700 dark:text-gray-200"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 bg-gray-100 dark:bg-[#333333]" data-dropdown-content>
          <button
            className="p-2 w-full text-left text-sm rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-[#4e4e4e] dark:font-bold"
            onClick={(e) => {
              e.stopPropagation();
              handleArchiveSession(item.id);
            }}
          >
            Archive
          </button>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="p-2 w-full text-left text-sm rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-[#4e4e4e] dark:font-bold">
              <button onClick={(e) => {
                e.stopPropagation();
                setShowShareDropdown((prev) => !prev);
              }}>
                Share
              </button>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="min-w-[2rem] dark:bg-[#3f3f3f]">
                <DropdownMenuItem>
                  <button
                    className="p-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare("facebook");
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="p-1 px-2 rounded-md bg-green-500 hover:bg-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare("whatsapp");
                    }}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="p-1 px-2 rounded-md bg-black hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare("twitter");
                    }}
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="p-1 px-2 rounded-md bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare("linkedin");
                    }}
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </button>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <button
            className="p-2 w-full text-left text-sm rounded-md text-red-600 hover:bg-red-600 dark:font-bold hover:text-white"
            onClick={(e) => handleDeleteSession(item.id, e)}
          >
            Delete
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SessionListSection = ({ 
  title, 
  sessions, 
  currentSessionId, 
  onSessionClick, 
  onDeleteSession 
}) => {
  const [chatArchiveDropdown, setChatArchiveDropdown] = useState(null);
  // Maintain local state for filtered sessions
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  // Handle session archiving
  const handleArchiveSuccess = (archivedId) => {
    setFilteredSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== archivedId)
    );
  };

  // Handle session deletion
  const handleDeleteSuccess = (deletedId) => {
    setFilteredSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== deletedId)
    );
  };

  if (filteredSessions.length === 0) return null;

  const toggleDropdown3 = (index) => {
    setChatArchiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {sessions.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm my-2 text-gray-600 dark:text-gray-300">
            {title}
          </h3>
          <ul>
            {sessions.map((item, index) => (
              <SessionItem
                key={index}
                item={item}
                index={index}
                toggleDropdown3={toggleDropdown3}
                chatArchiveDropdown={chatArchiveDropdown}
                onArchiveSuccess={handleArchiveSuccess}
                onDeleteSuccess={handleDeleteSuccess}
                currentSessionId={currentSessionId}
                onSessionClick={onSessionClick}
                onDeleteSession={onDeleteSession}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AsideArchive = ({ 
  sessions, 
  currentSessionId, 
  onSessionClick, 
  onDeleteSession 
}) => {
  return (
    <FaqCard3
      question="Your Chat"
      answer={
        <ul>
          <SessionListSection 
            title="Today" 
            sessions={sessions.Today} 
            currentSessionId={currentSessionId}
            onSessionClick={onSessionClick}
            onDeleteSession={onDeleteSession}
          />
          <SessionListSection 
            title="Yesterday" 
            sessions={sessions.Yesterday} 
            currentSessionId={currentSessionId}
            onSessionClick={onSessionClick}
            onDeleteSession={onDeleteSession}
          />
          <SessionListSection
            title="Previous Chats"
            sessions={sessions["Previous Chats"]}
            currentSessionId={currentSessionId}
            onSessionClick={onSessionClick}
            onDeleteSession={onDeleteSession}
          />
        </ul>
      }
    />
  );
};

export default AsideArchive;