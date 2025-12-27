import React, { useContext, useState, useEffect } from "react";
import { ModeContext } from "../../context/Mode.context";
import DropUpMenu from "./AsideSettings";
import { AuthContext } from "../../context/AuthContext";
import DiscoverModels from "../Models/DiscoverModels";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import AsideArchive from "./AsideChatHistory";
import { FiPlus, FiMessageSquare, FiTrash2 } from "react-icons/fi";

const AiSideBar = ({ chatHistory, currentSessionId, onChatItemClick, onNewChat }) => {
  const { darkMode, toggleMode } = useContext(ModeContext);
  const { user, userToken } = useContext(AuthContext);
  
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isAiOn, setIsAiOn] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Remove unused functions and localStorage code
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // SSE connection for real-time session updates
  useEffect(() => {
    if (!userToken) return;

    let controller;
    const startSSE = async () => {
      try {
        controller = new AbortController();

        await fetchEventSource("http://localhost:8000/get-sessions/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "text/event-stream",
          },
          signal: controller.signal,
          openWhenHidden: true,
          onmessage(event) {
            try {
              const parsedData = JSON.parse(event.data);

              if (!parsedData.success) {
                if (parsedData.message === "Token invalid or expired") {
                  setError("Your session has expired. Please log in again.");
                } else {
                  setError(parsedData.error || "An error occurred");
                }
                setLoading(false);
                return;
              }

              if (parsedData.data) {
                setSessions(parsedData.data);
                setLastUpdate(parsedData.timestamp);
                setLoading(false);
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error);
            }
          },
          onerror(error) {
            console.error("SSE error:", error);
            setError("Connection error. Attempting to reconnect...");
            startSSE();
          },
          onclose() {
            setTimeout(() => {
              if (!controller.signal.aborted) {
                startSSE();
              }
            }, 2000);
          },
        });
      } catch (error) {
        setError(`Failed to connect: ${error.message}`);
        setLoading(false);
      }
    };

    startSSE();

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [userToken]);

  // Handle session click
  const handleSessionClick = (sessionId) => {
    if (onChatItemClick) {
      onChatItemClick(sessionId);
    }
  };

  // Handle new chat
  const handleNewChatClick = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  // Delete session
  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    
    try {
      // If authenticated, try to delete from server
      if (userToken) {
        const response = await fetch(`http://localhost:8000/delete-session/${sessionId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete session from server');
        }
      }

      // Update local state
      const updatedSessions = sessions.filter(session => 
        (session.id || session.session_id) !== sessionId
      );
      setSessions(updatedSessions);

      // If deleting current session, navigate to new chat
      if (sessionId === currentSessionId) {
        handleNewChatClick();
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      // Still update local state even if server delete fails
      const updatedSessions = sessions.filter(session => 
        (session.id || session.session_id) !== sessionId
      );
      setSessions(updatedSessions);
    }
  };

  // Group sessions by date
  const groupSessionsByDate = () => {
    const grouped = {
      Today: [],
      Yesterday: [],
      "Previous Chats": [],
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    sessions.forEach((session) => {
      const sessionDate = new Date(session.created_at || session.createdAt);
      sessionDate.setHours(0, 0, 0, 0);

      if (sessionDate.getTime() === today.getTime()) {
        grouped["Today"].push(session);
      } else if (sessionDate.getTime() === yesterday.getTime()) {
        grouped["Yesterday"].push(session);
      } else {
        grouped["Previous Chats"].push(session);
      }
    });

    return grouped;
  };



  const categorizedSessions = groupSessionsByDate();

  return (
    <div className="flex flex-col justify-between h-[101vh] lg:h-[96vh] lg:flex -mt-3 pt-3 pl-6 pr-6 lg:pr-2 w-64 bg-white dark:text-gray-300 dark:bg-[#121212] flex-shrink-0">
      <div className="flex flex-col">
        {/* New Chat Button */}
        <div className="mt-14 lg:mt-4 mb-4">
          <button
            onClick={handleNewChatClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <FiPlus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-4 p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-lg text-center">
            Loading sessions...
          </div>
        )}

        {/* Chat History */}
        <div className="flex flex-col -mx-16">
          {!isAiOn ? (
            sessions.length > 0 ? (
              <AsideArchive 
                sessions={categorizedSessions}
                currentSessionId={currentSessionId}
                onSessionClick={handleSessionClick}
                onDeleteSession={deleteSession}
              />
            ) : (
              !loading && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8 mx-16">
                  <p className="text-sm">No chat history yet</p>
                  <p className="text-xs mt-1">Start a new conversation!</p>
                </div>
              )
            )
          ) : (
            <div className="text-center w-full -mx-3 bg-gray-200 p-2 text-sm rounded-md text-red-500 font-semibold">
              Closed AI is on
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        
        {/* Session Count */}
        <div className="mb-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <DiscoverModels />
        

        {/* User Profile Section */}
        <div className="flex items-center justify-between mt-2 mb-3 dark:bg-[#404040] dark:hover:bg-[#343434] hover:bg-gray-200 bg-gray-200 space-y-1 -mx-4 py-3 px-2 rounded-lg">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 bg-gray-300 dark:bg-[#5c5c5c] p-[7px] rounded-full mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <div>
              <div className="text-sm text-gray-800 dark:text-gray-100 font-semibold capitalize">
                {user ? user.name : "UserName"}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Freemium
              </div>
            </div>
          </div>
          <DropUpMenu
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            toggleMode={toggleMode}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default AiSideBar;