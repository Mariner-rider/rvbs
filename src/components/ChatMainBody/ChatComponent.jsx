import React, { useContext, useEffect, useState, useRef } from "react";
import bharatAi from "../../assets/images/bharatai2.png";
import AiLogo from "../../assets/images/blogo.png";
import Sidebar from "../AiSidebar/AsideToggle/MainSideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ShareButtons from "./ChatFunctions/ShareButtons";
import CopyButton from "./ChatFunctions/CopyButton";
import LikeDislikeButtons from "./ChatFunctions/LikeDislikeButtons";
import NewSearchbar from "./SearchBar/NewSearchbar";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js";
import "./chat.css";
import { SessionManager } from "./sessionManager";

const ChatComponent = () => {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { sessionId: urlSessionId } = useParams(); // Get session ID from URL
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isid, setIsid] = useState("");
  const [streamingIndex, setStreamingIndex] = useState(-1);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

// Updated useEffect in ChatComponent to better handle session loading

useEffect(() => {
  const loadSession = async () => {
    if (urlSessionId) {
      setIsid(urlSessionId);
      
      // First, try to load from sessionStorage
      const savedChatHistory = sessionStorage.getItem(`chatHistory_${urlSessionId}`);
      
      if (savedChatHistory) {
        setChatHistory(JSON.parse(savedChatHistory));
      } else {
        // If no saved history, fetch from backend
        try {
          const response = await fetch(`http://127.0.0.1:8000/session-details/${urlSessionId}/`, {
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            const chatData = data.data.chat || data.data;
            
            // Convert the backend format to your chat format
            const convertedHistory = chatData.map((item, index) => {
              if (index % 2 === 0) { // Assuming alternating user/bot messages
                return {
                  query: item.content,
                  response: chatData[index + 1]?.content || ''
                };
              }
              return null;
            }).filter(Boolean);
            
            setChatHistory(convertedHistory);
            
            // Save to sessionStorage for future use
            sessionStorage.setItem(`chatHistory_${urlSessionId}`, JSON.stringify(convertedHistory));
          } else {
            console.error('Failed to fetch session data');
            // Optionally redirect to /chat if session doesn't exist
            // navigate('/chat');
          }
        } catch (error) {
          console.error('Error fetching session:', error);
        }
      }
    } else {
      // If on /chat route (no session ID), start fresh
      setChatHistory([]);
      setIsid("");
      sessionStorage.removeItem("currentSessionId");
    }
  };

  loadSession();
}, [urlSessionId, userToken]);

// Also add this function to handle session creation better
const createNewSession = () => {
  setChatHistory([]);
  setIsid("");
  sessionStorage.removeItem("currentSessionId");
  navigate('/chat');
};
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [chatHistory]);

  // Add this import to your ChatComponent
 // Adjust path as needed

// Update the handleSearch function in your ChatComponent
const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;

  setLoading(true);

  const newChatEntry = { query: searchQuery, response: "" };
  const updatedChatHistory = [...chatHistory, newChatEntry];
  setChatHistory(updatedChatHistory);

  setStreamingIndex(updatedChatHistory.length - 1);

  // Save first query for session title
  if (updatedChatHistory.length === 1) {
    localStorage.setItem("firstQuery", searchQuery);
  }

  try {
    // Use current session ID or empty for new session
    let tempSessionId = urlSessionId || isid || "";
    const url = `http://127.0.0.1:8000/chat/?text=${encodeURIComponent(
      searchQuery
    )}&session_id=${tempSessionId}`;

    await fetchEventSource(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "text/event-stream",
      },
      withCredentials: true,
      async onopen(response) {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
      },
      onmessage(event) {
        if (event.data.startsWith("session_id:")) {
          const newSessionId = event.data.replace("session_id:", "").trim();
          setIsid(newSessionId);
          
          // Save session using SessionManager
          const firstQuery = localStorage.getItem("firstQuery");
          SessionManager.saveSession(newSessionId, firstQuery, updatedChatHistory);
          
          // Save session data with session-specific key
          sessionStorage.setItem("currentSessionId", newSessionId);
          sessionStorage.setItem(`chatHistory_${newSessionId}`, JSON.stringify(updatedChatHistory));
          
          // Only navigate to session URL when starting a new chat from /chat
          if (!urlSessionId) {
            navigate(`/chat/${newSessionId}`, { replace: true });
          }
        } else {
          setChatHistory((prevHistory) => {
            if (prevHistory.length === 0) return prevHistory;

            const lastIndex = prevHistory.length - 1;
            const updatedHistory = [...prevHistory];
            updatedHistory[lastIndex] = {
              ...updatedHistory[lastIndex],
              response: updatedHistory[lastIndex].response
                ? updatedHistory[lastIndex].response + "\n" + event.data
                : event.data,
            };
            
            // Save updated history with session-specific key
            const currentSessionId = urlSessionId || isid;
            if (currentSessionId) {
              sessionStorage.setItem(
                `chatHistory_${currentSessionId}`,
                JSON.stringify(updatedHistory)
              );
              
              // Update session in SessionManager
              const firstQuery = localStorage.getItem("firstQuery");
              SessionManager.saveSession(currentSessionId, firstQuery, updatedHistory);
            }
            
            return updatedHistory;
          });
        }
      },
      onclose() {
        setLoading(false);
        setStreamingIndex(-1);
      },
      onerror(error) {
        console.error("SSE error:", error);
        setLoading(false);
        setStreamingIndex(-1);
      },
    });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    setLoading(false);
    setStreamingIndex(-1);
  } finally {
    setSearchQuery("");
    setLoading(false);
    setStreamingIndex(-1);
  }
};
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

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
        <div className="relative group mb-4">
          <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg">
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
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded !text-gray-800 dark:!text-gray-200"
          {...props}
        >
          {children}
        </code>
      );
    },
    paragraph({ children }) {
      return (
        <p className="leading-relaxed !text-gray-700 dark:!text-gray-200">
          {children}
        </p>
      );
    },
    h1({ children }) {
      return (
        <h1 className="!text-gray-700 dark:!text-white text-3xl font-bold mt-4 mb-2">
          {children}
        </h1>
      );
    },
    h2({ children }) {
      return (
        <h2 className="!text-gray-700 dark:!text-gray-100 text-2xl font-semibold mt-4 mb-2">
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="!text-gray-700 dark:!text-gray-200 text-xl font-semibold mt-3 mb-1">
          {children}
        </h3>
      );
    },
    li({ children }) {
      return (
        <li className="!text-gray-700 dark:!text-gray-200 ml-4 list-disc">
          {children}
        </li>
      );
    },
    strong({ children }) {
      return (
        <strong className="!text-gray-700 dark:!text-gray-100 font-semibold">
          {children}
        </strong>
      );
    },
    em({ children }) {
      return (
        <em className="!text-gray-700 dark:!text-gray-200 italic">
          {children}
        </em>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 !text-gray-700 dark:!text-gray-200 italic">
          {children}
        </blockquote>
      );
    },
    ul({ children }) {
      return (
        <ul className="list-disc ml-6 my-2 !text-gray-700 dark:!text-gray-200">
          {children}
        </ul>
      );
    },
    ol({ children }) {
      return (
        <ol className="list-decimal ml-6 my-2 !text-gray-700 dark:!text-gray-200">
          {children}
        </ol>
      );
    },
  };

  return (
    <div className="flex h-screen dark:bg-[#121212]">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-x-hidden">
        {/* Mobile Header with Logo - Only visible on mobile */}
        <div className="lg:hidden bg-gray-100 dark:bg-[#1c1c1c] py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <Link to="/">
              <img src={bharatAi} alt="logo" className="h-8" />
            </Link>
          </div>
        </div>

        {/* Pass setSidebarExpanded to Sidebar component */}
        <Sidebar 
          chatHistory={chatHistory} 
          onExpandChange={setSidebarExpanded}
          currentSessionId={urlSessionId} // Pass current session ID to sidebar
        />

        {/* Chat Main Container */}
        <div className="flex flex-col flex-auto h-full lg:pl-3">
          <div className="flex flex-col flex-shrink-0 dark:bg-[#1c1c1c] bg-white flex-1 min-h-0 lg:h-full p-4 lg:p-5 relative">
            {/* Chat Content */}
            <div
              ref={chatContainerRef}
              className="flex flex-col h-full overflow-y-auto overflow-x-hidden custom-scrollbar mb-4"
            >
              {/* Desktop Logo - Only visible on desktop when sidebar is closed */}
              {!sidebarExpanded && (
                <div className="hidden lg:block mb-4">
                  <Link to="/">
                    <img src={bharatAi} alt="logo" className="w-32" />
                  </Link>
                </div>
              )}
              
              <div className="flex w-full max-w-4xl mx-auto flex-col">
                {chatHistory.length === 0 && !urlSessionId && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                      Start a New Conversation
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Ask me anything to begin your chat session
                    </p>
                  </div>
                )}
                
                {chatHistory.map((item, index) => (
                  <div key={index} className="mb-6">
                    {/* User Message */}
                    <div className="mb-6 flex justify-end">
                      <div className="bg-gray-700 text-white rounded-2xl px-4 py-3 max-w-[65%] whitespace-pre-wrap break-words">
                        {item.query}
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="mb-8">
                      <div className="flex flex-row items-start">
                        <div className="mr-3 flex-shrink-0">
                          <div className="ai-logo-container">
                            {streamingIndex === index && (
                              <div className="orb-animation">
                                <div className="orb-inner" />
                                <div className="orb-highlight" />
                              </div>
                            )}
                            <img
                              src={AiLogo}
                              alt="AI Logo"
                              className="w-8 h-8 object-contain rounded-full"
                            />
                          </div>
                        </div>

                        {/* AI Response Content */}
                        <div className="flex-1 max-w-3xl">
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            {streamingIndex === index && !item.response ? (
                              <div className="flex items-center space-x-2 py-2">
                                <span>
                                  <p className="text-gray-900 dark:text-gray-200">
                                    Generating response..
                                  </p>
                                </span>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            ) : (
                              <ReactMarkdown
                                children={item.response}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={renderers}
                              />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 mb-8">
                            <CopyButton
                              handleCopy={() => handleCopy(item.response)}
                              copied={copied}
                            />
                            <ShareButtons item={item} />
                            <LikeDislikeButtons
                              item={item}
                              onLike={(item) => console.log("Liked:", item)}
                              onDislike={(item) => console.log("Disliked:", item)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <NewSearchbar
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;