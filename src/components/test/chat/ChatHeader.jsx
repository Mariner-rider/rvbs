import React, { useState, useContext } from "react";
import {
  Menu,
  User,
  Share,
  Zap,
  Facebook,
  MessageCircle,
  Copy,
  Check,
  X as CloseIcon,
  ExternalLink,
  Linkedin,
  Lock,
  Archive,
  Mail,
  Twitter,
  Send,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import bharatAi from "/src/assets/images/bharatai2.png";
import { AuthContext } from "../../../context/AuthContext";
import { SignInPopup } from "../Header";
const ChatHeader = ({
  isDark,
  onHistoryClick,
  onProfileClick,
  selectedChatId,
  chatHistory = [],
  onShareChat,
  onShareModalOpen,
  onShareModalClose,
  showShareModal,
  onArchiveChat, // New prop for archiving
  isECognitiveMode = false,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  const handleShareClick = () => {
    onShareModalOpen();
  };


  const { isLoggedIn } = useContext(AuthContext);
  const [showSignInPopup, setShowSignInPopup] = useState(false);


  const handleSharePlatform = (platform) => {
    if (!selectedChatId) return;

    const chat = chatHistory.find((c) => c.id === selectedChatId);
    if (!chat) return;

    const shareText = `Check out this chat: ${chat.title}`;
    const shareUrl = `${window.location.origin}/chat/${selectedChatId}`;

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
            "Check out this chat"
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
  };

  const handleArchive = () => {
    if (!selectedChatId) return;

    const chat = chatHistory.find((c) => c.id === selectedChatId);
    if (!chat) return;

    // Create archived chat object with timestamp
    const archivedChat = {
      ...chat,
      archivedAt: new Date().toISOString(),
      isArchived: true,
    };

    // Call the archive function passed from parent
    if (onArchiveChat) {
      onArchiveChat(archivedChat);
    }

    console.log("Archived chat:", selectedChatId);
    onShareModalClose();
  };

  const getShareUrl = () => {
    if (!selectedChatId) return "";
    return `${window.location.origin}/chat/${selectedChatId}`;
  };

  const handleSignInClick = (e) => {
    if (e) e.preventDefault();
    setShowSignInPopup(true);
    // setSidebarOpen(false);
  };



  return (
    <>
      <header
        className={`flex justify-between items-center p-2 sm:p-3 md:p-4 w-full  ${isDark ? " text-white" : " text-black"
          }`}
      >
        {/* Left Section: Logo & Menu */}
        <div className="flex items-center gap-3">
          {!isECognitiveMode && (
            <button
              className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              onClick={onHistoryClick}
            >
              <Menu size={20} />
            </button>
          )}
          <img
            src={bharatAi}
            alt="Bharat AI"
            className={`h-10 w-auto ${isECognitiveMode ? "pl-8" : ""}`} 
          />
        </div>

        {/* Right Section: Buttons */}
        <div className="flex items-center gap-2">
          {selectedChatId && (
            <div className="relative">
              <button
                className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${isDark
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={handleShareClick}
              >
                <Share size={16} />
                Share
              </button>

              {/* Instead of modal → dropdown inside the header */}
              {showShareModal && (
                <div
                  className={`absolute right-0 top-full mt-2 w-80 p-4 rounded-lg shadow-lg z-50 ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                    }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-sm">Share Chat</h2>
                    <button onClick={onShareModalClose}>
                      <CloseIcon size={18} />
                    </button>
                  </div>

                  {/* Archive Button */}
                  <button
                    onClick={handleArchive}
                    className={`w-full flex items-center gap-2 px-3 py-2 mb-3 rounded-lg border ${isDark
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <Archive size={16} /> Archive Chat
                  </button>

                  {/* Copy Link */}
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg mb-3 ${isDark ? "bg-gray-700" : "bg-gray-100"
                      }`}
                  >
                    <span className="flex-1 text-xs truncate">
                      {getShareUrl()}
                    </span>
                    <button
                      onClick={() => handleSharePlatform("copy")}
                      className={`p-1 rounded ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                        }`}
                    >
                      {copySuccess ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  <p className="text-xs mb-3 opacity-70">
                    Anyone with this link can view this page.
                  </p>

                  {/* Social Buttons in Horizontal Layout */}
                  <div className="flex justify-between">
                    {[
                      { name: "linkedin", icon: Linkedin },
                      { name: "whatsapp", icon: MessageCircle },
                      { name: "mail", icon: Mail },
                      { name: "facebook", icon: Facebook },
                      { name: "twitter", icon: Twitter },
                      { name: "telegram", icon: Send },
                    ].map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        onClick={() => handleSharePlatform(name)}
                        className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        title={`Share on ${name}`}
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upgrade Button */}
          {/* <button
            onClick={() => navigate("/test/pricing")}
            className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${isDark
              ? "border-gray-600 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            <Zap size={16} />
            Upgrade
          </button> */}

          {/* Profile Button */}
          {/* <button
            className={`p-2 rounded-lg ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            onClick={onProfileClick}
          >
            <User size={20} />
          </button> */}

          {isLoggedIn ? (

            <button
              className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              onClick={onProfileClick}
            >
              <User size={20} />
            </button>
          ) : (

            <button
              onClick={handleSignInClick}
              className={`px-3 py-1.5 border rounded-lg text-sm ${isDark
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              Sign In
            </button>
          )}


        </div>
      </header>

      {showShareModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-[9999]"
            onClick={onShareModalClose}
          ></div>

          <div
            className={`relative z-[10000] w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
              }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-semibold">Share Link</h2>
              <button
                onClick={onShareModalClose}
                className={`p-1 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
              >
                <CloseIcon size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <button
              onClick={handleArchive}
              className={`w-full flex items-center gap-2 px-3 py-2 mb-4 rounded-lg border text-sm sm:text-base ${isDark
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <Archive size={14} className="sm:w-4 sm:h-4" />
              Archive Chat
            </button>

            <div
              className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg mb-4 ${isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
            >
              <span className="flex-1 text-xs sm:text-sm font-mono truncate">
                {getShareUrl()}
              </span>
              <button
                onClick={() => handleSharePlatform("copy")}
                className={`p-1 rounded ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
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
              className={`text-xs sm:text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"
                }`}
            >
              Anyone with this link can view this page.
            </p>

            <div className="flex justify-center gap-2 sm:gap-3">
              <button
                onClick={() => handleSharePlatform("linkedin")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share on LinkedIn"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("whatsapp")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share on WhatsApp"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("mail")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share via Email"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("facebook")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share on Facebook"
              >
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("twitter")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share on Twitter"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("telegram")}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                title="Share on Telegram"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

      )}
      {showSignInPopup && (
        <SignInPopup
          showPopup={showSignInPopup}
          setShowPopup={setShowSignInPopup}
        />
      )}

    </>
  );
};

export default ChatHeader;
