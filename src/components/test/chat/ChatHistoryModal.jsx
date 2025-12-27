import React, { useState, useEffect } from "react";
import bharatAi from "/src/assets/images/bharatai2.png";
import {
  Menu,
  Plus,
  MoreVertical,
  Search,
  Facebook,
  MessageCircle,
  Link,
  X,
  Lock,
  Copy,
  Check,
  ExternalLink,
  Linkedin,
  Edit3,
  Archive,
  Mail, // For email sharing button
  Twitter, // For Twitter sharing button
  Send,
  MessageSquare // For Telegram sharing button
} from "lucide-react";


const ChatHistoryModal = ({
  isDark = true,
  onClose,
  chatHistory = [],
  archivedChats = [],
  onSelectChat,
  onNewChat,
  isOpen = false,
  onDeleteChat,
  onArchiveChat,
  onShareChat,
  onRenameChat,
  onOpenSearch,
  onOpenArchivedChats, // Add this new prop
}) => {
  const [categorizedChats, setCategorizedChats] = useState({
    Today: [],
    Yesterday: [],
    Previous: [],
  });

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showArchiveAlert, setShowArchiveAlert] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false); // Fixed: Added missing state
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newChatName, setNewChatName] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [localChatHistory, setLocalChatHistory] = useState(chatHistory);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Update local chat history when props change
  useEffect(() => {
    setLocalChatHistory(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    const chatsByCategory = {
      Today: [],
      Yesterday: [],
      Previous: [],
    };

    localChatHistory.forEach((chat) => {
      const chatDate = new Date(chat.timestamp);
      if (isSameDay(chatDate, today)) {
        chatsByCategory.Today.push(chat);
      } else if (isSameDay(chatDate, yesterday)) {
        chatsByCategory.Yesterday.push(chat);
      } else {
        chatsByCategory.Previous.push(chat);
      }
    });

    setCategorizedChats(chatsByCategory);
  }, [localChatHistory]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };

    if (openDropdownId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdownId]);

  const handleRenameChat = (chatId) => {
    const chat = localChatHistory.find((c) => c.id === chatId);
    setSelectedChatId(chatId);
    setNewChatName(chat?.title || "");
    setShowRenameModal(true);
    setOpenDropdownId(null);
  };

  const confirmRenameChat = () => {
    if (selectedChatId && newChatName.trim()) {
      // Update local state immediately for UI responsiveness
      setLocalChatHistory((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, title: newChatName.trim() }
            : chat
        )
      );

      // Call the parent rename function
      if (onRenameChat) {
        onRenameChat(selectedChatId, newChatName.trim());
      }

      showToastMessage("Chat renamed successfully!");
    }
    setShowRenameModal(false);
    setSelectedChatId(null);
    setNewChatName("");
  };

  const handleDeleteChat = (chatId) => {
    setSelectedChatId(chatId);
    setShowDeleteAlert(true);
    setOpenDropdownId(null);
  };

  const confirmDeleteChat = () => {
    if (onDeleteChat && selectedChatId) {
      onDeleteChat(selectedChatId);
      // Update local state
      setLocalChatHistory((prevChats) =>
        prevChats.filter((chat) => chat.id !== selectedChatId)
      );
      showToastMessage("Chat deleted successfully!");
    }
    setShowDeleteAlert(false);
    setSelectedChatId(null);
  };

  const handleArchiveChat = (chatId) => {
    setSelectedChatId(chatId);
    setShowArchiveAlert(true);
    setOpenDropdownId(null);
  };

  const confirmArchiveChat = () => {
    if (onArchiveChat && selectedChatId) {
      onArchiveChat(selectedChatId);
      // Update local state
      setLocalChatHistory((prevChats) =>
        prevChats.filter((chat) => chat.id !== selectedChatId)
      );
      showToastMessage("Chat archived successfully!");

      // Close modal and show archived chats
      setShowArchiveAlert(false);
      setSelectedChatId(null);
      onClose(); // Close the chat history modal

      if (onOpenArchivedChats) {
        onOpenArchivedChats();
      }
    }
  };

  const handleShareChat = (chatId) => {
    setSelectedChatId(chatId);
    setShowShareCard(true); // Fixed: Use showShareCard instead of showShareLink
    setOpenDropdownId(null);
  };

  const getShareUrl = () => {
    return `${window.location.origin}/chat/${selectedChatId}`;
  };

  const handleArchive = () => {
    console.log("Archiving chat:", selectedChatId);
    showToastMessage("Chat archived successfully!");
    setShowShareCard(false);
  };

  const handleSharePlatform = async (platform) => {
    const shareUrl = getShareUrl();
    const shareTitle = "Check out this chat conversation";

    switch (platform) {
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess(true);
          showToastMessage("Link copied to clipboard!");
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error("Failed to copy link:", err);
          showToastMessage("Failed to copy link");
        }
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening LinkedIn share...");
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${shareTitle} ${shareUrl}`
          )}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening WhatsApp share...");
        break;
      case "mail":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            shareTitle
          )}&body=${encodeURIComponent(
            `I wanted to share this chat conversation with you: ${shareUrl}`
          )}`,
          "_self"
        );
        showToastMessage("Opening email client...");
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening Facebook share...");
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareTitle)}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening Twitter share...");
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareTitle)}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening Telegram share...");
        break;
      case "reddit":
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent(shareTitle)}`,
          "_blank",
          "width=600,height=400"
        );
        showToastMessage("Opening Reddit share...");
        break;
    }
  };

  const renderChats = (chats) =>
    chats.map((chat) => (
      <div
        key={chat.id}
        className={`relative group px-3 py-2 mb-1 rounded-lg flex justify-between items-center transition-colors ${
          isDark
            ? "hover:bg-gray-700 text-gray-300 hover:text-white"
            : "hover:bg-gray-100 text-gray-700 hover:text-black"
        } cursor-pointer`}
      >
        <div
          className="flex-1 min-w-0"
          onClick={() => {
            onSelectChat && onSelectChat(chat);
            onClose();
          }}
        >
          <div className="text-sm truncate pr-2">{chat.title}</div>
        </div>

        {/* 3-dots menu - only show on hover */}
        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`p-1 rounded ${
              isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownId(openDropdownId === chat.id ? null : chat.id);
            }}
          >
            <MoreVertical size={16} />
          </button>

          {openDropdownId === chat.id && (
            <div
              className={`absolute right-0 mt-1 w-36 rounded-md shadow-lg z-50 border ${
                isDark
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-200"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`w-full text-left px-4 py-2 text-sm rounded-t-md transition-colors flex items-center gap-2 ${
                  isDark
                    ? "hover:bg-gray-700 hover:text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => handleRenameChat(chat.id)}
              >
                <Edit3 size={14} />
                Rename
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  isDark
                    ? "hover:bg-gray-700 hover:text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => handleDeleteChat(chat.id)}
              >
                <X size={14} />
                Delete
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  isDark
                    ? "hover:bg-gray-700 hover:text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => handleArchiveChat(chat.id)}
              >
                <MessageSquare size={14} />
                Archive
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm rounded-b-md transition-colors flex items-center gap-2 ${
                  isDark
                    ? "hover:bg-gray-700 hover:text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => handleShareChat(chat.id)}
              >
                <Link size={14} />
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    ));

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        onNewChat && onNewChat();
        onClose && onClose();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [onNewChat, onClose]);

  useEffect(() => {
    const handleSearchShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenSearch && onOpenSearch();
      }
    };

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, [onOpenSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-50">
      {/* Sidebar */}
      <div
        className={`relative h-full w-80 ${
          isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
        } shadow-xl flex flex-col border-r ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`p-2 rounded transition-colors ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            title="Close Sidebar"
          >
            <Menu size={20} />
          </button>
          <img
            src={bharatAi}
            alt="Bharat AI"
            className="h-8 sm:h-9 md:h-10 w-auto"
          />
          <button
            onClick={() => {
              onOpenSearch && onOpenSearch();
            }}
            className={`p-2 rounded transition-colors ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            title="Search"
          >
            <Search size={15} />
          </button>
        </div>

        <div className="p-4 group">
          <button
            onClick={() => {
              onNewChat && onNewChat();
              onClose();
            }}
            className={`w-full relative group px-3 py-2 mb-1 rounded-lg flex justify-between items-center transition-colors ${
              isDark
                ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                : "hover:bg-gray-100 text-gray-700 hover:text-black"
            } cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <Plus size={18} />
              <span className="text-sm">New chat</span>
            </div>
            <span
              className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Ctrl + Shift + O
            </span>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="px-3 mb-3">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Recent
            </h3>
          </div>
          {localChatHistory.length > 0 ? (
            <div className="space-y-1">{renderChats(localChatHistory)}</div>
          ) : (
            <div className="text-center py-8">
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No chat history found.
              </p>
              <p
                className={`text-xs mt-1 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Start a conversation to see your chat history here!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1" onClick={onClose} />

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowDeleteAlert(false)}
          />
          <div
            className={`relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${
              isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            }`}
          >
            {/* Close Icon */}
            <button
              onClick={() => setShowDeleteAlert(false)}
              className={`absolute top-3 right-3 p-1 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            <h3 className="text-lg font-medium mb-3">Delete Chat</h3>
            <p
              className={`text-sm mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteAlert(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteChat}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Alert */}
      {showArchiveAlert && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowArchiveAlert(false)}
          />
          <div
            className={`relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${
              isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            }`}
          >
            {/* Close Icon */}
            <button
              onClick={() => setShowArchiveAlert(false)}
              className={`absolute top-3 right-3 p-1 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            <h3 className="text-lg font-medium mb-3">Archive Chat</h3>
            <p
              className={`text-sm mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to archive this chat? You can find it later
              in
              <br />
              Settings → Archived Chats.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowArchiveAlert(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmArchiveChat}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowRenameModal(false)}
          />
          <div
            className={`relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${
              isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            }`}
          >
            {/* Close Icon */}
            <button
              onClick={() => setShowRenameModal(false)}
              className={`absolute top-3 right-3 p-1 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            <h3 className="text-lg font-medium mb-3">Rename Chat</h3>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className={`w-full p-3 rounded-lg border text-sm mb-6 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-600"
              } focus:outline-none`}
              placeholder="Enter new chat name..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  confirmRenameChat();
                } else if (e.key === "Escape") {
                  setShowRenameModal(false);
                }
              }}
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRenameModal(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmRenameChat}
                disabled={!newChatName.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !newChatName.trim()
                    ? "bg-gray-500 cursor-not-allowed"
                    : isDark
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md bg-black/30 flex items-center justify-center p-4"
          style={{ zIndex: 999999 }}
        >
          <div
            className={`w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-6 shadow-xl ${
              isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-semibold">
                Share Message
              </h2>
              <button
                onClick={() => setShowShareCard(false)}
                className={`p-1 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <button
              onClick={handleArchive}
              className={`w-full flex items-center gap-2 px-3 py-2 mb-4 rounded-lg border text-sm sm:text-base ${
                isDark
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Archive size={14} className="sm:w-4 sm:h-4" />
              Archive Message
            </button>

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

            <div className="flex justify-center gap-2 sm:gap-3">
              <button
                onClick={() => handleSharePlatform("linkedin")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on LinkedIn"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("whatsapp")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on WhatsApp"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("mail")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share via Email"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("facebook")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on Facebook"
              >
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleSharePlatform("twitter")}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Share on Twitter"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </button>
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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-[70]">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            <Check size={16} className="text-green-500" />
            <span className="text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatHistoryModal;
