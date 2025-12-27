import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { MessageCircle, Camera, Sparkles, Globe, FileText, SquarePen, ChevronDown, Maximize2, Zap } from "lucide-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js";

import ChatHeader from "./ChatHeader";
import ChatHistoryModal from "./ChatHistoryModal";
import ChatInput from "./ChatInput";
import ProfileMenu from "./ProfileMenu";
import SearchModal from "./SearchModal";
import Settings from "./Settings";
import AdvertisementPopup from "./AdvertisementPopup";
import WebSearch from "./WebSearch";
import WebSearchResponse from "./WebSearchResponse";
import ActionButtons from "./ActionButtons";
import ECognitivePopup from "./ECognitivePopup";
import ECognitiveInterface from "./ECognitiveInterface";
import { SignInPopup } from "../Header";

import { AuthContext } from "../../../context/AuthContext";
import AiChat from "./AiChat";
import RyteLayout from "./RyteLayout";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [selectedMode, setSelectedMode] = useState("Chat");
  const [showHistoryCard, setShowHistoryCard] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isThinking, setIsThinking] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [archivedChats, setArchivedChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamingIndex, setStreamingIndex] = useState(-1);
  const [sourcesVisibility, setSourcesVisibility] = useState({});

  // Mode states
  const [extremeMode, setExtremeMode] = useState(false);
  const [ecognitiveMode, setECognitiveMode] = useState(false);
  const [showECognitivePopup, setShowECognitivePopup] = useState(false);
  const [showECognitiveInterface, setShowECognitiveInterface] = useState(false);

  // Enhanced UI states
  const [expandedReasoning, setExpandedReasoning] = useState({});
  const [fullscreenReasoning, setFullscreenReasoning] = useState(null);

  // Web search state
  const [showWebSearchResponse, setShowWebSearchResponse] = useState(false);
  const [currentWebSearch, setCurrentWebSearch] = useState({ query: "", mode: "" });

  // Backend integration states
  const { userToken, user } = useContext(AuthContext);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // ActionButtons state
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [dislikedMessages, setDislikedMessages] = useState(new Set());
  const [actionFeedback, setActionFeedback] = useState({});

  // Advertisement state
  const [showAdPopup, setShowAdPopup] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);

  const modes = [
    { name: "Chat", icon: MessageCircle },
    { name: "Web", icon: Globe },
    { name: "Image", icon: Camera },
    { name: "Extreme", icon: Sparkles },
    { name: "PDF", icon: FileText },
    { name: "Writer", icon: SquarePen },
  ];

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Helper function to extract clean domain
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      const parts = domain.split('.');
      if (parts.length > 2) {
        // Handle subdomains - take main domain only
        return parts.slice(-2).join('.');
      }
      return domain;
    } catch {
      return 'source';
    }
  };

  // Helper function for citation styling
  const getCitationStyle = (isDark) => {
    return `
      display: inline-flex;
      align-items: center;
      background: ${isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(37, 99, 235, 0.1)'};
      color: ${isDark ? '#60a5fa' : '#2563eb'};
      border: 1px solid ${isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.3)'};
      border-radius: 12px;
      padding: 1px 8px 2px 8px;
      margin: 0 4px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      vertical-align: middle;
      line-height: 1.2;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
  };

  const parseCitations = (text, sources) => {
    if (!sources || sources.length === 0) return text;

    const sourceMap = {};
    sources.forEach(source => {
      sourceMap[source.number] = {
        url: source.url,
        domain: extractDomain(source.url)
      };
    });

    const citationRegex = /\[(\d+(?:,\s*\d+)*)\]/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const citationNumbers = match[1].split(',').map(n => n.trim());
      const citations = citationNumbers.map((num) => {
        const source = sourceMap[num];
        if (source) {
          return `<span class="citation-badge" data-domain="${source.domain}" data-url="${source.url}" style="${getCitationStyle(isDark)}">${source.domain}</span>`;
        }
        return `[${num}]`;
      }).join('');

      parts.push(citations);
      lastIndex = match.index + match[0].length;

      // Check if citation is at the end of a sentence or should be followed by newline
      const nextChar = text[lastIndex];
      if (nextChar && nextChar !== ' ' && nextChar !== '.' && nextChar !== ',' && nextChar !== ';') {
        parts.push(' ');
      }
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.join('');
  };

  // Add citation click handler
  useEffect(() => {
    const handleCitationClick = (event) => {
      const citationBadge = event.target.closest('.citation-badge');
      if (citationBadge) {
        const url = citationBadge.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    };

    document.addEventListener('click', handleCitationClick);
    return () => document.removeEventListener('click', handleCitationClick);
  }, []);

  // eCognitive mode toggle function
  const toggleECognitiveMode = () => {
    if (ecognitiveMode) {
      // Turn off eCognitive
      setECognitiveMode(false);
      setExtremeMode(false);
      setShowECognitiveInterface(false);
    } else {
      // Turn on eCognitive
      setECognitiveMode(true);
      setExtremeMode(false);
      setShowECognitivePopup(true);

      // Show eCognitive interface after popup
      setTimeout(() => {
        setShowECognitiveInterface(true);
      }, 100);
    }
  };

  // Extreme mode toggle function
  const handleExtremeModeToggle = () => {
    if (extremeMode) {
      // Turn off extreme
      setExtremeMode(false);
    } else {
      // Turn on extreme - go back to normal chat interface
      setExtremeMode(true);
      setECognitiveMode(false);
      setShowECognitiveInterface(false);
      setShowECognitivePopup(false);
    }
  };

  useEffect(() => {
    if (userToken && showLoginPopup) {
      setShowLoginPopup(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    if (userToken) {
      loadChatHistory();
      loadArchivedChats();
    }
  }, [userToken]);

  const handleCopy = useCallback((messageText, messageId) => {
    navigator.clipboard.writeText(messageText).then(() => {
      setActionFeedback(prev => ({ ...prev, [messageId]: "Copied" }));
      setTimeout(() => {
        setActionFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[messageId];
          return newFeedback;
        });
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, []);

  const handleShare = useCallback((messageText, messageId) => {
    if (navigator.share) {
      navigator.share({ title: "BharatAi Response", text: messageText });
    } else {
      handleCopy(messageText, messageId);
    }
    setActionFeedback(prev => ({ ...prev, [messageId]: "Shared" }));
    setTimeout(() => {
      setActionFeedback(prev => {
        const newFeedback = { ...prev };
        delete newFeedback[messageId];
        return newFeedback;
      });
    }, 2000);
  }, [handleCopy]);

  const loadChatHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get-active-sessions/', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const formattedHistory = data.data.map(session => ({
          id: session.id,
          title: session.name,
          timestamp: session.created_at,
          messages: []
        }));
        setChatHistory(formattedHistory);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const loadArchivedChats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get-archived-sessions/', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const formattedArchived = data.data.map(session => ({
          id: session.id,
          title: session.name,
          timestamp: session.created_at,
          archivedAt: session.archived_at,
          messages: []
        }));
        setArchivedChats(formattedArchived);
      }
    } catch (error) {
      console.error('Error loading archived chats:', error);
    }
  };

  // Load session messages
  const loadSessionMessages = async (sessionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/session-details/${sessionId}/`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const chatData = data.data;

        const convertedMessages = [];

        for (let i = 0; i < chatData.length; i++) {
          const message = chatData[i];

          if (message.user_question) {
            convertedMessages.push({
              id: `${message.id}-user`,
              text: message.user_question,
              sender: "user",
              timestamp: new Date(message.created_at),
              isTyping: false,
            });
          }

          if (message.ai_response) {
            const sourcesArray = [];
            if (message.sources && typeof message.sources === 'object') {
              Object.keys(message.sources).forEach(key => {
                const source = message.sources[key];
                if (source && typeof source === 'object' && source.url) {
                  sourcesArray.push({
                    number: key,
                    url: source.url,
                    favicon: source.favicon || ''
                  });
                }
              });
            }

            const relatedQuestionsArray = Array.isArray(message.related_questions)
              ? message.related_questions
              : [];

            convertedMessages.push({
              id: message.id,
              text: message.ai_response,
              sender: "ai",
              timestamp: new Date(message.created_at),
              isTyping: false,
              sources: sourcesArray,
              relatedQuestions: relatedQuestionsArray,
              showSources: sourcesArray.length > 0,
              showRelatedQuestions: relatedQuestionsArray.length > 0,
            });
          }
        }

        setMessages(convertedMessages);

        // Sources visibility setup
        const initialVisibility = {};
        convertedMessages.forEach(msg => {
          if (msg.sources && msg.sources.length > 0) {
            initialVisibility[msg.id] = false;
          }
        });
        setSourcesVisibility(initialVisibility);

        return convertedMessages;
      }
    } catch (error) {
      console.error('Error loading session messages:', error);
    }
    return [];
  };

  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages, timestamp: new Date().toISOString() }
            : chat
        )
      );
    }
  }, [messages, currentChatId]);

  const handleWebSearch = (query, selectedMode, isExtremeMode = false) => {
    const mode = isExtremeMode ? 'extreme' : 'simple';
    setCurrentWebSearch({ query, mode });
    setShowWebSearchResponse(true);
  };

  const handleBackFromWebSearchResponse = () => {
    setShowWebSearchResponse(false);
    setCurrentWebSearch({ query: "", mode: "" });
  };

  // Handle submit for normal chat
  const handleSubmit = async (e, isExtremeMode = false) => {
    e.preventDefault();
    if (!message.trim() || !userToken) return;

    // If eCognitive mode is on, don't process here
    if (ecognitiveMode) return;

    setLoading(true);
    setIsThinking(true);

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    const aiPlaceholder = {
      id: Date.now() + 1,
      text: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
      sources: [],
      relatedQuestions: [],
      showSources: false,
      showRelatedQuestions: false,
    };

    setMessages([...updatedMessages, aiPlaceholder]);
    setStreamingIndex(updatedMessages.length);

    try {
      const mode = isExtremeMode ? 'extreme' : 'simple';
      const url = `http://127.0.0.1:8000/agentic-chat/?text=${encodeURIComponent(message)}&session_id=${currentSessionId || ""}&closed=false&mode=${mode}`;

      await fetchEventSource(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "text/event-stream",
        },
        withCredentials: true,

        async onopen(response) {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          setIsThinking(false);
        },

        onmessage(event) {
          // Handle session ID
          if (event.data.startsWith("session_id:")) {
            const newSessionId = event.data.replace("session_id:", "").trim();
            setCurrentSessionId(newSessionId);

            if (!currentChatId) {
              const newChat = {
                id: newSessionId,
                title: message.length > 50 ? message.substring(0, 50) + "..." : message,
                timestamp: new Date().toISOString(),
                messages: updatedMessages,
              };
              setChatHistory((prev) => [newChat, ...prev]);
              setCurrentChatId(newSessionId);
            }
          }
          // Handle show ad signal
          else if (event.data === "[SHOW_AD]") {
            console.log("Showing ad popup");
            setShowAdPopup(true);
          }
          // Handle close ad signal
          else if (event.data === "[CLOSE_AD]") {
            console.log("Closing ad popup");
            setShowAdPopup(false);
          }
          // Handle errors
          else if (event.data.startsWith("[ERROR]")) {
            const errorMsg = event.data.replace("[ERROR]", "").trim();
            console.error("AI Error:", errorMsg);

            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  text: `Error: ${errorMsg}`,
                  isTyping: false,
                  isError: true,
                };
                return updatedMessages;
              }
              return prevMessages;
            });

            // Close ad on error
            setShowAdPopup(false);
          }
          // Handle answer sections
          else if (event.data === "[START_ANSWER]") {
            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  text: "",
                  isTyping: true,
                };
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          else if (event.data === "[END_ANSWER]") {
            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  isTyping: false,
                };
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          // Handle sources
          else if (event.data.startsWith("[SOURCE]")) {
            const sourceData = event.data.replace("[SOURCE]", "").trim();
            const [num, url, favicon] = sourceData.split("|");

            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                const currentSources = updatedMessages[lastIndex].sources || [];

                if (!currentSources.find(s => s.number === num)) {
                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    sources: [...currentSources, { number: num, url: url, favicon: favicon || '' }],
                    showSources: true,
                  };
                }
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          // Handle related questions
          else if (event.data.startsWith("[QUESTION]")) {
            const question = event.data.replace("[QUESTION]", "").trim();

            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                const currentQuestions = updatedMessages[lastIndex].relatedQuestions || [];

                if (!currentQuestions.includes(question)) {
                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    relatedQuestions: [...currentQuestions, question],
                    showRelatedQuestions: true,
                  };
                }
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          // Handle newlines and tabs
          else if (event.data === "[NEWLINE]") {
            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  text: updatedMessages[lastIndex].text + '\n',
                  isTyping: true,
                };
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          else if (event.data === "[TAB]") {
            setMessages((prevMessages) => {
              const lastIndex = prevMessages.length - 1;
              if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                const updatedMessages = [...prevMessages];
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  text: updatedMessages[lastIndex].text + '\t',
                  isTyping: true,
                };
                return updatedMessages;
              }
              return prevMessages;
            });
          }
          // Handle regular text
          else {
            const filteredData = event.data
              .replace(/\[START_RELATED\]/g, '')
              .replace(/\[END_RELATED\]/g, '')
              .replace(/\[START_RELATED_QUESTIONS\]/g, '')
              .replace(/\[END_RELATED_QUESTIONS\]/g, '');

            if (filteredData.trim() || filteredData === ' ') {
              setMessages((prevMessages) => {
                const lastIndex = prevMessages.length - 1;
                if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
                  const updatedMessages = [...prevMessages];
                  const currentText = updatedMessages[lastIndex].text;

                  let newText = currentText + filteredData;

                  newText = newText
                    .replace(/([a-zA-Z]):([a-zA-Z])/g, '$1: $2')
                    .replace(/([a-zA-Z'])(\[\d+\])/g, '$1 $2')
                    .replace(/(\[\d+\])'([a-zA-Z])/g, "$1' $2")
                    .replace(/([a-z])([A-Z][a-z])/g, '$1 $2')
                    .replace(/-(\*\*)/g, '- $1')
                    .replace(/-([a-zA-Z])/g, '- $1');

                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    text: newText,
                    isTyping: true,
                  };
                  return updatedMessages;
                }
                return prevMessages;
              });
            }
          }
        },

        onclose() {
          setLoading(false);
          setStreamingIndex(-1);
          setIsThinking(false);

          // Close ad when stream ends
          setShowAdPopup(false);
        },

        onerror(error) {
          console.error("SSE error:", error);
          setLoading(false);
          setStreamingIndex(-1);
          setIsThinking(false);

          // Close ad on error
          setShowAdPopup(false);

          setMessages((prevMessages) => {
            const lastIndex = prevMessages.length - 1;
            if (lastIndex >= 0 && prevMessages[lastIndex].sender === "ai") {
              const updatedMessages = [...prevMessages];
              updatedMessages[lastIndex] = {
                ...updatedMessages[lastIndex],
                text: "Sorry, there was an error processing your request. Please try again.",
                isTyping: false,
                isError: true,
              };
              return updatedMessages;
            }
            return prevMessages;
          });

          throw error;
        },
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setLoading(false);
      setStreamingIndex(-1);
      setIsThinking(false);

      // Close ad on catch error
      setShowAdPopup(false);
    } finally {
      setMessage("");
    }
  };

  const submitFeedback = async (messageId, feedbackType) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/submit-feedback/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: currentSessionId,
          message_id: messageId.toString(),
          feedback: feedbackType
        })
      });

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  };

  const deleteFeedback = async (messageId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/delete-feedback/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: currentSessionId,
          message_id: messageId.toString()
        })
      });

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      return false;
    }
  };

  const handleLike = (messageId) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev);
      const wasLiked = newSet.has(messageId);

      if (wasLiked) {
        newSet.delete(messageId);
        setActionFeedback(prev => ({ ...prev, [messageId]: "Like removed" }));
        if (userToken && currentSessionId) deleteFeedback(messageId);
      } else {
        newSet.add(messageId);
        setDislikedMessages(prev => {
          const dislikeSet = new Set(prev);
          if (dislikeSet.has(messageId)) {
            dislikeSet.delete(messageId);
            if (userToken && currentSessionId) deleteFeedback(messageId);
          }
          return dislikeSet;
        });
        setActionFeedback(prev => ({ ...prev, [messageId]: "Liked" }));
        if (userToken && currentSessionId) submitFeedback(messageId, 'like');
      }

      setTimeout(() => {
        setActionFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[messageId];
          return newFeedback;
        });
      }, 2000);

      return newSet;
    });
  };

  const handleDislike = (messageId) => {
    setDislikedMessages(prev => {
      const newSet = new Set(prev);
      const wasDisliked = newSet.has(messageId);

      if (wasDisliked) {
        newSet.delete(messageId);
        setActionFeedback(prev => ({ ...prev, [messageId]: "Dislike removed" }));
        if (userToken && currentSessionId) deleteFeedback(messageId);
      } else {
        newSet.add(messageId);
        setLikedMessages(prev => {
          const likeSet = new Set(prev);
          if (likeSet.has(messageId)) {
            likeSet.delete(messageId);
            if (userToken && currentSessionId) deleteFeedback(messageId);
          }
          return likeSet;
        });
        setActionFeedback(prev => ({ ...prev, [messageId]: "Disliked" }));
        if (userToken && currentSessionId) submitFeedback(messageId, 'dislike');
      }

      setTimeout(() => {
        setActionFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[messageId];
          return newFeedback;
        });
      }, 2000);

      return newSet;
    });
  };

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

  const ThinkingDots = () => (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
    </div>
  );

  const handleRestoreChat = async (chatId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/unarchive-session/${chatId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await Promise.all([loadChatHistory(), loadArchivedChats()]);
      }
    } catch (error) {
      console.error('Error restoring chat:', error);
    }
  };

  const handleDeleteArchivedChat = async (chatId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete-session/${chatId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setArchivedChats((prev) => prev.filter((chat) => chat.id !== chatId));
      }
    } catch (error) {
      console.error('Error deleting archived chat:', error);
    }
  };

  const handleSelectChat = async (chat) => {
    setCurrentChatId(chat.id);
    setCurrentSessionId(chat.id);
    const sessionMessages = await loadSessionMessages(chat.id);
    setMessages(sessionMessages);
    setShowHistoryCard(false);
  };

  const handleSelectArchivedChat = async (chat) => {
    setCurrentChatId(chat.id);
    setCurrentSessionId(chat.id);
    const sessionMessages = await loadSessionMessages(chat.id);
    setMessages(sessionMessages);
    setShowSettings(false);
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setCurrentSessionId(null);
    setShowHistoryCard(false);
    setShowWebSearchResponse(false);
    setCurrentWebSearch({ query: "", mode: "" });
    setExtremeMode(false);
    setECognitiveMode(false);
    setShowECognitiveInterface(false);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete-session/${chatId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
        setArchivedChats((prev) => prev.filter((chat) => chat.id !== chatId));
        if (currentChatId === chatId) {
          startNewChat();
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleArchiveChat = async (chatId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/archive-session/${chatId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await Promise.all([loadChatHistory(), loadArchivedChats()]);
        if (currentChatId === chatId) {
          startNewChat();
        }
      }
    } catch (error) {
      console.error('Error archiving chat:', error);
    }
  };

  const handleArchiveChatFromShare = async (archivedChatObj) => {
    await handleArchiveChat(archivedChatObj.id);
  };

  const handleOpenArchivedChats = () => {
    setShowSettings(true);
  };

  const handleShareModalOpen = () => {
    setShowShareModal(true);
  };

  const handleShareModalClose = () => {
    setShowShareModal(false);
  };

  const handleShareChat = (chatId) => {
    const chat =
      chatHistory.find((c) => c.id === chatId) ||
      archivedChats.find((c) => c.id === chatId);
    if (chat) {
      console.log("Sharing chat:", chat.title);
    }
  };

  const handleRenameChat = async (chatId, newTitle) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/rename-session/${chatId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_name: newTitle
        })
      });

      if (response.ok) {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
          )
        );
      }
    } catch (error) {
      console.error('Error renaming chat:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Recorded audio URL:", audioUrl);
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const isInitialState = messages.length === 0;
  const isAnyModalOpen = showSearchModal || showShareModal || showSettings;

  const shouldShowWebSearch = selectedMode === "Web" && isInitialState && !showWebSearchResponse;
  const shouldShowWebSearchResponse = selectedMode === "Web" && showWebSearchResponse;
  const shouldShowPdfPage = selectedMode === "PDF" && isInitialState;
  const shouldShowWriterPage = selectedMode === "Writer" && isInitialState;

  const commonProps = {
    showProfileMenu,
    setShowProfileMenu,
    theme,
    handleThemeChange,
    user,
    isAuthenticated: !!user,
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
    onHistoryClick: () => setShowHistoryCard(true)
  };

  const handleSendIfGuest = (e, isExtremeMode = false) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!userToken) {
      setShowLoginPopup(true);
    } else {
      handleSubmit(e, isExtremeMode);
    }
  };

  // DisclaimerText (NO CREDIT INFO SHOWN)
  const DisclaimerText = () => (
    <div className="text-center mt-3 px-4">
      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        BharatAi may not always be accurate. Always verify crucial details.
      </p>
    </div>
  );

  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const language = className?.replace("language-", "") || null;
      const code = String(children).trim();
      const match = /language-(\w+)/.exec(className || "");
      const detectedLang =
        language || hljs.highlightAuto(code).language || "plaintext";

      const [isCodeCopied, setIsCodeCopied] = useState(false);

      const handleCodeCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
          setIsCodeCopied(true);
          setTimeout(() => setIsCodeCopied(false), 2000);
        });
      };

      return !inline && match ? (
        <div
          className="relative group mb-4 w-full max-w-[650px]"
          style={{
            display: "block",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            minHeight: "50px",
          }}
        >
          <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg w-full mt-2">
            <span className="text-sm text-gray-300 font-medium capitalize">
              {detectedLang || match[1] || "code"}
            </span>
            <button
              onClick={handleCodeCopy}
              className="flex items-center space-x-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors duration-200"
              title="Copy code"
            >
              {isCodeCopied ? (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <SyntaxHighlighter
            style={oneDark}
            language={detectedLang || match[1]}
            PreTag="div"
            className="rounded-t-none rounded-b-lg !mt-0"
            wrapLines={true}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              width: "100%",
              maxWidth: "650px",
              wordWrap: "break-word",
              overflowX: "auto",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded !text-gray-800 dark:!text-gray-200 text-sm"
          style={{
            display: "inline-block",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Custom paragraph handler for citations
    p: ({ node, children, ...props }) => {
      const content = React.Children.toArray(children);

      return (
        <p {...props}>
          {content.map((child, index) => {
            if (typeof child === 'string') {
              return <span key={index} dangerouslySetInnerHTML={{ __html: child }} />;
            }
            return child;
          })}
        </p>
      );
    }
  };

  // Group messages into pairs for new UI
  const messagePairs = [];
  for (let i = 0; i < messages.length; i += 2) {
    const userMessage = messages[i];
    const aiMessage = messages[i + 1];
    messagePairs.push({ userMessage, aiMessage });
  }

  return (
    <>
      {/* Advertisement Popup */}
      <AdvertisementPopup
        showPopup={showAdPopup}
        onClose={() => setShowAdPopup(false)}
      />

      {/* eCognitive Popup */}
      {showECognitivePopup && (
        <ECognitivePopup
          isDark={isDark}
          onClose={() => setShowECognitivePopup(false)}
        />
      )}

      {/* Main Content */}
      {showECognitiveInterface ? (
        <ECognitiveInterface
          isDark={isDark}
          onBack={() => {
            setShowECognitiveInterface(false);
            setECognitiveMode(false);
          }}
          userToken={userToken}
          setShowLoginPopup={setShowLoginPopup}
          onThemeChange={handleThemeChange}
          
        />
      ) : (
        <div
          className={`min-h-screen ${isDark ? "bg-black text-white" : "text-black"} flex flex-col`}
          style={{
            fontFamily: "ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol",
            ...(!isDark ? {
              background: 'radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.6) 100%), linear-gradient(to right, #e2eef6 0%, #d3def8 45%, #c8d3f8 65%, #dcd6f7 85%, #f1eef6 100%)',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover'
            } : {})
          }}
        >
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
            .scrollbar-custom::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-custom::-webkit-scrollbar-track {
              background: ${isDark ? "#1e1e1e" : "#f9fafb"};
              border-radius: 4px;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb {
              background: ${isDark ? "#374151" : "#9ca3af"};
              border-radius: 4px;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb:hover {
              background: ${isDark ? "#4b5563" : "#6b7280"};
            }
            
            /* Typewriter cursor animation */
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            
            .typewriter-cursor {
              display: inline-block;
              width: 2px;
              background-color: currentColor;
              margin-left: 2px;
              animation: blink 1s infinite;
            }

            /* Citation badge styles */
            .citation-badge {
              position: relative;
            }
            
            .citation-badge:hover {
              transform: translateY(-1px);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
              background: ${isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(37, 99, 235, 0.15)'};
            }
          `}</style>

          {shouldShowWebSearchResponse ? (
            <WebSearchResponse
              query={currentWebSearch.query}
              searchMode={currentWebSearch.mode}
              isDark={isDark}
              results={[]}
              onBack={handleBackFromWebSearchResponse}
              {...commonProps}
            />
          ) : shouldShowWebSearch ? (
            <WebSearch
              isDark={isDark}
              onSearch={handleWebSearch}
              onBackToChat={() => setSelectedMode('Chat')}
              {...commonProps}
            />
          ) : shouldShowPdfPage ? (
            <AiChat
              isDark={isDark}
              {...commonProps}
            />
          ) : shouldShowWriterPage ? (
            <RyteLayout
              {...commonProps}
            />
          ) : (
            <>
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

              <main className={`flex-1 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-0`}>
                <div className="w-full max-w-4xl flex flex-col h-full">
                  {isInitialState && (
                    <div className="flex flex-col items-center justify-center space-y-8 h-full">
                      <h1
                        className={`text-4xl font-light ${isDark ? "text-white" : "text-black"
                          } tracking-wide`}
                      >
                        BharatAI
                      </h1>
                      <div className="w-full max-w-2xl">
        
                        <ChatInput
                          message={message}
                          setMessage={setMessage}
                          handleSubmit={handleSendIfGuest}
                          modes={modes}
                          selectedMode={selectedMode}
                          setSelectedMode={setSelectedMode}
                          isRecording={isRecording}
                          startRecording={startRecording}
                          stopRecording={stopRecording}
                          isDark={isDark}
                          isInitialState={isInitialState}
                          isBlurred={isAnyModalOpen}
                          loading={loading}
                          onWebSearch={handleWebSearch}
                          extremeMode={extremeMode}
                          setExtremeMode={handleExtremeModeToggle}
                          ecognitiveMode={ecognitiveMode}
                          toggleECognitiveMode={toggleECognitiveMode}
                        />
                        <DisclaimerText />
                      </div>
                    </div>
                  )}

                  {!isInitialState && (
                    <>
                      <div className="flex-1 overflow-y-auto scrollbar-custom pb-40 pt-10">
                        <div className="max-w-4xl mx-auto w-[94%] py-6 px-4 sm:px-6 md:px-8 lg:px-[90px] space-y-8">
                          {messagePairs.map((pair, index) => (
                            <div key={pair.userMessage.id} className="space-y-3">
                              {/* User Message */}
                              <div className={`mb-1 h-full w-fulls ${isDark ? "bg-gray-700" : "bg-indigo-200"
                                } rounded-2xl py-2 px-3`}>
                                <h2
                                  className={`text-lm font-normal ${isDark ? "text-white" : "text-black"
                                    } mb-0  text-justify`}
                                >
                                  {pair.userMessage.text}
                                </h2>
                              </div>

                              {/* AI Response Block */}
                              {pair.aiMessage && (
                                <div>
                                  {/* Header with Avatar and Name */}
                                  <div className="flex items-center space-x-3 mb-4 mt-4">
                                    <div
                                      className={`relative flex-shrink-0 w-10 h-10 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"
                                        } flex items-center justify-center`}
                                    >
                                      <span
                                        className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"
                                          }`}
                                      >
                                        B
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span
                                        className={`text-sm font-medium ${isDark ? "text-white" : "text-black"
                                          }`}
                                      >
                                        BharatAi
                                      </span>
                                    </div>
                                  </div>

                                  {/* Thinking dots */}
                                  {pair.aiMessage.isTyping && !pair.aiMessage.text && (
                                    <div className="ml-11 mb-4">
                                      <ThinkingDots />
                                    </div>
                                  )}

                                  {/* Response Content */}
                                  <div className="mb-12">
                                    {pair.aiMessage.isTyping && !pair.aiMessage.text ? (
                                      <div className="flex items-center space-x-2 py-2">
                                        {/* <span className={`${isDark ? "text-gray-300" : "text-gray-700"} ml-10`}>
                                          AI is thinking...
                                        </span> */}
                                      </div>
                                    ) : (
                                      <div className="space-y-6">
                                        {/* SOURCES SECTION - Collapsible with Animation */}
                                        {pair.aiMessage.sources && pair.aiMessage.sources.length > 0 && (
                                          <div
                                            className={`rounded-[1rem] m-2 border backdrop-blur-sm ${isDark
                                              ? 'bg-[#2c2c2c]/50 border-gray-700'
                                              : 'bg-gray-50/50 border-gray-200'
                                              } overflow-hidden transition-all`}
                                          >
                                            {/* Header */}
                                            <button
                                              onClick={() => {
                                                setSourcesVisibility((prev) => ({
                                                  ...prev,
                                                  [pair.aiMessage.id]: !prev[pair.aiMessage.id],
                                                }));
                                              }}
                                              className={`w-full px-4 py-2 flex items-center justify-between ${isDark ? 'hover:bg-gray-700/40' : 'hover:bg-gray-100/40'
                                                } transition-colors`}
                                            >
                                              {/* Left Side (Title) */}
                                              <div className="flex items-center">
                                                <Globe
                                                  size={16}
                                                  className={`mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                                                />
                                                <span
                                                  className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'
                                                    }`}
                                                >
                                                  Sources
                                                </span>
                                              </div>

                                              {/* Right Side (Favicons + Count + Arrow) */}
                                              <div className="flex items-center gap-3">
                                                {/* Favicons */}
                                                <div className="flex items-center -space-x-2">
                                                  {pair.aiMessage.sources.slice(0, 3).map((source, idx) => (
                                                    <img
                                                      key={idx}
                                                      src={source.favicon || '/api/placeholder/16/16'}
                                                      alt={source.title}
                                                      className={`w-5 h-5 rounded-full border-2 ${isDark ? 'border-[#2c2c2c]' : 'border-white'
                                                        }`}
                                                      style={{ zIndex: 3 - idx }}
                                                    />
                                                  ))}
                                                </div>

                                                {/* Count */}
                                                <span
                                                  className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                                                    } whitespace-nowrap`}
                                                >
                                                  {pair.aiMessage.sources.length > 3
                                                    ? `+ ${pair.aiMessage.sources.length - 3} sources`
                                                    : `${pair.aiMessage.sources.length} source${pair.aiMessage.sources.length > 1 ? 's' : ''
                                                    }`}
                                                </span>

                                                {/* Dropdown Arrow */}
                                                <svg
                                                  className={`transition-transform duration-300 ${sourcesVisibility[pair.aiMessage.id] ? 'rotate-180' : ''
                                                    } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                >
                                                  <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                              </div>
                                            </button>

                                            {/* Collapsible Content */}
                                            <div
                                              className={`transition-all duration-300 ease-in-out ${sourcesVisibility[pair.aiMessage.id]
                                                ? 'max-h-[16.5rem] opacity-100'
                                                : 'max-h-0 opacity-0'
                                                } overflow-hidden`}
                                            >
                                              <div
                                                className={`px-4 pb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'
                                                  }`}
                                              >
                                                <div
                                                  className={`mt-3 space-y-1 overflow-y-auto overflow-x-hidden ${sourcesVisibility[pair.aiMessage.id] ? 'max-h-[15rem]' : ''
                                                    }`}
                                                >
                                                  {pair.aiMessage.sources.map((source, index) => (
                                                    <div
                                                      key={index}
                                                      className={`p-3 rounded-md ${isDark ? 'hover:bg-gray-700/40' : 'hover:bg-gray-200/40'
                                                        }`}
                                                    >
                                                      <div className="flex items-center space-x-3">
                                                        {/* Favicon */}
                                                        <div
                                                          className={`w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-white border border-gray-300'
                                                            }`}
                                                        >
                                                          {source.favicon ? (
                                                            <img
                                                              src={source.favicon}
                                                              alt="favicon"
                                                              className="w-4 h-4 object-contain"
                                                              onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'block';
                                                              }}
                                                            />
                                                          ) : (
                                                            <Globe
                                                              size={14}
                                                              className={isDark ? 'text-gray-300' : 'text-gray-600'}
                                                            />
                                                          )}
                                                        </div>

                                                        {/* Source Link */}
                                                        <a
                                                          href={source.url}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className={`text-sm truncate ${isDark
                                                            ? 'text-blue-400 hover:text-blue-300'
                                                            : 'text-blue-600 hover:text-blue-800'
                                                            }`}
                                                          title={source.url}
                                                        >
                                                          {extractDomain(source.url)}
                                                        </a>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* MAIN ANSWER SECTION */}
                                        <div
                                          className={`${isDark ? "text-gray-300" : "text-gray-700"
                                            } text-ls leading-relaxed animate-fadeIn px-3.5`}
                                        >
                                          <div className={`prose prose-gray ${isDark ? "prose-invert" : ""} max-w-none`}>
                                            <ReactMarkdown
                                              children={parseCitations(pair.aiMessage.text + (pair.aiMessage.isTyping ? '|' : ''), pair.aiMessage.sources)}
                                              remarkPlugins={[remarkGfm]}
                                              rehypePlugins={[rehypeRaw]}
                                              components={renderers}
                                            />
                                          </div>
                                          {/* Typewriter cursor */}
                                          {pair.aiMessage.isTyping && (
                                            <span className="typewriter-cursor"></span>
                                          )}
                                        </div>

                                        {/* RELATED QUESTIONS SECTION - Show Last */}
                                        {pair.aiMessage.relatedQuestions && pair.aiMessage.relatedQuestions.length > 0 && (
                                          <div className="mr-1 ml-1">
                                            {/* Header */}
                                            <div className="px-4 py-3">
                                              <h3 className="text-sm font-semibold flex items-center">
                                                Suggested questions
                                              </h3>
                                            </div>

                                            {/* Questions List */}
                                            <div>
                                              {pair.aiMessage.relatedQuestions.map((question, index) => (
                                                <button
                                                  key={index}
                                                  onClick={() => setMessage(question)}
                                                  className={`rounded-[1rem] w-full px-4 py-3 text-left flex items-start space-x-3 ${isDark
                                                    ? 'hover:bg-gray-500 text-gray-200'
                                                    : 'hover:bg-indigo-200 text-gray-800'
                                                    } transition-colors cursor-pointer group`}
                                                >
                                                  {/* Arrow Icon */}
                                                  <svg
                                                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-400 group-hover:text-black' : 'text-gray-500 group-hover:text-gray-900'
                                                      }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M9 5l7 7-7 7"
                                                    />
                                                  </svg>

                                                  {/* Question Text */}
                                                  <span className={`text-sm flex-1 ${isDark ? 'text-gray-300 group-hover:text-black' : 'text-gray-700 group-hover:text-gray-900'
                                                    }`}>
                                                    {question}
                                                  </span>
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* ACTION BUTTONS */}
                                        {!pair.aiMessage.isTyping && pair.aiMessage.text && (
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
                                            currentChatId={currentChatId}
                                            chatHistory={chatHistory}
                                            onArchiveChat={handleArchiveChatFromShare}
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <div ref={scrollRef}></div>
                        </div>
                        <div ref={messagesEndRef} />
                      </div>

                      <div
                        className={`fixed bottom-0 left-0 w-full ${isAnyModalOpen ? "z-0" : "z-10"
                          }`}
                        style={{
                          background: isDark ? "#000" : "radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.6) 100%), linear-gradient(to right, #e2eef6 0%, #d3def8 45%, #c8d3f8 65%, #dcd6f7 85%, #f1eef6 100%)",
                        }}
                      >
                        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-0 pb-4 w-full">
                          <ChatInput
                            message={message}
                            setMessage={setMessage}
                            handleSubmit={handleSendIfGuest}
                            modes={modes}
                            selectedMode={selectedMode}
                            setSelectedMode={setSelectedMode}
                            isRecording={isRecording}
                            startRecording={startRecording}
                            stopRecording={stopRecording}
                            isDark={isDark}
                            isInitialState={isInitialState}
                            isBlurred={isAnyModalOpen}
                            loading={loading}
                            onWebSearch={handleWebSearch}
                            extremeMode={extremeMode}
                            setExtremeMode={handleExtremeModeToggle}
                            ecognitiveMode={ecognitiveMode}
                            toggleECognitiveMode={toggleECognitiveMode}
                          />
                          <DisclaimerText />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </main>
            </>
          )}

          {!shouldShowWebSearch && !shouldShowWebSearchResponse && (
            <>
              {showProfileMenu && (
                <ProfileMenu
                  isDark={isDark}
                  theme={theme}
                  onThemeChange={handleThemeChange}
                  onClose={() => setShowProfileMenu(false)}
                  user={user}
                  isAuthenticated={!!user}
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
            </>
          )}

          {!shouldShowWebSearch && !shouldShowWebSearchResponse && showHistoryCard && (
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

          {showLoginPopup && (
            <SignInPopup
              showPopup={showLoginPopup}
              setShowPopup={setShowLoginPopup}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChatInterface;