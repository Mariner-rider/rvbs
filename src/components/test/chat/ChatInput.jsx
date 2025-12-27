import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  ArrowUp,
  Paperclip,
  Globe,
  MessageSquare,
  TrendingUp,
  BookOpen,
  DollarSign,
  Video,
  Zap,
  Check,
  FileText,
  SquarePen,
  Brain,
  EyeOff,
  Wand2,
} from "lucide-react";
import incognitoIcon from "../../../assets/icons/ico.png";
import AdvertisementPopup from "./AdvertisementPopup";
import { AuthContext } from "../../../context/AuthContext";

const ChatInput = ({
  message = "",
  setMessage = () => {},
  handleSubmit = () => {},
  modes = [],
  selectedMode = "Chat",
  setSelectedMode = () => {},
  isDark = false,
  isInitialState = true,
  isBlurred = false,
  onWebSearch = () => {},
  extremeMode = false,
  setExtremeMode = () => {},
  ecognitiveMode = false,
  toggleECognitiveMode = () => {},
}) => {
  const navigate = useNavigate();
  const { userToken, isLoggedIn } = useContext(AuthContext);
  
  const textareaRef = useRef(null);
  const searchInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const modeButtonRef = useRef(null);
  const ecognitiveButtonRef = useRef(null);

  const [showModes, setShowModes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const [showECognitiveTooltip, setShowECognitiveTooltip] = useState(false);
  const [showPromptOptimizerTooltip, setShowPromptOptimizerTooltip] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [optimizingPrompt, setOptimizingPrompt] = useState(false);
  const [showAdsPopup, setShowAdsPopup] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const recognitionRef = useRef(null);
  const adsTimerRef = useRef(null);

  // Auto-close ads after 6 seconds
  useEffect(() => {
    if (showAdsPopup) {
      console.log("Ads popup opened, will close in 6 seconds");
      
      // Clear any existing timer
      if (adsTimerRef.current) {
        clearTimeout(adsTimerRef.current);
      }
      
      // Set new timer for 6 seconds
      adsTimerRef.current = setTimeout(() => {
        console.log("Auto-closing ads popup after 6 seconds");
        setShowAdsPopup(false);
      }, 6000); // 6 seconds = 6000 milliseconds
      
      // Cleanup on unmount or when ads close
      return () => {
        if (adsTimerRef.current) {
          clearTimeout(adsTimerRef.current);
        }
      };
    } else {
      // Clear timer when ads are not showing
      if (adsTimerRef.current) {
        clearTimeout(adsTimerRef.current);
        adsTimerRef.current = null;
      }
    }
  }, [showAdsPopup]);

  // API call function for prompt optimization
  const optimizePromptAPI = async (userQuery) => {
    try {
      // Check authentication
      if (!isLoggedIn || !userToken) {
        setAuthError("Please login to use prompt optimizer");
        alert("Please login to use prompt optimizer");
        return;
      }
      
      setOptimizingPrompt(true);
      setAuthError("");
      
      const response = await fetch('http://127.0.0.1:8000/prompt-optimizer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ query: userQuery })
      });

      const result = await response.json();
      
      if (result.success) {
        // Show ads popup if needed
        if (result.show_ads) {
          console.log("Showing ads popup for 6 seconds");
          setShowAdsPopup(true);
        }
        
        // Set the optimized prompt in the textarea
        setMessage(result.optimized_prompt);
        
        // Auto-scroll textarea to show full content
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
          }
        }, 100);
      } else {
        alert(result.error || 'Failed to optimize prompt');
      }
    } catch (error) {
      console.error('Prompt optimization error:', error);
      
      // Handle specific errors
      if (error.message.includes('401') || error.message.includes('403')) {
        setAuthError("Session expired. Please login again.");
        alert("Your session has expired. Please login again.");
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setOptimizingPrompt(false);
    }
  };

  // Handle prompt optimizer button click
  const handlePromptOptimizerClick = () => {
    if (!isLoggedIn) {
      alert("Please login to use prompt optimizer");
      return;
    }
    
    if (!message.trim()) {
      alert('Please enter a prompt to optimize');
      return;
    }
    
    optimizePromptAPI(message);
  };

  // Handle ads popup close
  const handleCloseAdsPopup = () => {
    console.log("Manually closing ads popup");
    setShowAdsPopup(false);
    
    // Clear the timer if manually closed
    if (adsTimerRef.current) {
      clearTimeout(adsTimerRef.current);
      adsTimerRef.current = null;
    }
  };

  // Check authentication status for button
  useEffect(() => {
    if (!isLoggedIn && optimizingPrompt) {
      setOptimizingPrompt(false);
      setAuthError("Please login to continue");
    }
  }, [isLoggedIn, optimizingPrompt]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        modeButtonRef.current &&
        !modeButtonRef.current.contains(event.target) &&
        ecognitiveButtonRef.current &&
        !ecognitiveButtonRef.current.contains(event.target)
      ) {
        setShowModes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showModes && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showModes]);

  useEffect(() => {
    if (showModes && modeButtonRef.current) {
      const rect = modeButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownAbove(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [showModes, message]);

  useEffect(() => {
    if (extremeMode || ecognitiveMode) {
      setShowModes(false);
    }
  }, [extremeMode, ecognitiveMode]);

  const searchModes = [
    // { name: "Web", icon: Globe, description: "Search across the Internet powered by Exa AI", route: "/test/chat/WebSearch" },
    { name: "X", icon: () => <span className="font-bold text-xs">𝕏</span>, description: "Search X posts" },
    { name: "Writer", icon: SquarePen, description: "Unleash your creativity, one word at a time", route: "/test/chat/Rytelayout" },
    { name: "PDF", icon: FileText, description: "Discuss and collaborate on PDF documents easily", route: "/test/chat/Aichat" },
    { name: "Stocks", icon: TrendingUp, description: "Stock and currency information" },
    { name: "Reddit", icon: () => <span className="font-bold text-orange-500 text-xs">R</span>, description: "Search Reddit posts" },
    { name: "Academic", icon: BookOpen, description: "Search academic papers powered by Exa" },
    { name: "Chat", icon: MessageSquare, description: "Talk to the model directly." },
    { name: "Crypto", icon: DollarSign, description: "Cryptocurrency research powered by CoinGecko" },
    { name: "YouTube", icon: Video, description: "Search YouTube videos powered by Exa" },
  ];

  const filteredModes = searchModes.filter((mode) =>
    mode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageToSend = message.trim();
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      if (selectedMode === "Web") {
        onWebSearch(messageToSend, selectedMode, extremeMode, ecognitiveMode);
      } else {
        handleSubmit(e, extremeMode, ecognitiveMode);
      }
    }
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
        setMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };
    }

    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const handleModeSelect = (mode) => {
    if (mode.route) {
      navigate(mode.route);
    } else {
      setSelectedMode(mode.name);
    }
    setShowModes(false);
    setSearchTerm("");
  };

  const getPlaceholder = () => {
    if (ecognitiveMode) {
      return "Incognito mode";
    } else if (extremeMode) {
      return "Search in extreme mode";
    } else if (selectedMode === "Web") {
      return "Search the web...";
    } else {
      return `Search ${selectedMode.toLowerCase()}...`;
    }
  };

  const placeholder = getPlaceholder();

  const containerClass = `relative w-full ${isDark ? "bg-[#1e1e1e] border-gray-600" : "bg-gray-50 border-gray-300"
    } rounded-2xl border transition-colors ${isBlurred ? "blur-sm pointer-events-none" : ""
    }`;

  const textareaClass = `w-full bg-transparent ${isDark ? "text-white placeholder-gray-400" : "text-black placeholder-gray-500"
    } pl-4 pt-4 pb-16 pr-4 text-sm rounded-2xl focus:outline-none resize-none overflow-y-auto min-h-[60px] max-h-[200px]`;

  // Get button disabled state
  const isOptimizerDisabled = !message.trim() || optimizingPrompt || isBlurred || !isLoggedIn;
  
  // Get tooltip text based on state
  // const getOptimizerTooltipText = () => {
  //   if (!isLoggedIn) {
  //     return "Login to use prompt optimizer";
  //   }
  //   if (!message.trim()) {
  //     return "Enter a prompt to optimize";
  //   }
  //   if (optimizingPrompt) {
  //     return "Optimizing...";
  //   }
  //   return "Optimize this prompt";
  // };  

  // Get button style based on state
  const getOptimizerButtonStyle = () => {
    if (optimizingPrompt) {
      return isDark
        ? "bg-black border-white text-white animate-pulse"
        : "bg-black border-white text-white animate-pulse";
    }
    if (isOptimizerDisabled) {
      return isDark
        ? "bg-[#2c2c2c] border-gray-600 text-gray-500 cursor-not-allowed opacity-50"
        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-50";
    }
    return isDark
      ? "bg-[#2c2c2c] hover:bg-[#3a3a3a] text-white border-gray-600 hover:text-white"
      : "bg-gray-100 hover:bg-gray-200 text-black border-gray-300 hover:text-black";
  };

  return (
    <div className="w-full">
      {/* Ads Popup - Will auto-close after 6 seconds */}
      <AdvertisementPopup 
        showPopup={showAdsPopup} 
        onClose={handleCloseAdsPopup} 
      />
      
      <div className={containerClass}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          className={textareaClass}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleFormSubmit(e);
            }
          }}
          disabled={isBlurred}
        />

        <div className={`absolute bottom-1.5 left-4 right-4 flex items-center justify-between space-x-2  ${isDark ?"bg-[#1e1e1e]":"bg-gray-50"}`}>
          <div className="flex items-center space-x-2">
            {/* Modes Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <div
                className={`flex items-center h-8 rounded-full border shadow-sm transition ${isDark
                  ? "bg-[#2c2c2c] hover:bg-[#3a3a3a] text-gray-200 border-gray-600"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                  }`}
              >
                <button
                  ref={modeButtonRef}
                  type="button"
                  onClick={() => {
                    if (extremeMode || ecognitiveMode) {
                      setExtremeMode(false);
                    } else {
                      setShowModes((prev) => !prev);
                    }
                  }}
                  className={`ml-[2.5px] flex items-center justify-center px-3 py-[5px] rounded-full transition ${extremeMode || ecognitiveMode
                    ? "opacity-50 cursor-pointer"
                    : showModes || searchModes.some(m => m.name === selectedMode)
                      ? isDark ? "bg-[#3a3a3a]" : "bg-gray-300"
                      : isDark
                        ? "hover:bg-[#3a3a3a] text-gray-200"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  disabled={extremeMode || ecognitiveMode}
                >
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const selected =
                        modes.find((m) => m.name === selectedMode) ||
                        searchModes.find((m) => m.name === selectedMode);
                      const Icon = selected?.icon;
                      return Icon && <Icon size={14} />;
                    })()}
                    {!extremeMode && !ecognitiveMode && (
                      <div className="flex flex-col items-center justify-center ml-1">
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
                    )}
                  </div>
                </button>

                {/* Extreme Mode Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (showModes) {
                      setShowModes(false);
                    }
                    setExtremeMode((prev) => !prev);
                  }}
                  className={`mr-[2.5px] flex items-center justify-center px-4 py-[6px] rounded-full transition ${showModes
                    ? "opacity-50 cursor-pointer"
                    : extremeMode
                      ? isDark ? "bg-[#3a3a3a] text-yellow-400" : "bg-gray-300 text-yellow-600"
                      : isDark
                        ? "hover:bg-[#3a3a3a] text-gray-200"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  disabled={ecognitiveMode}
                >
                  <Zap size={14} />
                </button>
              </div>

              {showModes && !extremeMode && !ecognitiveMode && (
                <div
                  className={`absolute z-50 mt-1 rounded-2xl shadow-lg w-64 overflow-hidden border ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  style={{
                    top: dropdownAbove ? "auto" : "100%",
                    bottom: dropdownAbove ? "100%" : "auto",
                    marginTop: dropdownAbove ? "0" : "5px",
                    marginBottom: dropdownAbove ? "5px" : "0",
                  }}
                >
                  <div
                    className={`px-3 py-2 border-b ${isDark ? "border-gray-700" : "border-gray-200"
                      }`}
                  >
                    <div className="relative">
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

                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search modes..."
                        className={`w-full pl-10 pr-3 py-1 text-xs ${isDark ? "text-gray-200 " : "text-gray-800 "
                          }`}
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    <h3
                      className={`text-xs font-medium px-3 py-1.5 ${isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                      Search Mode
                    </h3>

                    {filteredModes.map((mode) => {
                      const Icon = mode.icon;
                      const isSelected = selectedMode === mode.name;
                      return (
                        <button
                          key={mode.name}
                          type="button"
                          onClick={() => handleModeSelect(mode)}
                          className={`flex items-start space-x-2.5 w-full px-3 py-2 text-left transition-colors rounded-3xl ${isDark
                            ? "hover:bg-gray-800 text-gray-200"
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
                                <Check
                                  size={14}
                                  className="text-blue-500 flex-shrink-0"
                                />
                              )}
                            </div>
                            <div
                              className={`text-xs mt-0.5 leading-tight ${isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
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

            {/* eCognitive Mode Button */}
            <div className="relative" ref={ecognitiveButtonRef}>
              <button
                type="button"
                onClick={toggleECognitiveMode}
                onMouseEnter={() => setShowECognitiveTooltip(true)}
                onMouseLeave={() => setShowECognitiveTooltip(false)}
                className={`flex items-center justify-center h-8 w-8 rounded-full border shadow-sm transition ${ecognitiveMode
                  ? isDark
                    ? "bg-indigo-400 border-indigo-400 text-white"
                    : "bg-indigo-400 border-indigo-400 text-white"
                  : isDark
                    ? "bg-[#2c2c2c] hover:bg-[#3a3a3a] text-gray-200 border-gray-600"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                  }`}
              >
                <img
                  src={incognitoIcon}
                  alt="Incognito"
                  className={`w-8 h-8 ${ecognitiveMode ? "invert" : ""}`}
                  style={{
                    filter: isDark && !ecognitiveMode ? "invert(1)" : "none"
                  }}
                />
              </button>

              {/* Tooltip */}
              {showECognitiveTooltip && (
                <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 ${isDark
                  ? "bg-gray-800 text-gray-200 border border-gray-700"
                  : "bg-white text-gray-800 border border-gray-300 shadow-lg"
                  }`}>
                  {ecognitiveMode ? "Incognito Mode: On" : "Incognito Mode: Fast"}
                </div>
              )}
            </div>

            {/* Prompt Optimizer Button */}
            <div className="relative">
              <button
                type="button"
                onClick={handlePromptOptimizerClick}
                onMouseEnter={() => setShowPromptOptimizerTooltip(true)}
                onMouseLeave={() => setShowPromptOptimizerTooltip(false)}
                disabled={isOptimizerDisabled}
                className={`flex items-center justify-center h-8 w-8 rounded-full border shadow-sm transition ${getOptimizerButtonStyle()}`}
              >
                {optimizingPrompt ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Wand2 size={16} />
                )}
              </button>

              {/* Tooltip for Prompt Optimizer */}
              {/* {showPromptOptimizerTooltip && (
                <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 ${isDark
                  ? "bg-gray-800 text-gray-200 border border-gray-700"
                  : "bg-white text-gray-800 border border-gray-300 shadow-lg"
                  }`}>
                  {getOptimizerTooltipText()}
                </div>
              )} */}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {!ecognitiveMode && (
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
            )}

            {!ecognitiveMode && !extremeMode &&(
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isBlurred}
                className={`p-2 rounded-full ${isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
              >
                <Paperclip size={16} />
              </button>
            )}

            {message.trim() === "" || isRecording ? (
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isBlurred}
                className={`p-2 rounded-full ${isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
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
            ) : (
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={isBlurred}
                className={`p-2 rounded-full ${isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                <ArrowUp
                  size={18}
                  className={isDark ? "text-white" : "text-black"}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      
    
      
      <style>{`
        .overflow-y-auto {
          overflow-y: auto;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-button {
          display: none;
        }

        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;