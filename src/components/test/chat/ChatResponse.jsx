import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Maximize2 } from "lucide-react";
import ActionButtons from "./ActionButtons";

const ChatResponse = ({
  messages,
  isThinking,
  isDark,
  reasoningLines = [],
  isGeneratingReasoning = false,
  // Add these new props:
  currentChatId,
  chatHistory,
  onArchiveChat,
}) => {
  const scrollRef = useRef(null);
  const [actionFeedback, setActionFeedback] = useState({});
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [dislikedMessages, setDislikedMessages] = useState(new Set());
  const [expandedReasoning, setExpandedReasoning] = useState({});
  const [fullscreenReasoning, setFullscreenReasoning] = useState(null);

  // State for line-by-line reasoning generation within the current AI turn
  const [displayedReasoningLines, setDisplayedReasoningLines] = useState([]);
  const [currentReasoningText, setCurrentReasoningText] = useState("");
  const [currentReasoningIndex, setCurrentReasoningIndex] = useState(0);

  // State to track if the main AI response content is actively typing
  const [isTypingMainResponse, setIsTypingMainResponse] = useState(false);

  // If no messages, render nothing
  if (messages.length === 0) return null;

  // Group messages into pairs (user + AI)
  // This assumes messages always come in pairs and the last AI message might be incomplete
  const messagePairs = [];
  for (let i = 0; i < messages.length; i += 2) {
    const userMessage = messages[i];
    const aiMessage = messages[i + 1]; // This might be undefined for the very last user message if AI hasn't responded yet
    messagePairs.push({ userMessage, aiMessage });
  }

  // --- Effect for Reasoning Line-by-Line Generation (with character typing for current line) ---
  useEffect(() => {
    if (isGeneratingReasoning && reasoningLines.length > 0) {
      const currentLine = reasoningLines[currentReasoningIndex];

      if (currentLine && currentReasoningText.length < currentLine.length) {
        // Type out current line character by character
        const timer = setTimeout(() => {
          setCurrentReasoningText(
            currentLine.slice(0, currentReasoningText.length + 1)
          );
        }, 40); // Character typing speed for reasoning
        return () => clearTimeout(timer);
      } else if (currentReasoningIndex < reasoningLines.length) {
        // Current line is complete, move to next line after a brief pause
        const timer = setTimeout(() => {
          setDisplayedReasoningLines((prev) => [...prev, currentLine]); // Add completed line to displayed array
          setCurrentReasoningIndex((prev) => prev + 1); // Move to the next line
          setCurrentReasoningText(""); // Reset current text for the new line
        }, 800); // Pause between lines (adjust as needed)
        return () => clearTimeout(timer);
      } else if (currentReasoningIndex >= reasoningLines.length) {
        // All reasoning lines are displayed, signal to start main response typing
        setIsTypingMainResponse(true);
      }
    } else if (
      !isGeneratingReasoning &&
      (currentReasoningIndex > 0 ||
        displayedReasoningLines.length > 0 ||
        currentReasoningText.length > 0)
    ) {
      // Reset reasoning display state when `isGeneratingReasoning` becomes false
      setDisplayedReasoningLines([]);
      setCurrentReasoningIndex(0);
      setCurrentReasoningText("");
      setIsTypingMainResponse(false); // Ensure main response typing is off
    }
  }, [
    isGeneratingReasoning,
    reasoningLines,
    currentReasoningIndex,
    currentReasoningText,
  ]);

  // --- Auto-scroll to bottom on new messages or generation progress ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    messages,
    isThinking,
    displayedReasoningLines,
    currentReasoningText,
    isTypingMainResponse,
  ]);

  // --- Action Feedback (Copy, Share, Like, Dislike) ---
  const showFeedback = useCallback((messageId, action) => {
    setActionFeedback((prev) => ({ ...prev, [messageId]: action }));
    setTimeout(() => {
      setActionFeedback((prev) => {
        const newFeedback = { ...prev };
        delete newFeedback[messageId];
        return newFeedback;
      });
    }, 2000); // Feedback visible for 2 seconds
  }, []);

  const handleCopy = useCallback(
    (text, messageId) => {
      navigator.clipboard.writeText(text);
      showFeedback(messageId, "Copied");
    },
    [showFeedback]
  );

  const handleShare = useCallback(
    (text, messageId) => {
      if (navigator.share) {
        navigator.share({ title: "Scira Response", text });
      } else {
        handleCopy(text, messageId); // Fallback to copy if share API not available
      }
      showFeedback(messageId, "Shared");
    },
    [handleCopy, showFeedback]
  );

  const handleLike = useCallback(
    (messageId) => {
      const newLiked = new Set(likedMessages);
      const newDisliked = new Set(dislikedMessages);

      if (newLiked.has(messageId)) {
        newLiked.delete(messageId);
        showFeedback(messageId, "Like removed");
      } else {
        newLiked.add(messageId);
        newDisliked.delete(messageId); // Ensure not both liked/disliked
        showFeedback(messageId, "Liked");
      }
      setLikedMessages(newLiked);
      setDislikedMessages(newDisliked);
    },
    [likedMessages, dislikedMessages, showFeedback]
  );

  const handleDislike = useCallback(
    (messageId) => {
      const newLiked = new Set(likedMessages);
      const newDisliked = new Set(dislikedMessages);

      if (newDisliked.has(messageId)) {
        newDisliked.delete(messageId);
        showFeedback(messageId, "Dislike removed");
      } else {
        newDisliked.add(messageId);
        newLiked.delete(messageId); // Ensure not both liked/disliked
        showFeedback(messageId, "Disliked");
      }
      setLikedMessages(newLiked);
      setDislikedMessages(newDisliked);
    },
    [likedMessages, dislikedMessages, showFeedback]
  );

  const toggleReasoning = useCallback((messageId) => {
    setExpandedReasoning((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  }, []);

  const toggleFullscreen = useCallback(
    (messageId) => {
      setFullscreenReasoning(
        fullscreenReasoning === messageId ? null : messageId
      );
    },
    [fullscreenReasoning]
  );

  // --- Sub-Components for UI Elements ---

  // Re-usable TypewriterText component
  const TypewriterText = ({ text, speed = 40, onComplete }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      if (!text || text.length === 0) {
        setDisplayText("");
        setCurrentIndex(0);
        setShowCursor(false);
        if (onComplete) onComplete(true); // Signal immediate completion if no text
        return;
      }

      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        // Typing complete
        const cursorTimer = setTimeout(() => {
          setShowCursor(false);
          if (onComplete) onComplete(true); // Signal completion after cursor hides
        }, 500); // Cursor visible for 0.5s after typing
        return () => clearTimeout(cursorTimer);
      }
    }, [text, currentIndex, speed, onComplete]);

    // Effect to handle cursor blinking during active typing
    useEffect(() => {
      if (currentIndex < text.length) {
        setShowCursor(true); // Always show cursor when actively typing
      }
    }, [currentIndex, text.length]);

    return (
      <span>
        {displayText}
        {showCursor && (
          <span className="ml-1 animate-pulse text-blue-400">|</span>
        )}
      </span>
    );
  };

  const ThinkingDots = () => (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );

  const ReasoningCard = ({
    messageId,
    isGenerating,
    initialLines,
    currentTypingText,
    currentIndex,
    totalLines,
  }) => {
    // Only expand by default if it's the currently generating card
    const isCurrentlyExpanded =
      expandedReasoning[messageId] === undefined
        ? isGenerating
        : expandedReasoning[messageId];

    return (
      <div
        className={`mt-4 rounded-lg border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div
          className={`flex items-center justify-between p-4 cursor-pointer hover:${
            isDark ? "bg-gray-700" : "bg-gray-100"
          } transition-colors`}
          onClick={() => toggleReasoning(messageId)}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg"></span>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {isGenerating ? "Thinking" : "Reasoning"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling expansion when clicking fullscreen
                toggleFullscreen(messageId);
              }}
              className={`p-1 rounded hover:${
                isDark ? "bg-gray-600" : "bg-gray-200"
              } transition-colors`}
            >
              <Maximize2
                size={14}
                className={isDark ? "text-gray-400" : "text-gray-600"}
              />
            </button>
            <ChevronDown
              size={14}
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } transform transition-transform ${
                isCurrentlyExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isCurrentlyExpanded && (
          <div
            className={`p-4 pt-2 border-t ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`${
                isDark ? "text-gray-300" : "text-gray-700"
              } space-y-2 text-sm leading-relaxed`}
            >
              {/* Display completed reasoning lines */}
              {initialLines.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } opacity-90`}
                >
                  {line}
                </div>
              ))}

              {/* Display current typing line with cursor */}
              {isGenerating &&
                currentIndex < totalLines &&
                currentTypingText && (
                  <div
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } flex items-start`}
                  >
                    <TypewriterText
                      text={currentTypingText}
                      speed={40} // Same speed as the useEffect timeout in parent
                    />
                  </div>
                )}

              {/* Show completion message when all lines are done and not actively typing more reasoning */}
              {isGenerating && currentIndex >= totalLines && totalLines > 0 && (
                <div
                  className={`${
                    isDark ? "text-gray-500" : "text-gray-400"
                  } text-xs italic mt-2`}
                >
                  Reasoning complete. Generating response...
                </div>
              )}

              {/* Default static reasoning lines if `isGenerating` is false and no content provided */}
              {!isGenerating &&
                (!initialLines || initialLines.length === 0) && (
                  <>
                    <p>
                      • Analyzed the user's question and determined the best
                      response approach.
                    </p>
                    <p>
                      • Considered context, tone, and appropriate level of
                      detail for the response.
                    </p>
                    <p>
                      • Ensured the response is helpful, accurate, and
                      well-structured.
                    </p>
                    <p>
                      • Generated a comprehensive answer that addresses all
                      aspects of the query.
                    </p>
                  </>
                )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Helper to determine if the Thinking Dots should be active
  const isActivelyGenerating = (index) => {
    const isLastPair = index === messagePairs.length - 1;
    // Thinking dots are active if reasoning is in progress OR main response is typing OR general thinking state is on for the last message
    return (
      isLastPair &&
      (isGeneratingReasoning || isTypingMainResponse || isThinking)
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>

      <div className="flex-1 max-w-4xl mx-auto w-full py-6 space-y-8 pb-32">
        {messagePairs.map((pair, index) => (
          <div key={pair.userMessage.id} className="space-y-6">
            {/* User Message */}
            <div className="mb-6">
              <h2
                className={`text-xl font-normal ${
                  isDark ? "text-white" : "text-black"
                } mb-6`}
              >
                {pair.userMessage.text}
              </h2>
            </div>

            {/* AI Response Block */}
            <div>
              {/* Header with Avatar and Name in same line */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`relative flex-shrink-0 w-10 h-10 rounded-full ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  } flex items-center justify-center`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    B
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    BharatAi
                  </span>
                  <button
                    className={`p-1 rounded hover:${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    } transition-colors`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Thinking dots positioned below the header */}
              {isActivelyGenerating(index) && (
                <div className="ml-11 mb-4">
                  <ThinkingDots />
                </div>
              )}

              {/* Response Content */}
              <div className="ml-11">
                {/* Conditional Rendering of Response Stages */}
                {isActivelyGenerating(index) ? (
                  <div className="space-y-4">
                    {/* Stage 1: Reasoning is being generated (typed out line-by-line) */}
                    {(isGeneratingReasoning ||
                      currentReasoningIndex < reasoningLines.length ||
                      currentReasoningText.length > 0) && (
                      <ReasoningCard
                        messageId={`reasoning-${index}`}
                        isGenerating={true}
                        initialLines={displayedReasoningLines}
                        currentTypingText={currentReasoningText}
                        currentIndex={currentReasoningIndex}
                        totalLines={reasoningLines.length}
                      />
                    )}

                    {/* Stage 2: Reasoning is complete AND Main response is being generated/typed */}
                    {!isGeneratingReasoning &&
                      currentReasoningIndex >= reasoningLines.length &&
                      isTypingMainResponse && (
                        <>
                          {/* Display the completed reasoning card if reasoning was generated */}
                          {(displayedReasoningLines.length > 0 ||
                            reasoningLines.length > 0) && (
                            <ReasoningCard
                              messageId={`reasoning-complete-${index}`}
                              isGenerating={false} // Indicates reasoning is complete
                              initialLines={reasoningLines} // Pass the full reasoning lines for display
                              currentTypingText={""} // No active typing here
                              currentIndex={reasoningLines.length}
                              totalLines={reasoningLines.length}
                            />
                          )}

                          {/* Display the main AI response with typewriter effect */}
                          <div
                            className={`${
                              isDark ? "text-gray-300" : "text-gray-700"
                            } text-sm leading-relaxed animate-fadeIn`}
                          >
                            {pair.aiMessage ? (
                              <TypewriterText
                                text={pair.aiMessage.text}
                                onComplete={() =>
                                  setIsTypingMainResponse(false)
                                } // Signal when main response typing is done
                                speed={30} // Speed for main response typing
                              />
                            ) : (
                              // This case might occur if aiMessage is not yet added to 'messages'
                              // but isThinking is true. You might show a placeholder or just thinking dots.
                              <TypewriterText
                                text="I'm here to help you with your questions! This is a response being generated in real-time with proper animation effects."
                                onComplete={() =>
                                  setIsTypingMainResponse(false)
                                }
                                speed={30}
                              />
                            )}
                          </div>
                        </>
                      )}
                  </div>
                ) : pair.aiMessage ? (
                  // Display fully generated (completed) AI response and its reasoning card (if it had one)
                  <div className="space-y-4">
                    {/* Completed Reasoning Card */}
                    {reasoningLines.length > 0 && (
                      <ReasoningCard
                        messageId={pair.aiMessage.id}
                        isGenerating={false}
                        initialLines={reasoningLines}
                        currentTypingText={""}
                        currentIndex={reasoningLines.length}
                        totalLines={reasoningLines.length}
                      />
                    )}

                    {/* Fully Displayed AI Response */}
                    <div
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } text-sm leading-relaxed whitespace-pre-wrap animate-fadeIn`}
                    >
                      {pair.aiMessage.text}
                    </div>

                    {/* Action Buttons - Now using the separate component */}
                    <ActionButtons
                      messageId={pair.aiMessage.id}
                      messageText={pair.aiMessage.text}
                      isDark={isDark}
                      likedMessages={likedMessages}
                      dislikedMessages={dislikedMessages}
                      actionFeedback={actionFeedback}
                      onLike={handleLike}
                      onDislike={handleDislike}
                      onCopy={handleCopy}
                      onShare={handleShare}
                      // Add these new props:
                      currentChatId={currentChatId}
                      chatHistory={chatHistory}
                      onArchiveChat={onArchiveChat}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {/* Invisible div to scroll into view */}
        <div ref={scrollRef}></div>
      </div>

      {/* Fullscreen Reasoning Modal */}
      {fullscreenReasoning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`max-w-4xl w-full max-h-[90vh] rounded-lg ${
              isDark ? "bg-gray-800" : "bg-white"
            } overflow-hidden`}
          >
            <div
              className={`flex items-center justify-between p-4 border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg"></span>
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Reasoning
                </span>
              </div>
              <button
                onClick={() => setFullscreenReasoning(null)}
                className={`p-2 rounded hover:${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                } transition-colors`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } space-y-3 text-sm leading-relaxed`}
              >
                {/* Displaying relevant reasoning content in fullscreen modal */}
                {reasoningLines && reasoningLines.length > 0 ? (
                  reasoningLines.map((line, index) => <p key={index}>{line}</p>)
                ) : (
                  // Default static reasoning lines if no dynamic ones provided
                  <>
                    <p>
                      • Analyzed the user's question and determined the best
                      response approach.
                    </p>
                    <p>
                      • Considered context, tone, and appropriate level of
                      detail for the response.
                    </p>
                    <p>
                      • Ensured the response is helpful, accurate, and
                      well-structured.
                    </p>
                    <p>
                      • Generated a comprehensive answer that addresses all
                      aspects of the query.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatResponse;
