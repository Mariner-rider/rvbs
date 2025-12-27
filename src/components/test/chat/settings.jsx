import React, { useState, useEffect } from "react";
import { X, User, Crown, Archive, Search, Check, Trash2, RotateCcw, MessageSquare } from "lucide-react";

const Settings = ({ 
  isDark, 
  onClose, 
  user, 
  archivedChats = [], 
  onSelectArchivedChat,
  onRestoreChat,
  onDeleteArchivedChat 
}) => {
  const [activeTab, setActiveTab] = useState("account");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArchivedChats, setFilteredArchivedChats] = useState(archivedChats);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = archivedChats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArchivedChats(filtered);
    } else {
      setFilteredArchivedChats(archivedChats);
    }
  }, [archivedChats, searchTerm]);

  const MenuItem = ({ icon: Icon, text, isActive, onClick, badge }) => (
    <button
      className={`w-full text-left px-3 py-3 transition-colors rounded-lg mb-2 flex items-center justify-between text-base ${
        isActive
          ? isDark
            ? "bg-[#2c2c2c] text-white"
            : "bg-gray-100 text-black"
          : isDark
          ? "hover:bg-[#2c2c2c] text-gray-300"
          : "hover:bg-gray-100 text-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <Icon size={18} className={isDark ? "text-gray-400" : "text-gray-600"} />
        <span>{text}</span>
      </div>
      {badge && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );

  const handleRestoreChat = (chatId) => {
    if (onRestoreChat) {
      onRestoreChat(chatId);
      showToastMessage("Chat restored successfully!");
    }
  };

  const handleDeleteArchivedChat = (chatId) => {
    setSelectedChatId(chatId);
    setShowDeleteAlert(true);
  };

  const confirmDeleteArchivedChat = () => {
    if (onDeleteArchivedChat && selectedChatId) {
      onDeleteArchivedChat(selectedChatId);
      showToastMessage("Archived chat deleted permanently!");
    }
    setShowDeleteAlert(false);
    setSelectedChatId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
    setSelectedChatId(null);
  };

  const handleChatClick = (chat) => {
    if (onSelectArchivedChat) {
      onSelectArchivedChat(chat);
      onClose();
    }
  };

  const AccountSection = ({ isDark, user }) => (
  <div className="flex-1 p-6">
    <div className="flex flex-col items-center mb-6">
      <div className="bg-blue-600 rounded-full w-36 h-36 flex items-center justify-center mb-6">
        <span className="text-white font-medium text-7xl">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
        </span>
      </div>
    </div>

    <div className="space-y-4 mt-4">
      <div>
        <label className={`block text-xs font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Full Name
        </label>
        <div className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>
          {user?.name || 'Guest User'}
        </div>
      </div>

      <div>
        <label className={`block text-xs font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Email Address
        </label>
        <div className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>
          {user?.email || 'guest@email.com'}
        </div>
      </div>
    </div>

    <div className={`text-sm mt-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
      Profile information is managed through your authentication provider. Contact support to update your details.
    </div>
  </div>
);
  const SubscriptionSection = () => (
    <div className="flex-1 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className={`p-4 rounded-full mb-3 ${isDark ? "bg-[#2c2c2c]" : "bg-gray-100"}`}>
          <Crown size={28} className={isDark ? "text-gray-400" : "text-gray-600"} />
        </div>
        <h2 className={`text-lg font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>
          No Active Subscription
        </h2>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Upgrade to Pro for unlimited access
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors text-sm ${
            isDark
              ? "bg-white text-black hover:bg-gray-100"
              : "bg-black text-white hover:bg-gray-800"
          } flex items-center justify-center space-x-2`}
          onClick={() => showToastMessage("Redirecting to upgrade page...")}
        >
          <Crown size={16} />
          <span>Upgrade to Pro</span>
        </button>

        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors border text-sm ${
            isDark
              ? "border-gray-600 text-white hover:bg-[#2c2c2c]"
              : "border-gray-300 text-black hover:bg-gray-50"
          }`}
          onClick={() => showToastMessage("Showing plan comparison...")}
        >
          Compare Plans
        </button>
      </div>

      <div>
        <h3 className={`text-base font-medium mb-3 ${isDark ? "text-white" : "text-black"}`}>
          Billing History
        </h3>
        <div className={`p-6 rounded-lg border text-center ${
          isDark
            ? "bg-[#2c2c2c] border-gray-600 text-gray-400"
            : "bg-gray-50 border-gray-300 text-gray-600"
        }`}>
          <p className="text-sm">No billing history yet</p>
        </div>
      </div>
    </div>
  );

  const MemoriesSection = () => (
    <div className="flex-1 p-6">
      <div className="mb-4">
        <div className="relative">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <input
            type="text"
            placeholder="Search memories..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
              isDark
                ? "bg-[#2c2c2c] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          0 memories stored
        </p>
      </div>

      <div className={`flex flex-col items-center justify-center py-12 ${
        isDark ? "text-gray-400" : "text-gray-600"
      }`}>
        <div className={`p-4 rounded-full mb-3 ${isDark ? "bg-[#2c2c2c]" : "bg-gray-100"}`}>
          <Archive size={28} />
        </div>
        <p className="text-base font-medium">No memories found</p>
      </div>
    </div>
  );

 const ArchivedChatsSection = () => (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>
          Archived Chats
        </h2>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {archivedChats.length} archived conversations
        </p>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search all..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl border-0 text-sm ${
              isDark
                ? "bg-[#2c2c2c] text-white placeholder-gray-500 hover:bg-[#484a4d]"
                : "bg-gray-100 text-black placeholder-gray-500 hover:bg-gray-200"
            } focus:outline-none`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? "text-gray-500 hover:text-gray-400" : "text-gray-500 hover:text-gray-600"
              }`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredArchivedChats.length > 0 ? (
        <div className="space-y-2">
          {filteredArchivedChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded-lg group transition-colors ${
                isDark
                  ? "bg-[#2c2c2c] hover:bg-[#2c2c2c] text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }focus:outline-none`}
            >
              <div className="flex justify-between items-start">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => handleChatClick(chat)}
                >
                  <h3 className={`text-sm font-medium truncate ${isDark ? "text-white" : "text-black"}`}>
                    {chat.title}
                  </h3>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Archived on {new Date(chat.archivedAt || chat.timestamp).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestoreChat(chat.id);
                    }}
                    className={`p-1 rounded transition-colors ${
                      isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                    title="Unarchive chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteArchivedChat(chat.id);
                    }}
                    className={`p-1 rounded transition-colors ${
                      isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                    title="Delete permanently"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center py-12 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          <div className={`p-4 rounded-full mb-3 ${isDark ? "bg-[#2c2c2c]" : "bg-gray-100"}`}>
            <MessageSquare size={28} />
          </div>
          <p className="text-base font-medium">
            {searchTerm.trim() ? "No matching archived chats" : "No archived chats"}
          </p>
          <p className="text-sm mt-1">
            {searchTerm.trim() ? "Try a different search term" : "Archived conversations will appear here"}
          </p>
        </div>
      )}
    </div>
  );

 const renderContent = () => {
  switch (activeTab) {
    case "account":
      return <AccountSection isDark={isDark} user={user} />;
    case "subscription":
      return <SubscriptionSection />;
    case "memories":
      return <MemoriesSection />;
    case "archived":
      return <ArchivedChatsSection />;
    default:
      return <AccountSection isDark={isDark} user={user} />;
  }
};
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur - Same structure as ChatHeader */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/40 z-[9999]"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative z-[10000] w-full max-w-4xl h-[75vh] rounded-2xl flex overflow-hidden ${
          isDark
            ? "bg-[#1a1a1a] shadow-xl"
            : "bg-white border border-gray-200 shadow-2xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
          <h1 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>
            Settings
          </h1>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? "hover:bg-[#2c2c2c] text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar */}
        <div className={`w-60 pt-16 p-4 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-50"} flex-shrink-0`}>
          <div className="space-y-2">
            <MenuItem
              icon={User}
              text="Account"
              isActive={activeTab === "account"}
              onClick={() => setActiveTab("account")}
            />
            <MenuItem
              icon={Crown}
              text="Subscription"
              isActive={activeTab === "subscription"}
              onClick={() => setActiveTab("subscription")}
            />
            <MenuItem
              icon={Archive}
              text="Memories"
              isActive={activeTab === "memories"}
              onClick={() => setActiveTab("memories")}
            />
            <MenuItem
              icon={MessageSquare}
              text="Archived Chats"
              isActive={activeTab === "archived"}
              onClick={() => setActiveTab("archived")}
              badge={archivedChats.length > 0 ? archivedChats.length : null}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-16 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40"
            onClick={handleCancelDelete}
          />
          <div
            className={`relative p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${
              isDark ? "bg-[#1c1c1c] text-white" : "bg-white text-black"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium mb-3">Delete Archived Chat</h3>
            <p
              className={`text-sm mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to permanently delete this archived chat? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteArchivedChat}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-[70]">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            isDark ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-black border border-gray-200"
          }`}>
            <Check size={16} className="text-green-500" />
            <span className="text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;