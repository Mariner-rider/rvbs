import { createContext, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AiSideBar from "../AiSideBar";
import AiSideBar2 from "../../Ryte/AsideBar2";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import bharatAi from '/src/assets/images/bharatai2.png';

const SidebarContext = createContext();

export default function Sidebar({ children, chatHistory, onExpandChange, currentSessionId }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Notify parent component about sidebar state changes
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(expanded);
    }
  }, [expanded, onExpandChange]);
  
  // Function to handle chat history item click
  const handleChatItemClick = (sessionId) => {
    // Navigate to the chat component with the session ID
    navigate(`/chat/${sessionId}`);
  };

  // Function to start a new chat
  const handleNewChat = () => {
    // Navigate to fresh chat page
    navigate('/chat');
  };
  
  return (
    <>
      <aside className="h-screen relative">
        <nav className="h-full flex flex-col bg-white dark:bg-inherit">
          {/* Header with toggle button and logo */}
          <div className="p-2 sm:p-4 pb-2 pr-1 flex items-center justify-start gap-2 sm:gap-4 min-h-[60px] flex-shrink-0">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 z-50 rounded-lg border dark:border-white bg-gray-300 dark:bg-[#121212] hover:bg-gray-400 dark:hover:bg-[#333333] text-black dark:text-white flex-shrink-0 transition-colors duration-200"
            >
              {expanded ? <GoSidebarExpand size={18} /> : <GoSidebarCollapse size={18} />}
            </button>
            
            {/* Logo container with proper mobile handling */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${
              expanded 
                ? "opacity-100 max-w-[140px] sm:max-w-[160px]" 
                : "opacity-0 max-w-0 overflow-hidden"
            }`}>
              <Link to="/" className="block w-full">
                <img 
                  src={bharatAi} 
                  alt="BharatAi Logo" 
                  className="w-full h-auto max-w-[120px] sm:max-w-[140px] object-contain"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <div className="flex-1 overflow-hidden">
              <ul className="px-2">{children}</ul>
            </div>
          </SidebarContext.Provider>

          <div className="absolute lg:static overflow-hidden z-20">
            <div
              className={`overflow-hidden transition-all ${
                expanded ? " lg:w-[16.5rem] " : "w-0"
              }`}
            >
              <AiSideBar 
                chatHistory={chatHistory}
                currentSessionId={currentSessionId}
                onChatItemClick={handleChatItemClick}
                onNewChat={handleNewChat}
              />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function Sidebar2({ children, chatHistory }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
     <aside className="h-screen relative">
        <nav className="h-full flex flex-col bg-white dark:bg-inherit">
          {/* Header with toggle button and logo */}
          <div className="p-2 sm:p-4 pb-2 pr-1 flex items-center justify-start gap-2 sm:gap-4 min-h-[60px] flex-shrink-0">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 z-50 rounded-lg bg-slate-400 dark:bg-orange-600 hover:bg-slate-500 dark:hover:bg-orange-700 flex-shrink-0 transition-colors duration-200"
            >
              {expanded ? <GoSidebarExpand size={18} /> : <GoSidebarCollapse size={18} />}
            </button>
            
            {/* Logo container with proper mobile handling */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${
              expanded 
                ? "opacity-100 max-w-[120px] sm:max-w-[140px]" 
                : "opacity-0 max-w-0 overflow-hidden"
            }`}>
              <Link to="/" className="block w-full">
                <img 
                  src={bharatAi} 
                  alt="BharatAi Logo" 
                  className="w-full h-auto max-w-[100px] sm:max-w-[120px] object-contain"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <div className="flex-1 overflow-hidden">
              <ul className="px-2">{children}</ul>
            </div>
          </SidebarContext.Provider>

          <div className="absolute lg:static overflow-hidden z-20">
            <div
              className={`overflow-hidden transition-all ${
                expanded ? " lg:w-[16.5rem] " : "w-0"
              }`}
            >
              <AiSideBar2 />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span
        className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
          expanded ? "w-full ml-3 opacity-100" : "w-0 ml-0 opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 flex-shrink-0 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip for collapsed state */}
      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50 pointer-events-none"
        >
          {text}
        </div>
      )}
    </li>
  );
}