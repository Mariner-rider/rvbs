import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import SessionCategory from "./SessionCategory";
import { FaqCard3 } from "../../Faq.component";

const AideChatSession = ({
  categorizedSessions,
  handleSessionClick,
  toggleDropdown,
  chatArchiveDropdown,
}) => {
  const navigate = useNavigate(); // Add navigation hook

  // Create a unified session click handler
  const handleUnifiedSessionClick = (session) => {
    console.log("Session clicked:", session);
    
    // Navigate to session detail page
    navigate(`/session-detail/${session.id}`);
    
    // Call parent handler if provided
    if (handleSessionClick) {
      handleSessionClick(session);
    }
  };

  return (
    <FaqCard3
      question={"Your Chat"}
      answer={
        <ul>
          <SessionCategory
            title="Today"
            sessions={categorizedSessions.Today || []} // Add fallback for empty arrays
            handleSessionClick={handleUnifiedSessionClick}
            toggleDropdown={toggleDropdown}
            chatArchiveDropdown={chatArchiveDropdown}
          />
          <SessionCategory
            title="Yesterday"
            sessions={categorizedSessions.Yesterday || []}
            handleSessionClick={handleUnifiedSessionClick}
            toggleDropdown={toggleDropdown}
            chatArchiveDropdown={chatArchiveDropdown}
          />
          <SessionCategory
            title="Previous Chats"
            sessions={categorizedSessions["Previous Chats"] || []}
            handleSessionClick={handleUnifiedSessionClick}
            toggleDropdown={toggleDropdown}
            chatArchiveDropdown={chatArchiveDropdown}
          />
        </ul>
      }
    />
  );
};

export default AideChatSession;