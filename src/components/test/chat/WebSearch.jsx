import React, { useState, useRef } from 'react';
import { Search, Globe, Sparkles, Mic, MessageSquare, ArrowLeft } from 'lucide-react';
import ChatHeader from './ChatHeader';
import ProfileMenu from './ProfileMenu';
import Settings from './Settings.jsx';
import ChatHistoryModal from './ChatHistoryModal';
import SearchModal from './SearchModal';

const WebSearch = ({
  isDark = false,
  onSearch = () => { },
  onBackToChat = () => { },
  // Header and sidebar props
  showProfileMenu,
  setShowProfileMenu,
  theme,
  handleThemeChange,
  user,
  isAuthenticated,
  archivedChats,
  handleRestoreChat,
  handleDeleteArchivedChat,
  handleSelectArchivedChat,
  showSettings,
  setShowSettings,
  chatHistory,
  currentChatId,
  handleShareChat,
  handleShareModalOpen,
  handleShareModalClose,
  showShareModal,
  handleArchiveChatFromShare,
  onHistoryClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('Traditional Search');
  const [isListening, setIsListening] = useState(false);
  const [showHistoryCard, setShowHistoryCard] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const quickSearchSuggestions = [
    'Weather today',
    'News India',
    'Train booking',
    'Stock market'
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery, selectedMode);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search implementation would go here
  };

  const handleQuickSearch = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion, selectedMode);
  };

  const handleSelectChat = (chat) => {
    // Handle chat selection logic here if needed
    setShowHistoryCard(false);
  };

  const handleDeleteChat = (chatId) => {
    // Handle chat deletion logic here if needed
    console.log("Deleted chat:", chatId);
  };

  const handleArchiveChat = (chatId) => {
    // Handle chat archiving logic here if needed
    console.log("Archived chat:", chatId);
  };

  const handleRenameChat = (chatId, newTitle) => {
    // Handle chat renaming logic here if needed
    console.log("Rename chat:", chatId, newTitle);
  };

  const startNewChat = () => {
    // Handle new chat creation
    setShowHistoryCard(false);
  };

  const handleOpenArchivedChats = () => {
    setShowSettings(true);
  };


  
const startRecording = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser. Try using Chrome.");
    return;
  }

  // Create a new recognition instance every time
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = true; 
  recognition.continuous = true;     

  recognition.onstart = () => {
    console.log(" Voice recognition started...");
    setIsRecording(true);
  };

  recognition.onresult = (event) => {
    let liveTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      liveTranscript += event.results[i][0].transcript;
    }
    setSearchQuery(liveTranscript.trim());
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsRecording(false);
  };

  recognition.onend = () => {
    console.log(" Recognition stopped.");
    setIsRecording(false);
  };

  recognitionRef.current = recognition;
  recognition.start();
};

const stopRecording = () => {
  if (recognitionRef.current) {
    recognitionRef.current.stop();
    recognitionRef.current = null;
  }
  setIsRecording(false);
};



  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark
      ? "bg-black text-white"
      : "text-black bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]"
      }`}>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <ChatHeader
          isDark={isDark}
          onHistoryClick={() => setShowHistoryCard(true)}
          onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
          selectedChatId={currentChatId}
          chatHistory={chatHistory}
          onShareChat={handleShareChat}
          onShareModalOpen={handleShareModalOpen}
          onShareModalClose={handleShareModalClose}
          showShareModal={showShareModal}
          onArchiveChat={handleArchiveChatFromShare}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-8 pt-20 min-h-screen">
        {/* Back to Chat Button */}
        {/* <div className="w-full max-w-5xl mb-2">
          <button
            onClick={onBackToChat}
            className={`flex items-center space-x-2 px-2 py-1 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                : 'bg-white hover:bg-gray-50 text-gray-900 shadow-sm border border-gray-200'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Back to Chat</span>
          </button>
        </div> */}

        {/* Main Content Container */}
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className={`text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent ${isDark ? 'opacity-90' : ''
              }`}>
              BharatAi
            </h1>
            <p className={`text-xl mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
              AI-Enhanced Search Engine for India
            </p>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
              Get intelligent answers and comprehensive web results
            </p>
          </div>

          {/* Search Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className={`flex items-center rounded-full p-1 shadow-lg ${isDark
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white/80 backdrop-blur-sm border border-gray-200'
              }`}>
              <button
                onClick={() => setSelectedMode('Traditional Search')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${selectedMode === 'Traditional Search'
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Globe size={18} />
                <span className="font-medium">Web Search</span>
              </button>
              <button
                onClick={onBackToChat}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${selectedMode === 'AI Mode'
                  ? 'bg-purple-500 text-white shadow-md'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Sparkles size={18} />
                <span className="font-medium">AI Mode</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className={`relative flex items-center rounded-full shadow-xl border-2 ${isDark
              ? 'bg-gray-800 border-gray-600 focus-within:border-blue-400'
              : 'bg-white/90 backdrop-blur-sm border-gray-200 focus-within:border-blue-400'
              } transition-colors duration-200`}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search the web..."
                className={`flex-1 px-6 py-4 text-lg rounded-full bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
              />

              {/* Voice Search Button */}

              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2 mx-2 rounded-full ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                <Mic
                  size={18}
                  className={
                    isRecording
                      ? "text-red-500 animate-pulse"
                      : isDark
                        ? "text-white"
                        : "text-black"
                  }
                />
              </button>




              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className={`p-3 mr-2 rounded-full transition-all duration-200 ${searchQuery.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                  : isDark
                    ? 'bg-gray-700 text-gray-500'
                    : 'bg-gray-200 text-gray-400'
                  }`}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickSearchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(suggestion)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* AI-Powered Answers */}
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${isDark
              ? 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm'
              : 'bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl'
              }`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4 mx-auto">
                <MessageSquare size={24} className="text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                AI-Powered Answers
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Get intelligent, contextual responses powered by advanced AI technology.
              </p>
            </div>

            {/* India-Focused */}
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${isDark
              ? 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm'
              : 'bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl'
              }`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-4 mx-auto">
                <div className={`text-xl font-bold text-white`}>
                  🇮🇳
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                India-Focused
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Tailored for Indian users with local content and regional insights.
              </p>
            </div>

            {/* Voice Search */}
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${isDark
              ? 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm'
              : 'bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl'
              }`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mb-4 mx-auto">
                <Mic size={24} className="text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Voice Search
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Search hands-free with advanced voice recognition technology.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-12 px-4">
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              BharatAi may not always be accurate. Always verify crucial details.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Menu and Settings */}
      {showProfileMenu && (
        <ProfileMenu
          isDark={isDark}
          theme={theme}
          onThemeChange={handleThemeChange}
          onClose={() => setShowProfileMenu(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          archivedChats={archivedChats}
          onRestoreChat={handleRestoreChat}
          onDeleteArchivedChat={handleDeleteArchivedChat}
          onSelectArchivedChat={handleSelectArchivedChat}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {showSettings && (
        <Settings
          isDark={isDark}
          onClose={() => setShowSettings(false)}
          user={user}
          archivedChats={archivedChats}
          onSelectArchivedChat={handleSelectArchivedChat}
          onRestoreChat={handleRestoreChat}
          onDeleteArchivedChat={handleDeleteArchivedChat}
        />
      )}

      {/* Chat History Modal */}
      {showHistoryCard && (
        <>
          <ChatHistoryModal
            isDark={isDark}
            isOpen={showHistoryCard}
            onClose={() => setShowHistoryCard(false)}
            chatHistory={chatHistory}
            onSelectChat={handleSelectChat}
            onNewChat={startNewChat}
            onDeleteChat={handleDeleteChat}
            onShareChat={handleShareChat}
            onArchiveChat={handleArchiveChat}
            onRenameChat={handleRenameChat}
            selectedChatId={currentChatId}
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenArchivedChats={handleOpenArchivedChats}
          />

          <SearchModal
            isOpen={showSearchModal}
            onClose={() => setShowSearchModal(false)}
            isDark={isDark}
            chatHistory={chatHistory}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            onRenameChat={handleRenameChat}
          />
        </>
      )}
    </div>
  );
};

export default WebSearch;