import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Send, Mic, Paperclip, MessageSquare, ArrowUp, Loader2, Bot, User, Search, FileText, Globe, TrendingUp, BookOpen, DollarSign, Video, SquarePen } from "lucide-react";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { ScrollArea } from "../../ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AdvertisementPopup from "./AdvertisementPopup";

export const ChatPanel = ({ uploadedFile, sessionId, isDark = false }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [searchMode, setSearchMode] = useState("Document");
  const [searchTerm, setSearchTerm] = useState("");

  // Credit-based states
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState(50);
  // const [chatLimitInfo, setChatLimitInfo] = useState(null);

  const messagesEndRef = useRef(null);
  const eventSourceRef = useRef(null);
  const recognitionRef = useRef(null);
  const dropdownRef = useRef(null);
  const modeButtonRef = useRef(null);
  const searchInputRef = useRef(null);

  const [showModes, setShowModes] = useState(false);

  // Check credits on mount
  useEffect(() => {
    checkChatLimit();
  }, []);

  const checkChatLimit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch('http://127.0.0.1:8000/check-chat-limit/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // setChatLimitInfo(data);
        setCreditsRemaining(data.credits_remaining || 50);
      }
    } catch (error) {
      console.error('Error checking chat limit:', error);
    }
  };

  // Navigation function
  const navigateToChatInterface = () => {
    navigate('/test/chat');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionId) loadChatHistory();
  }, [sessionId]);

  useEffect(() => {
    const handleClearMessages = () => {
      setMessages([]);
    };

    window.addEventListener("clearChatMessages", handleClearMessages);

    return () => {
      window.removeEventListener("clearChatMessages", handleClearMessages);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        modeButtonRef.current &&
        !modeButtonRef.current.contains(event.target)
      ) {
        setShowModes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search bar when dropdown opens
  useEffect(() => {
    if (showModes && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showModes]);

  const searchModes = [
    {
      name: "Document",
      icon: FileText,
      description: "Search within your uploaded document"
    },
    {
      name: "Web",
      icon: Globe,
      description: "Search across the entire Internet powered by Exa AI"
    },
    {
      name: "X",
      icon: () => <span className="font-bold text-xs">𝕏</span>,
      description: "Search X posts"
    },
    {
      name: "Writer",
      icon: SquarePen,
      description: "Unleash your creativity, one word at a time"
    },
    {
      name: "PDF",
      icon: FileText,
      description: "Discuss and collaborate on PDF documents easily"
    },
    {
      name: "Stocks",
      icon: TrendingUp,
      description: "Stock and currency information"
    },
    {
      name: "Reddit",
      icon: () => <span className="font-bold text-orange-500 text-xs">R</span>,
      description: "Search Reddit posts"
    },
    {
      name: "Academic",
      icon: BookOpen,
      description: "Search academic papers powered by Exa"
    },
    {
      name: "Chat",
      icon: MessageSquare,
      description: "Talk to the model directly.",
      action: "navigate"
    },
    {
      name: "Crypto",
      icon: DollarSign,
      description: "Cryptocurrency research powered by CoinGecko"
    },
    {
      name: "YouTube",
      icon: Video,
      description: "Search YouTube videos powered by Exa"
    },
  ];

  const filteredModes = searchModes.filter((mode) =>
    mode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleModeSelect = (mode) => {
    if (mode.name === "Chat" && mode.action === "navigate") {
      navigateToChatInterface();
    } else {
      setSearchMode(mode.name);
    }
    setShowModes(false);
    setSearchTerm("");
  };

  const loadChatHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://127.0.0.1:8000/rag-chat-history/${sessionId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch chat history");

      const data = await response.json();
      if (data.success) {
        const formattedMessages = data.chats.map((chat) => ({
          id: chat.id,
          role: chat.sender === "BharatAI" ? "assistant" : "user",
          content: chat.content,
          timestamp: new Date(chat.created_at),
          isFromDocument: chat.is_from_document,
        }));
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!sessionId) return setError("Please upload a document first");

    // Check credits but don't block
    await checkChatLimit();

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage = {
      id: aiMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const token = localStorage.getItem("authToken");
      const eventSource = new EventSource(
        `http://127.0.0.1:8000/rag-chat/?session_id=${encodeURIComponent(
          sessionId
        )}&text=${encodeURIComponent(userMessage.content)}&stream=true&token=${token}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle different message types
          if (data.status === 'started') {
            // Session started
          } else if (data.chunk) {
            // Stream content
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                last.content += data.chunk;
              }
              return updated;
            });
          } else if (data.status === 'credits_deducted') {
            console.log(`Credits deducted: ${data.amount}`);
          } else if (data.status === 'credits_remaining') {
            setCreditsRemaining(data.amount);
            checkChatLimit(); // Refresh credit info
          } else if (data.status === 'completed') {
            eventSource.close();
            setIsLoading(false);
            setShowAdPopup(false); // Close ad when done
          }
        } catch (err) {
          // Handle special signals
          if (event.data === "[SHOW_AD]") {
            setShowAdPopup(true);
          } else if (event.data === "[CLOSE_AD]") {
            setShowAdPopup(false);
          } else {
            console.error("Error parsing SSE data:", err);
          }
        }
      };

      eventSource.onerror = (err) => {
        console.error("EventSource error:", err);
        setError("Connection error. Please try again.");
        eventSource.close();
        setIsLoading(false);
        setShowAdPopup(false);
      };
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message");
      setIsLoading(false);
      setMessages((prev) => prev.filter((m) => m.id !== aiMessageId));
      setShowAdPopup(false);
    }
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-IN";
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = [
    "What are the core objectives and numerical targets for the state's startup ecosystem development?",
    "Summarize the main points from the document",
    "What are the key takeaways?",
  ];

  const getPlaceholder = () => {
    switch (searchMode) {
      case "Web":
        return "Search the web...";
      case "X":
        return "Search X posts...";
      case "Writer":
        return "Start writing...";
      case "PDF":
        return "Ask about your PDF...";
      case "Stocks":
        return "Search stocks and currencies...";
      case "Reddit":
        return "Search Reddit posts...";
      case "Academic":
        return "Search academic papers...";
      case "Chat":
        return "Chat with AI...";
      case "Crypto":
        return "Search cryptocurrency info...";
      case "YouTube":
        return "Search YouTube videos...";
      case "Document":
      default:
        return "Ask about your document...";
    }
  };

  const placeholder = getPlaceholder();

  return (
    <>
      <AdvertisementPopup
        showPopup={showAdPopup}
        onClose={() => setShowAdPopup(false)}
      />

      <div className={`flex-1 flex flex-col ${isDark ? "bg-black text-white" : ""}`}>
        {/* Header */}
        <div className={`p-[20px] border-b flex items-center justify-center ${isDark ? "border-gray-700" : "border-gray-300"
          }`}>
          <MessageSquare className={`fill-purple-500 text-purple-500 h-7 w-7 mr-3 ${isDark ? "text-purple-400" : "text-purple-500"
            }`} />
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-foreground"
            }`}>AI Research Chat</h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
              {uploadedFile ? (
                <>
                  <p className={`text-center mb-8 ${isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                    Document loaded. Ask me anything!
                  </p>
                  <div className="w-full max-w-xl space-y-3">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(prompt)}
                        className={`w-full text-left p-4 border rounded-xl transition-all duration-200 hover:shadow-md text-sm ${isDark
                            ? "bg-black border-gray-700 hover:bg-gray-900 text-white"
                            : "bg-white border-gray-300 hover:bg-secondary text-foreground"
                          }`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-muted-foreground"
                    }`}>No document uploaded</p>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"
                    }`}>Upload a document to start chatting</p>
                </>
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : isDark
                          ? "bg-black border border-gray-700 text-white"
                          : "border border-gray-300 text-foreground"
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.role === "assistant" && (
                        <div className={`relative flex-shrink-0 w-6 h-6 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"
                          } flex items-center justify-center`}>
                          <span className={`text-xs font-semibold ${isDark ? "text-white" : "text-black"
                            }`}>
                            B
                          </span>
                        </div>
                      )}
                      <div className="prose prose-sm max-w-none text-sm leading-relaxed font-['Google_Sans_Text','Google_Sans',sans-serif]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl px-5 py-3 max-w-[80%] ${isDark
                      ? "bg-black border border-gray-700 text-white"
                      : "border border-gray-300 text-foreground"
                    }`}>
                    <div className="flex items-center gap-2">
                      <div className={`relative flex-shrink-0 w-6 h-6 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"
                        } flex items-center justify-center`}>
                        <span className={`text-xs font-semibold ${isDark ? "text-white" : "text-black"
                          }`}>
                          B
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-400"
                          }`}></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-400"
                            }`}
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-400"
                            }`}
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Error */}
        {error && (
          <div className="px-6 py-2">
            <div className={`max-w-2xl mx-auto rounded-lg px-4 py-2 border ${isDark
                ? "bg-red-900 border-red-800"
                : "bg-red-50 border-red-200"
              }`}>
              <p className={`text-sm ${isDark ? "text-red-300" : "text-red-600"
                }`}>{error}</p>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-2">
          <div className="max-w-2xl mx-auto">
            <div className={`relative rounded-2xl shadow-lg border ${isDark
                ? "bg-black border-gray-700"
                : "bg-card border-gray-300"
              }`}>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={!uploadedFile || isLoading}
                className={`min-h-[120px] pl-4 pt-4 pb-16 pr-4 resize-none border-0 focus-visible:ring-0 rounded-2xl text-base ${isDark
                    ? "bg-black text-white placeholder-gray-400"
                    : "bg-white text-black"
                  }`}
              />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                {/* Mode selector dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={modeButtonRef}
                    type="button"
                    onClick={() => setShowModes((prev) => !prev)}
                    disabled={!uploadedFile || isLoading}
                    className={`flex items-center h-8 px-3 rounded-full border shadow-sm transition ${isDark
                        ? "bg-gray-900 hover:bg-gray-800 text-white border-gray-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                      } disabled:opacity-50`}
                  >
                    <div className="flex items-center space-x-1">
                      {(() => {
                        const selected = searchModes.find((m) => m.name === searchMode);
                        const Icon = selected?.icon;
                        return Icon && <Icon size={14} />;
                      })()}
                    </div>

                    <div className="ml-2 flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={5}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2 w-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {showModes && (
                    <div className={`absolute z-50 bottom-full mb-2 rounded-2xl shadow-lg w-64 overflow-hidden border ${isDark
                        ? "bg-black border-gray-700 text-white"
                        : "bg-white border-gray-200 text-black"
                      }`}>
                      {/* Header with search */}
                      <div className={`px-3 py-2 border-b ${isDark ? "border-gray-700" : "border-gray-200"
                        }`}>
                        <div className="relative">
                          {/* Search icon (left) */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                            />
                          </svg>

                          {/* Input */}
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search modes..."
                            className={`w-full pl-10 pr-3 py-1 text-xs ${isDark
                                ? "bg-black text-white placeholder-gray-400"
                                : "bg-white text-gray-800"
                              }`}
                          />
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto">
                        <h3 className={`text-xs font-medium px-3 py-1.5 ${isDark ? "text-gray-400" : "text-gray-600"
                          }`}>
                          Search Mode
                        </h3>
                        {filteredModes.map((mode) => {
                          const Icon = mode.icon;
                          const isSelected = searchMode === mode.name;
                          return (
                            <button
                              key={mode.name}
                              type="button"
                              onClick={() => handleModeSelect(mode)}
                              className={`flex items-start space-x-2.5 w-full px-3 py-2 text-left transition-colors ${isDark
                                  ? "hover:bg-gray-800 text-white"
                                  : "hover:bg-gray-100 text-gray-700"
                                }`}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {Icon && <Icon size={16} />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium text-xs leading-tight">
                                    {mode.name}
                                  </div>
                                  {isSelected && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5 text-blue-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className={`text-xs mt-0.5 leading-tight ${isDark ? "text-gray-400" : "text-gray-500"
                                  }`}>
                                  {mode.description}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                {/* <button
                  type="button"
                  disabled={!uploadedFile || isLoading}
                  className={`p-2 rounded-full ${isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    } disabled:opacity-50`}
                >
                  <Paperclip size={16} />
                </button> */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={!uploadedFile || isLoading}
                  className={`p-2 rounded-full ${isListening
                      ? "bg-red-500 text-white"
                      : isDark
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    } disabled:opacity-50`}
                >
                  <Mic size={16} />
                </button>
                {input.trim() && (
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!uploadedFile || isLoading}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ArrowUp size={16} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Updated disclaimer with credit info */}
            <p className={`text-xs mt-3 text-center ${isDark ? "text-gray-400" : "text-gray-500"
              }`}>
              BharatAI may not always be accurate. Always verify crucial details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};