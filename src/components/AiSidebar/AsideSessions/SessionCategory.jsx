import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import SessionItem from "./SessionItem";

const SessionCategory = ({
  title,
  sessions,
  handleSessionClick, // This will be passed from parent
  toggleDropdown,
  chatArchiveDropdown,
}) => {
  const navigate = useNavigate(); // Add navigation hook
  
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

  // Remove the duplicate handleSessionClick function - use the one from props
  // OR if you need to handle navigation here, modify it like this:
  const handleLocalSessionClick = (session) => {
    console.log("Opening chat for session:", session);
    // Navigate to session detail page
    navigate(`/session-detail/${session.id}`); // Fixed: use session.id instead of chat.id
    
    // Also call the parent handler if provided
    if (handleSessionClick) {
      handleSessionClick(session);
    }
  };

  if (filteredSessions.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-sm my-2 text-gray-600 dark:text-gray-300">
        {title}
      </h3>
      <ul>
        {filteredSessions.map((item) => (
          <SessionItem
            key={item.id}
            item={item}
            handleSessionClick={handleLocalSessionClick} // Use local handler
            toggleDropdown={toggleDropdown}
            chatArchiveDropdown={chatArchiveDropdown}
            onArchiveSuccess={handleArchiveSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </ul>
    </div>
  );
};

export default SessionCategory;