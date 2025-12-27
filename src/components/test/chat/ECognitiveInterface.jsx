import React, { useState, useRef, useEffect, useContext } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js";
import AdvertisementPopup from "./AdvertisementPopup";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ProfileMenu from "./ProfileMenu";

import { AuthContext } from "../../../context/AuthContext";

const ECognitiveInterface = ({
    isDark,
    onBack,
    onThemeChange,
    userToken,
    setShowLoginPopup,
    modes = []
}) => {
    const [message, setMessage] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentResponse, setCurrentResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [showAdPopup, setShowAdPopup] = useState(false);
    const [error, setError] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const responseEndRef = useRef(null);
    const { user } = useContext(AuthContext);

    // Auto-scroll to response
    useEffect(() => {
        if (responseEndRef.current) {
            responseEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentResponse]);

    // Handle form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        if (!userToken) {
            setShowLoginPopup(true);
            return;
        }

        const userMessage = message.trim();
        setCurrentQuestion(userMessage);
        setCurrentResponse("");
        setIsLoading(true);
        setIsStreaming(true);
        setError("");
        setMessage("");

        try {
            const url = `http://127.0.0.1:8000/agentic-chat/?text=${encodeURIComponent(userMessage)}&mode=ecognitive&closed=false`;

            await fetchEventSource(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: "text/event-stream",
                },
                withCredentials: true,

                async onopen(response) {
                    console.log("SSE Connection opened:", response.status);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                },

                onmessage(event) {
                    console.log("SSE Data received:", event.data.substring(0, 100));

                    // Handle clear previous
                    if (event.data === "[CLEAR_PREVIOUS]") {
                        // Already handled by setting currentResponse to ""
                    }
                    // Handle show ad
                    else if (event.data === "[SHOW_AD]") {
                        setShowAdPopup(true);
                    }
                    // Handle close ad
                    else if (event.data === "[CLOSE_AD]") {
                        setShowAdPopup(false);
                    }
                    // Handle question display
                    else if (event.data.startsWith("[QUESTION]")) {
                        // Already have the question
                    }
                    // Handle start answer
                    else if (event.data === "[START_ANSWER]") {
                        // Start of answer
                    }
                    // Handle end answer
                    else if (event.data === "[END_ANSWER]") {
                        setIsStreaming(false);
                    }
                    // Handle errors
                    else if (event.data.startsWith("[ERROR]")) {
                        const errorMsg = event.data.replace("[ERROR]", "").trim();
                        setError(errorMsg);
                        setIsLoading(false);
                        setIsStreaming(false);
                    }
                    // Handle newlines and tabs
                    else if (event.data === "[NEWLINE]") {
                        setCurrentResponse(prev => prev + '\n');
                    }
                    else if (event.data === "[TAB]") {
                        setCurrentResponse(prev => prev + '\t');
                    }
                    // Handle regular text
                    else if (event.data !== "[CLEAR_PREVIOUS]" &&
                        !event.data.startsWith("session_id:") &&
                        event.data !== "[SHOW_AD]" &&
                        event.data !== "[CLOSE_AD]" &&
                        !event.data.startsWith("[QUESTION]") &&
                        event.data !== "[START_ANSWER]" &&
                        event.data !== "[END_ANSWER]" &&
                        !event.data.startsWith("[ERROR]")) {

                        // Remove formatting logic temporarily
                        // const filteredData = event.data.trim();
                        // if (filteredData || event.data === ' ') {
                        setCurrentResponse(prev => prev + event.data);
                        // }
                    }
                },

                onclose() {
                    console.log("SSE Connection closed");
                    setIsLoading(false);
                    setShowAdPopup(false);
                },

                onerror(error) {
                    console.error("eCognitive error:", error);
                    setError("Sorry, there was an error. Please try again.");
                    setIsLoading(false);
                    setIsStreaming(false);
                    setShowAdPopup(false);
                },
            });
        } catch (error) {
            console.error("Error in eCognitive:", error);
            setError("Failed to connect. Please check your connection.");
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    const ThinkingDots = () => (
        <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
    );

    // Markdown renderers 
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
    };

    const isInitialState = !currentQuestion && !currentResponse;

    return (
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
      `}</style>

            {/* Header - with Back button */}
            <div className="fixed top-0 left-0 w-full z-20">
                <ChatHeader
                    isDark={isDark}
                    onHistoryClick={() => { }}
                    onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
                    onBack={onBack}
                    showBackButton={true}
                    title="eCognitive Mode"
                    subtitle="Fast, no-history chat"
                    isECognitiveMode={true}
                />
            </div>

            <AdvertisementPopup
                showPopup={showAdPopup}
                onClose={() => setShowAdPopup(false)}
            />

            {/* ADD PROFILE MENU HERE */}
            {showProfileMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setShowProfileMenu(false)}
                    />

                    {/* Profile Menu Component */}
                    <div className="fixed top-16 right-4 z-40">
                        <ProfileMenu
                            isDark={isDark}
                            theme={isDark ? "dark" : "light"}
                            onThemeChange={onThemeChange}
                            onClose={() => setShowProfileMenu(false)}
                            user={user}
                            isAuthenticated={!!userToken}
                            archivedChats={[]}
                            onRestoreChat={() => { }}
                            onDeleteArchivedChat={() => { }}
                            onSelectArchivedChat={() => { }}
                            onOpenSettings={() => { }}
                        />
                    </div>
                </>
            )}

            <main className={`flex-1 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-0`}>
                <div className="w-full max-w-4xl flex flex-col h-full">
                    {isInitialState ? (
                        <div className="flex flex-col items-center justify-center space-y-8 h-full">
                            <h1
                                className={`text-4xl font-light ${isDark ? "text-white" : "text-black"
                                    } tracking-wide`}
                            >
                                BharatAI
                            </h1>
                            
                            {/* ChatInput - Center में (Initial State में) */}
                            <div className="w-full max-w-2xl">
                                <ChatInput
                                    message={message}
                                    setMessage={setMessage}
                                    handleSubmit={(e) => {
                                        if (!userToken) {
                                            setShowLoginPopup(true);
                                        } else {
                                            handleSubmit(e);
                                        }
                                    }}
                                    modes={modes}
                                    selectedMode="Chat"
                                    setSelectedMode={() => { }}
                                    isDark={isDark}
                                    isInitialState={isInitialState}
                                    isBlurred={false}
                                    loading={isLoading}
                                    onWebSearch={() => { }}
                                    extremeMode={false}
                                    setExtremeMode={() => { }}
                                    ecognitiveMode={true}
                                    toggleECognitiveMode={onBack}
                                />
                                <div className="text-center mt-3 px-4">
                                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                        BharatAi may not always be accurate. Always verify crucial details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto scrollbar-custom pb-40 pt-16">
                                <div className="max-w-4xl mx-auto w-[94%] py-6 px-4 sm:px-6 md:px-8 lg:px-[90px] space-y-8">
                                    {/* User Question */}
                                    {currentQuestion && (
                                        <div className="space-y-3">
                                            <div className={`mb-1 h-full w-fulls ${isDark ? "bg-gray-700" : "bg-indigo-200"
                                                } rounded-2xl py-2 px-3`}>
                                                <h2
                                                    className={`text-lm font-normal ${isDark ? "text-white" : "text-black"
                                                        } mb-0  text-justify`}
                                                >
                                                    {currentQuestion}
                                                </h2>
                                            </div>

                                            {/* AI Response */}
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
                                                {isLoading && !currentResponse && (
                                                    <div className="ml-11 mb-4">
                                                        <ThinkingDots />
                                                    </div>
                                                )}

                                                {/* Response Content */}
                                                <div className="mb-12">
                                                    {isLoading && !currentResponse ? (
                                                        <div className="flex items-center space-x-2 py-2">
                                                            {/* Thinking text removed as per ChatInterface */}
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6">
                                                            {/* MAIN ANSWER SECTION */}
                                                            <div
                                                                className={`${isDark ? "text-gray-300" : "text-gray-700"
                                                                    } text-ls leading-relaxed animate-fadeIn px-3.5`}
                                                            >
                                                                <div className={`prose prose-gray ${isDark ? "prose-invert" : ""} max-w-none`}>
                                                                    <ReactMarkdown
                                                                        children={currentResponse + (isStreaming ? '|' : '')}
                                                                        remarkPlugins={[remarkGfm]}
                                                                        rehypePlugins={[rehypeRaw]}
                                                                        components={renderers}
                                                                    />
                                                                </div>
                                                                {/* Typewriter cursor */}
                                                                {isStreaming && (
                                                                    <span className="typewriter-cursor"></span>
                                                                )}
                                                            </div>

                                                            {/* Error Message */}
                                                            {error && (
                                                                <div className={`mt-4 p-3 rounded-lg ${isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"}`}>
                                                                    {error}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={responseEndRef}></div>
                                </div>
                            </div>

                            {/* ChatInput - Bottom में Fixed (जब response आया हो) */}
                            <div
                                className={`fixed bottom-0 left-0 w-full z-10`}
                                style={{
                                    background: isDark ? "#000" : "radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.6) 100%), linear-gradient(to right, #e2eef6 0%, #d3def8 45%, #c8d3f8 65%, #dcd6f7 85%, #f1eef6 100%)",
                                }}
                            >
                                <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-0 pb-4 w-full">
                                    <ChatInput
                                        message={message}
                                        setMessage={setMessage}
                                        handleSubmit={(e) => {
                                            if (!userToken) {
                                                setShowLoginPopup(true);
                                            } else {
                                                handleSubmit(e);
                                            }
                                        }}
                                        modes={modes}
                                        selectedMode="Chat"
                                        setSelectedMode={() => { }}
                                        isDark={isDark}
                                        isInitialState={isInitialState}
                                        isBlurred={false}
                                        loading={isLoading}
                                        onWebSearch={() => { }}
                                        extremeMode={false}
                                        setExtremeMode={() => { }}
                                        ecognitiveMode={true}
                                        toggleECognitiveMode={onBack}
                                    />
                                    <div className="text-center mt-3 px-4">
                                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                            BharatAi may not always be accurate. Always verify crucial details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ECognitiveInterface;