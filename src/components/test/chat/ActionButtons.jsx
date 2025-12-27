import React, { useState } from "react";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Share2, 
  Facebook,
  MessageCircle,
  Check,
  X as CloseIcon,
  ExternalLink,
  Linkedin,
  Archive,
  Mail,
  Twitter,
  Send,
  MessageSquare
} from "lucide-react";

const ActionButtons = ({
  messageId,
  messageText,
  isDark,
  likedMessages,
  dislikedMessages,
  actionFeedback,
  onLike,
  onDislike,
  onCopy,
  onShare,
  // New props for archive functionality:
  currentChatId,
  chatHistory,
  onArchiveChat
}) => {
  const [showShareCard, setShowShareCard] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShareClick = () => {
    setShowShareCard(true);
  };

  const handleSharePlatform = (platform) => {
    const shareText = `Check out this message: ${messageText.substring(0, 100)}${messageText.length > 100 ? '...' : ''}`;
    const shareUrl = `${window.location.origin}/message/${messageId}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}&quote=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${shareText} ${shareUrl}`
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "reddit":
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "mail":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            "Check out this message"
          )}&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
          "_self"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
    }

    // Call the original onShare if provided
    if (onShare) {
      onShare(messageText, messageId);
    }
  };

  const handleArchive = () => {
    if (currentChatId && chatHistory && onArchiveChat) {
      // Find the current chat
      const currentChat = chatHistory.find(chat => chat.id === currentChatId);
      if (currentChat) {
        // Create archived chat object
        const archivedChat = {
          ...currentChat,
          archivedAt: new Date().toISOString(),
        };
        
        // Call the archive function
        onArchiveChat(archivedChat);
      }
    }
    setShowShareCard(false);
  };

  const getShareUrl = () => {
    return `${window.location.origin}/message/${messageId}`;
  };

  return (
    <>
      <div className="flex items-center space-x-2 mt-4">
        {/* Like */}
        <div className="relative">
          <button
            onClick={() => onLike(messageId)}
            className={`p-2 rounded-full hover:${
              isDark ? "bg-gray-700" : "bg-gray-200"
            } transition-colors`}
          >
            <ThumbsUp
              className={`w-4 h-4 ${
                likedMessages.has(messageId)
                  ? "text-green-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            />
          </button>
          {actionFeedback[messageId] === "Liked" && (
            <div className="absolute -bottom-4 left-1 text-xs text-green-500 animate-fadeIn">
              Liked
            </div>
          )}
          {actionFeedback[messageId] === "Like removed" && (
            <div className="absolute -bottom-7 left-1  text-xs text-gray-400 animate-fadeIn">
              Like removed
            </div>
          )}
        </div>

        {/* Dislike */}
        <div className="relative">
          <button
            onClick={() => onDislike(messageId)}
            className={`p-2 rounded-full hover:${
              isDark ? "bg-gray-700" : "bg-gray-200"
            } transition-colors`}
          >
            <ThumbsDown
              className={`w-4 h-4 ${
                dislikedMessages.has(messageId)
                  ? "text-red-500"
                  : isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            />
          </button>
          {actionFeedback[messageId] === "Disliked" && (
            <div className="absolute -bottom-4 left-[0]  text-xs text-red-500 animate-fadeIn">
              Disliked
            </div>
          )}
          {actionFeedback[messageId] === "Dislike removed" && (
            <div className="absolute -bottom-7 left-0 text-xs text-gray-400 animate-fadeIn">
              Dislike removed
            </div>
          )}
        </div>

        {/* Copy */}
        <div className="relative">
          <button
            onClick={() => onCopy(messageText, messageId)}
            className={`p-2 rounded-full hover:${
              isDark ? "bg-gray-700" : "bg-gray-200"
            } transition-colors`}
          >
            <Copy
              className={`w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            />
          </button>
          {actionFeedback[messageId] === "Copied" && (
            <div className="absolute -bottom-4 left-0  text-xs text-blue-500 animate-fadeIn">
              Copied
            </div>
          )}
        </div>

        {/* Share */}
        <div className="relative">
          <button
            onClick={handleShareClick}
            className={`p-2 rounded-full hover:${
              isDark ? "bg-gray-700" : "bg-gray-200"
            } transition-colors`}
          >
            <Share2
              className={`w-4 h-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            />
          </button>
          {actionFeedback[messageId] === "Shared" && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-purple-500 animate-fadeIn">
              Shared
            </div>
          )}
        </div>
      </div>

      {showShareCard && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40"
            onClick={() => setShowShareCard(false)}
          ></div>

          {/* Share Card */}
          <div
            className={`relative z-[10000] w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${
              isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-semibold">Share Message</h2>
              <button
                onClick={() => setShowShareCard(false)}
                className={`p-1 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <CloseIcon size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Archive Button - Only show if chat archiving is available */}
            {currentChatId && onArchiveChat && (
              <button
                onClick={handleArchive}
                className={`w-full flex items-center gap-2 px-3 py-2 mb-4 rounded-lg border text-sm sm:text-base ${
                  isDark
                    ? "border-gray-600 hover:bg-gray-700"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                <MessageSquare size={14} className="sm:w-4 sm:h-4" />
                Archive Chat
              </button>
            )}

            {/* Share URL */}
            <div
              className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg mb-4 ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <span className="flex-1 text-xs sm:text-sm font-mono truncate">
                {getShareUrl()}
              </span>
              <button
                onClick={() => handleSharePlatform("copy")}
                className={`p-1 rounded ${
                  isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                }`}
              >
                {copySuccess ? (
                  <Check size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Copy size={14} className="sm:w-4 sm:h-4" />
                )}
              </button>
            </div>

            <p
              className={`text-xs sm:text-sm mb-4 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Anyone with this link can view this message.
            </p>

            {/* Social Buttons */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {/* LinkedIn */}
              <button
                onClick={() => handleSharePlatform("linkedin")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on LinkedIn"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleSharePlatform("whatsapp")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on WhatsApp"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Email */}
              <button
                onClick={() => handleSharePlatform("mail")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share via Email"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSharePlatform("facebook")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on Facebook"
              >
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleSharePlatform("twitter")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on Twitter"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleSharePlatform("telegram")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on Telegram"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;