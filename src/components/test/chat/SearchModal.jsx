import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Edit,
  Trash2,
  ExternalLink,
  Check,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const SearchModal = ({
  isOpen,
  onClose,
  isDark = true,
  chatHistory = [],
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);
  const [categorizedResults, setCategorizedResults] = useState({
    "This Week": [],
    "Last Week": [],
    "This Month": [],
    Older: [],
  });
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const renameInputRef = useRef(null);

  useEffect(() => {
    const chatsToShow =
      searchQuery.trim() === ""
        ? chatHistory
        : chatHistory.filter(
            (chat) =>
              chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (chat.content &&
                chat.content.toLowerCase().includes(searchQuery.toLowerCase()))
          );

    setFilteredChats(chatsToShow);

    const today = new Date();
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - 7);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 14);
    const thisMonthStart = new Date(today);
    thisMonthStart.setMonth(today.getMonth() - 1);

    const categorized = {
      "This Week": [],
      "Last Week": [],
      "This Month": [],
      Older: [],
    };

    chatsToShow.forEach((chat) => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate >= thisWeekStart) {
        categorized["This Week"].push(chat);
      } else if (chatDate >= lastWeekStart) {
        categorized["Last Week"].push(chat);
      } else if (chatDate >= thisMonthStart) {
        categorized["This Month"].push(chat);
      } else {
        categorized["Older"].push(chat);
      }
    });

    setCategorizedResults(categorized);
  }, [searchQuery, chatHistory]);

  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const chatDate = new Date(timestamp);
    const diffInMs = now - chatDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1d ago";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return `${Math.floor(diffInDays / 30)}m ago`;
  };

  const handleChatClick = (chat) => {
    if (renamingId === chat.id || deleteConfirmId === chat.id) return;
    onSelectChat && onSelectChat(chat);
    onClose();
  };

  const handleRename = (chatId, e) => {
    e.stopPropagation();
    const chat = chatHistory.find((c) => c.id === chatId);
    setRenamingId(chatId);
    setRenameValue(chat?.title || "");
  };

  const handleRenameSubmit = (chatId) => {
    if (renameValue.trim()) {
      onRenameChat && onRenameChat(chatId, renameValue.trim());
    }
    setRenamingId(null);
    setRenameValue("");
  };

  const handleRenameCancel = () => {
    setRenamingId(null);
    setRenameValue("");
  };

  const handleDelete = (chatId, e) => {
    e.stopPropagation();
    setDeleteConfirmId(chatId);
  };

  const handleDeleteConfirm = (chatId) => {
    onDeleteChat && onDeleteChat(chatId);
    setDeleteConfirmId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const DeleteConfirmation = ({ chatId, chatTitle }) => (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        isDark ? "bg-black" : "bg-white"
      } bg-opacity-95 rounded-lg backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <AlertTriangle size={16} className="text-red-400" />
        <span className={`${isDark ? "text-white" : "text-black"} text-sm`}>
          Delete "{chatTitle}"?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDeleteConfirm(chatId)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={handleDeleteCancel}
            className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatItem = (chat) => (
    <div
      key={chat.id}
      className={`relative rounded-md p-2 cursor-pointer group transition-all duration-200 ${
        isDark
          ? "hover:bg-gray-800 bg-transparent"
          : "hover:bg-gray-200 bg-transparent"
      }`}
      onClick={() => handleChatClick(chat)}
    >
      {deleteConfirmId === chat.id && (
        <DeleteConfirmation chatId={chat.id} chatTitle={chat.title} />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 p-1.5 rounded">
            <MessageSquare
              size={14}
              className={isDark ? "text-gray-500" : "text-gray-700"}
            />
          </div>

          <div className="flex-1 min-w-0">
            {renamingId === chat.id ? (
              <div className="flex items-center gap-2">
                <input
                  ref={renameInputRef}
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameSubmit(chat.id);
                    } else if (e.key === "Escape") {
                      handleRenameCancel();
                    }
                  }}
                  className={`flex-1 text-sm font-medium px-2 py-1 rounded ${
                    isDark
                      ? "bg-gray-700 text-white border border-gray-600"
                      : "bg-white text-black border border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameSubmit(chat.id);
                  }}
                  className="p-1 rounded hover:bg-gray-600 text-green-400 transition-colors"
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameCancel();
                  }}
                  className="p-1 rounded hover:bg-gray-600 text-gray-400 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <h3
                className={`truncate text-sm font-medium ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {chat.title}
              </h3>
            )}
          </div>
        </div>

        {renamingId !== chat.id && deleteConfirmId !== chat.id && (
          <div className="flex items-center gap-1 ml-4 transition-opacity">
            <span
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-400"
              } mr-2`}
            >
              {getTimeAgo(chat.timestamp)}
            </span>
            <button
              onClick={(e) => handleRename(chat.id, e)}
              className={`p-1 rounded ${
                isDark
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-300 text-gray-600 hover:text-black"
              } transition-colors`}
              title="Edit"
            >
              <Edit size={12} />
            </button>
            <button
              onClick={(e) => handleDelete(chat.id, e)}
              className={`p-1 rounded ${
                isDark
                  ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                  : "hover:bg-gray-300 text-gray-600 hover:text-red-600"
              } transition-colors`}
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCategory = (categoryName, chats) =>
    chats.length > 0 && (
      <div key={categoryName} className="mb-6">
        <h2
          className={`text-xs font-medium mb-3 px-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {categoryName}
        </h2>
        <div className="space-y-1">{chats.map(renderChatItem)}</div>
      </div>
    );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-sm bg-transparent">
      <div
        className={`w-full max-w-3xl rounded-lg shadow-2xl border ${
          isDark ? "bg-[#1a1a1a] border-gray-900" : "bg-white border-gray-300"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 p-4 border-b ${
            isDark ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <Search
            size={16}
            className={isDark ? "text-gray-400" : "text-gray-600"}
          />
          <input
            type="text"
            placeholder="Search all..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 text-sm bg-transparent placeholder-gray-400 outline-none ${
              isDark ? "text-white" : "text-black"
            }`}
            autoFocus
          />
          <button
            onClick={onClose}
            className={`p-1 rounded ${
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-black"
            } transition-colors`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            {filteredChats.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare
                  size={32}
                  className={`mx-auto mb-3 ${
                    isDark ? "text-gray-600" : "text-gray-400"
                  }`}
                />
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {searchQuery.trim() === ""
                    ? "No chats found"
                    : `No results for "${searchQuery}"`}
                </p>
              </div>
            ) : (
              Object.entries(categorizedResults).map(([category, chats]) =>
                renderCategory(category, chats)
              )
            )}
          </div>
        </div>
        {/* Footer: Shortcut Hint */}
        <div
          className={`flex justify-start items-center gap-2 px-4 py-2 text-xs border-t ${
            isDark
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-600"
          }`}
        >
          <span className="hidden sm:inline">Shortcut:</span>
          <kbd
            className={`px-1.5 py-0.5 rounded border text-xs font-mono ${
              isDark
                ? "bg-gray-800 border-gray-600 text-gray-300"
                : "bg-gray-100 border-gray-400 text-gray-700"
            }`}
          >
            Ctrl
          </kbd>
          +
          <kbd
            className={`px-1.5 py-0.5 rounded border text-xs font-mono ${
              isDark
                ? "bg-gray-800 border-gray-600 text-gray-300"
                : "bg-gray-100 border-gray-400 text-gray-700"
            }`}
          >
            K
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
