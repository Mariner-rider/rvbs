import React, { useState, useEffect, useContext } from 'react';
import { X, MessageSquare, Trash2, Clock, FileText, Plus, Lock, Search, Menu } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import SearchModal from './SearchModal'; 
import bharatAi from "/src/assets/images/bharatai2.png";

const ChatHistorySidebar = ({ 
  isOpen, 
  onClose, 
  isDark, 
  onNewChat, 
  onSelectChat 
}) => {
  const [chatSessions, setChatSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      fetchChatHistory();
    }
  }, [isOpen, isLoggedIn]);

  const fetchChatHistory = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/rag-sessions/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch chat history');

      const data = await response.json();
      if (data.success) {
        setChatSessions(data.sessions || []);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChat = async (sessionId, e) => {
    e.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this chat?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://127.0.0.1:8000/rag-session/${sessionId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setChatSessions(prev => prev.filter(chat => chat.session_id !== sessionId));
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  // Transform chat sessions for SearchModal
  const transformChatsForSearch = () => {
    return chatSessions.map(chat => ({
      id: chat.session_id,
      title: chat.document_name || chat.file_name || 'Untitled Chat',
      content: chat.message || '',
      timestamp: chat.created_at
    }));
  };

  const handleSearchModalSelect = (selectedChat) => {
    // Find the original chat session from chatSessions
    const originalChat = chatSessions.find(
      chat => chat.session_id === selectedChat.id
    );
    
    if (originalChat) {
      onSelectChat(originalChat);
      onClose();
      setSearchModalOpen(false);
    }
  };

  const handleSearchModalDelete = (chatId) => {
    // Call your original delete function with a mock event
    handleDeleteChat(chatId, { stopPropagation: () => {} });
  };

  const handleSearchModalRename = (chatId, newTitle) => {
    // Rename functionality - you can implement this later if needed
    console.log(`Rename chat ${chatId} to ${newTitle}`);
    // For now, just update local state
    setChatSessions(prev => prev.map(chat => 
      chat.session_id === chatId 
        ? { ...chat, document_name: newTitle } 
        : chat
    ));
  };

  const groupChatsByDate = () => {
    const grouped = {
      today: [],
      yesterday: [],
      lastWeek: [],
      older: []
    };

    chatSessions.forEach(chat => {
      const date = new Date(chat.created_at);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        grouped.today.push(chat);
      } else if (diffInHours < 48) {
        grouped.yesterday.push(chat);
      } else if (diffInHours < 168) {
        grouped.lastWeek.push(chat);
      } else {
        grouped.older.push(chat);
      }
    });

    return grouped;
  };

  const groupedChats = groupChatsByDate();

  return (
    <>
      {/* Search Modal - This will show when search icon is clicked */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        isDark={isDark}
        chatHistory={transformChatsForSearch()}
        onSelectChat={handleSearchModalSelect}
        onDeleteChat={handleSearchModalDelete}
        onRenameChat={handleSearchModalRename}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
          <button
            onClick={onClose}
            className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
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
            onClick={() => setSearchModalOpen(true)}
            className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            title="Search"
          >
            <Search size={15} />
          </button>
        </div>

        {!isLoggedIn ? (
          // Not Logged In View
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6 text-center">
            <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Lock className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sign in to view history</h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Please sign in to access your chat history and save your conversations.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // Logged In View
          <>
            <div className="p-4">
              <button
                onClick={() => {
                  onNewChat();
                  onClose();
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
              >
                <Plus size={18} />
                <span className="font-medium">New Chat</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 h-[calc(100vh-140px)]">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              ) : chatSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">No chat history yet</p>
                  <p className="text-xs text-gray-400 mt-1">Start a new chat to begin</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {groupedChats.today.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">Today</h3>
                      <div className="space-y-2">
                        {groupedChats.today.map(chat => (
                          <div
                            key={chat.session_id}
                            className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            onClick={() => {
                              onSelectChat(chat);
                              onClose();
                            }}
                          >
                            <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                              <FileText size={16} className="text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {chat.document_name || chat.file_name || 'Untitled Chat'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs text-gray-500">
                                  {new Date(chat.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteChat(chat.session_id, e)}
                              className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedChats.yesterday.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">Yesterday</h3>
                      <div className="space-y-2">
                        {groupedChats.yesterday.map(chat => (
                          <div
                            key={chat.session_id}
                            className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            onClick={() => {
                              onSelectChat(chat);
                              onClose();
                            }}
                          >
                            <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                              <FileText size={16} className="text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {chat.document_name || chat.file_name || 'Untitled Chat'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs text-gray-500">
                                  {new Date(chat.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteChat(chat.session_id, e)}
                              className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedChats.lastWeek.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">Last 7 Days</h3>
                      <div className="space-y-2">
                        {groupedChats.lastWeek.map(chat => (
                          <div
                            key={chat.session_id}
                            className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            onClick={() => {
                              onSelectChat(chat);
                              onClose();
                            }}
                          >
                            <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                              <FileText size={16} className="text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {chat.document_name || chat.file_name || 'Untitled Chat'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs text-gray-500">
                                  {new Date(chat.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteChat(chat.session_id, e)}
                              className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedChats.older.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">Older</h3>
                      <div className="space-y-2">
                        {groupedChats.older.map(chat => (
                          <div
                            key={chat.session_id}
                            className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            onClick={() => {
                              onSelectChat(chat);
                              onClose();
                            }}
                          >
                            <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                              <FileText size={16} className="text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {chat.document_name || chat.file_name || 'Untitled Chat'}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs text-gray-500">
                                  {new Date(chat.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteChat(chat.session_id, e)}
                              className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatHistorySidebar;