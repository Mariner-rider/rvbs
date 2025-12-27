import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SessionItem from "../../AsideSessions/SessionItem";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ArchiveChats = () => {
  const { userToken } = useContext(AuthContext);
  const [archivedChats, setArchivedChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchArchivedChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/get-archived-sessions/",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setArchivedChats(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch archived chats");
      }
    } catch (err) {
      console.error("Error fetching archived chats:", err);
      setError(err.response?.data?.message || "Failed to fetch archived chats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchArchivedChats();
    }
  }, [userToken]);

  const handleUnarchiveSuccess = (unarchivedId) => {
    setArchivedChats((prevChats) => prevChats.filter((chat) => chat.id !== unarchivedId));
  };

  const handleDeleteSuccess = (deletedId) => {
    setArchivedChats((prevChats) => prevChats.filter((chat) => chat.id !== deletedId));
  };

  const handleRefresh = () => {
    fetchArchivedChats();
  };

  const handleSessionClick = (chat) => {
    navigate(`/session-detail/${chat.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-500 dark:text-gray-400">Loading archived chats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-2">Error: {error}</div>
        <button
          onClick={handleRefresh}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">
          Archived Chats ({archivedChats.length})
        </h4>
        <button
          onClick={handleRefresh}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="Refresh"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
      </div>

      {archivedChats && archivedChats.length > 0 ? (
        <ul className="space-y-1">
          {archivedChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSessionClick(chat)}
              className="cursor-pointer"
            >
              <SessionItem
                item={chat}
                onUnarchiveSuccess={handleUnarchiveSuccess}
                onDeleteSuccess={handleDeleteSuccess}
                handleSessionClick = {handleSessionClick}
                isArchived={true}
              />
            </div>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-2">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mb-2 opacity-50"
            >
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
            </svg>
            No archived chats found
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            When you archive chats, they'll appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ArchiveChats;
