// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Clock,
//   Share2,
//   ExternalLink,
//   MoreHorizontal,
//   ChevronDown,
//   ArrowLeft,
//   Filter,
//   Search,
//   Globe,
//   Sparkles,
//   Mic,
//   Menu,
//   Loader2,
// } from "lucide-react";
// import ChatHeader from "./ChatHeader";
// import ProfileMenu from "./ProfileMenu";
// import Settings from "./Settings";
// import ChatHistoryModal from "./ChatHistoryModal";
// import SearchModal from "./SearchModal";

// const WebSearchResponse = ({
//   query,
//   searchMode,
//   isDark,
//   results = [],
//   onBack,
//   onSearch,
//   // Header and sidebar props
//   showProfileMenu,
//   setShowProfileMenu,
//   theme,
//   handleThemeChange,
//   user,
//   isAuthenticated,
//   archivedChats,
//   handleRestoreChat,
//   handleDeleteArchivedChat,
//   handleSelectArchivedChat,
//   showSettings,
//   setShowSettings,
//   chatHistory,
//   currentChatId,
//   handleShareChat,
//   handleShareModalOpen,
//   handleShareModalClose,
//   showShareModal,
//   handleArchiveChatFromShare,
//   onHistoryClick,
// }) => {
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState(query || "");
//   const [selectedMode, setSelectedMode] = useState(
//     searchMode || "Traditional Search"
//   );
//   const [isListening, setIsListening] = useState(false);
//   const [showHistoryCard, setShowHistoryCard] = useState(false);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [loadMoreResults, setLoadMoreResults] = useState([]);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [hasMoreResults, setHasMoreResults] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Simulate initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsInitialLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const filters = ["All", "News", "Images", "Videos", "Local", "Shopping"];

//   // Use provided results or fall back to mock data
//   const displayResults =
//     results.length > 0
//       ? results
//       : [
//           {
//             id: 1,
//             type: "sponsored",
//             favicon: "📰",
//             domain: "www.thehindu.com",
//             tag: "Sponsored",
//             timestamp: "2 hours ago",
//             title: `Latest news about "${query}" - Breaking Updates`,
//             description: `Recent developments and updates related to ${query}. Stay informed with the latest news coverage from trusted sources across India and the world.`,
//             url: "https://www.thehindu.com",
//           },
//           {
//             id: 2,
//             type: "sponsored",
//             favicon: "🇮🇳",
//             domain: "www.india.gov.in",
//             tag: "Sponsored",
//             timestamp: null,
//             title: `Complete Guide to ${query} - Official Information`,
//             description: `Comprehensive and authoritative information about ${query}. Get accurate details from government sources and verified information portals.`,
//             url: "https://www.india.gov.in",
//           },
//           {
//             id: 3,
//             type: "news",
//             favicon: "📰",
//             domain: "indianexpress.com",
//             tag: "News",
//             timestamp: "1 day ago",
//             title: `${query} Analysis and Expert Opinion`,
//             description: `In-depth analysis and expert perspectives on ${query}. Understand the implications and get detailed insights from industry specialists.`,
//             url: "https://indianexpress.com",
//           },
//         ];

//   // Generate additional results for infinite scroll
//   const generateAdditionalResults = (page) => {
//     const baseResults = [
//       {
//         type: "web",
//         favicon: "🔍",
//         domain: "www.wikipedia.org",
//         tag: "Web",
//         timestamp: null,
//         title: `${query} - Wikipedia`,
//         description: `Detailed encyclopedia entry about ${query}. Get comprehensive background information and historical context from the world's largest online encyclopedia.`,
//         url: "https://www.wikipedia.org",
//       },
//       {
//         type: "news",
//         favicon: "📺",
//         domain: "www.ndtv.com",
//         tag: "News",
//         timestamp: "3 hours ago",
//         title: `${query} - Video Coverage and Updates`,
//         description: `Watch the latest video reports and live coverage about ${query}. Get real-time updates and expert commentary from NDTV's news team.`,
//         url: "https://www.ndtv.com",
//       },
//       {
//         type: "web",
//         favicon: "💼",
//         domain: "www.business-standard.com",
//         tag: "Business",
//         timestamp: "5 hours ago",
//         title: `${query} - Business Impact and Market Analysis`,
//         description: `Understand the business implications of ${query}. Get market analysis, financial insights, and economic perspectives from industry experts.`,
//         url: "https://www.business-standard.com",
//       },
//       {
//         type: "web",
//         favicon: "📚",
//         domain: "www.researchgate.net",
//         tag: "Academic",
//         timestamp: "1 day ago",
//         title: `${query} - Research Papers and Studies`,
//         description: `Academic research and scientific studies related to ${query}. Access peer-reviewed papers and scholarly articles from leading researchers.`,
//         url: "https://www.researchgate.net",
//       },
//       {
//         type: "news",
//         favicon: "🌐",
//         domain: "www.bbc.com",
//         tag: "International",
//         timestamp: "6 hours ago",
//         title: `${query} - Global Perspective and Analysis`,
//         description: `International coverage and global analysis of ${query}. Get worldwide perspectives and cross-cultural insights from BBC's international team.`,
//         url: "https://www.bbc.com",
//       },
//       {
//         type: "web",
//         favicon: "🏢",
//         domain: "www.linkedin.com",
//         tag: "Professional",
//         timestamp: "4 hours ago",
//         title: `${query} - Professional Insights and Career Impact`,
//         description: `Professional insights and career implications related to ${query}. Connect with industry professionals and explore career opportunities.`,
//         url: "https://www.linkedin.com",
//       },
//     ];

//     return baseResults.map((result, index) => ({
//       ...result,
//       id: page * 10 + index + 10, // Generate unique IDs
//       title: `${result.title} - Page ${page}`,
//     })).slice(0, 3); // Return 3 results per page
//   };

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     if (isLoadingMore || !hasMoreResults) return;

//     const scrollTop = document.documentElement.scrollTop;
//     const scrollHeight = document.documentElement.scrollHeight;
//     const clientHeight = document.documentElement.clientHeight;

//     // Trigger loading when user is 300px from bottom
//     if (scrollTop + clientHeight >= scrollHeight - 300) {
//       setIsLoadingMore(true);
      
//       // Simulate API call delay
//       setTimeout(() => {
//         const newResults = generateAdditionalResults(currentPage + 1);
//         setLoadMoreResults(prev => [...prev, ...newResults]);
//         setCurrentPage(prev => prev + 1);
//         setIsLoadingMore(false);
        
//         // Stop loading more after 5 pages (simulate finite results)
//         if (currentPage >= 5) {
//           setHasMoreResults(false);
//         }
//       }, 1500);
//     }
//   }, [isLoadingMore, hasMoreResults, currentPage]);

//   // Attach scroll listener
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   const knowledgePanel = {
//     title: "Search Results",
//     subtitle: `About "${query}"`,
//     tabs: ["Info", "Related", "More", "Sources"],
//     activeTab: "Info",
//     description: `Search results for "${query}" in ${searchMode} mode. These results are curated to provide comprehensive information from reliable sources across the web.`,
//     details: [
//       { label: "Search Mode", value: searchMode },
//       { label: "Results Found", value: "125,000" },
//       { label: "Query", value: query },
//     ],
//     source: "BharatAi Search",
//     moreLink: "See more results",
//   };

//   const handleNewSearch = () => {
//     if (searchQuery.trim() && onSearch) {
//       setIsInitialLoading(true);
//       setLoadMoreResults([]);
//       setCurrentPage(1);
//       setHasMoreResults(true);
//       setTimeout(() => setIsInitialLoading(false), 2000);
//       onSearch(searchQuery, selectedMode);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleNewSearch();
//     }
//   };

//   const handleVoiceSearch = () => {
//     setIsListening(!isListening);
//     // Voice search implementation would go here
//   };

//   const handleQuickSearch = (suggestion) => {
//     setSearchQuery(suggestion);
//     if (onSearch) {
//       setIsInitialLoading(true);
//       setLoadMoreResults([]);
//       setCurrentPage(1);
//       setHasMoreResults(true);
//       setTimeout(() => setIsInitialLoading(false), 2000);
//       onSearch(suggestion, selectedMode);
//     }
//   };

//   // Chat history handlers
//   const handleSelectChat = (chat) => {
//     setShowHistoryCard(false);
//   };

//   const handleDeleteChat = (chatId) => {
//     console.log("Deleted chat:", chatId);
//   };

//   const handleArchiveChat = (chatId) => {
//     console.log("Archived chat:", chatId);
//   };

//   const handleRenameChat = (chatId, newTitle) => {
//     console.log("Rename chat:", chatId, newTitle);
//   };

//   const startNewChat = () => {
//     setShowHistoryCard(false);
//   };

//   const handleOpenArchivedChats = () => {
//     setShowSettings(true);
//   };

//   const ResultCard = ({ result, index }) => {
//     const isSponsored = result.type === "sponsored";
    
//     return (
//       <div
//         className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
//           isSponsored
//             ? isDark
//               ? "bg-yellow-900/20 border-yellow-600/30 hover:bg-yellow-900/30"
//               : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
//             : isDark
//             ? "bg-black border-gray-700 hover:bg-gray-800/70"
//             : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
//         }`}
//       >
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center space-x-2 flex-1 min-w-0">
//             <span className="text-sm">{result.favicon}</span>
//             <span
//               className={`text-sm truncate ${
//                 isDark ? "text-gray-400" : "text-gray-600"
//               }`}
//             >
//               {result.domain}
//             </span>
//             {result.tag && (
//               <span
//                 className={`px-2 py-1 text-xs rounded-full ${
//                   isSponsored
//                     ? "bg-yellow-100 text-yellow-800"
//                     : result.type === "news"
//                     ? "bg-blue-100 text-blue-800"
//                     : result.type === "business"
//                     ? "bg-green-100 text-green-800"
//                     : result.type === "academic"
//                     ? "bg-purple-100 text-purple-800"
//                     : result.type === "professional"
//                     ? "bg-indigo-100 text-indigo-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {result.tag}
//               </span>
//             )}
//             {result.timestamp && (
//               <div className="flex items-center space-x-1 text-gray-500">
//                 <Clock size={12} />
//                 <span className="text-xs">{result.timestamp}</span>
//               </div>
//             )}
//           </div>
//           <button
//             className={`p-1 rounded hover:${
//               isDark ? "bg-gray-700" : "bg-gray-100"
//             } transition-colors`}
//           >
//             <MoreHorizontal
//               size={16}
//               className={isDark ? "text-gray-400" : "text-gray-600"}
//             />
//           </button>
//         </div>

//         <h3
//           className={`text-lg font-medium mb-2 line-clamp-2 ${
//             isDark
//               ? "text-blue-300 hover:text-blue-200"
//               : "text-blue-600 hover:text-blue-500"
//           } cursor-pointer transition-colors`}
//         >
//           {result.title}
//         </h3>

//         <p
//           className={`text-sm leading-relaxed line-clamp-3 ${
//             isDark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           {result.description}
//         </p>

//         <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/50">
//           <a
//             href={result.url}
//             className={`flex items-center space-x-1 text-sm hover:underline ${
//               isDark
//                 ? "text-gray-400 hover:text-gray-300"
//                 : "text-gray-600 hover:text-gray-700"
//             }`}
//           >
//             <ExternalLink size={14} />
//             <span>Visit</span>
//           </a>
//           <button
//             className={`flex items-center space-x-1 text-sm hover:underline ${
//               isDark
//                 ? "text-gray-400 hover:text-gray-300"
//                 : "text-gray-600 hover:text-gray-700"
//             }`}
//           >
//             <Share2 size={14} />
//             <span>Share</span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const KnowledgePanel = ({ data }) => (
//     <div
//       className={`sticky top-24 rounded-lg border p-6 ${
//         isDark
//           ? "bg-gray-800/60 border-gray-700 backdrop-blur-sm"
//           : "bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
//       }`}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <h2
//             className={`text-xl font-semibold mb-1 ${
//               isDark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             {data.title}
//           </h2>
//           <p
//             className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
//           >
//             {data.subtitle}
//           </p>
//         </div>
//         <button
//           className={`p-1 rounded hover:${
//             isDark ? "bg-gray-700" : "bg-gray-100"
//           } transition-colors`}
//         >
//           <Share2
//             size={16}
//             className={isDark ? "text-gray-400" : "text-gray-600"}
//           />
//         </button>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex space-x-4 mb-4 border-b border-gray-200/50">
//         {data.tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`pb-2 px-1 text-sm font-medium transition-colors ${
//               tab === data.activeTab
//                 ? isDark
//                   ? "text-blue-400 border-b-2 border-blue-400"
//                   : "text-blue-600 border-b-2 border-blue-600"
//                 : isDark
//                 ? "text-gray-400 hover:text-gray-300"
//                 : "text-gray-600 hover:text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Placeholder Images */}
//       <div className="grid grid-cols-3 gap-2 mb-4">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className={`aspect-square rounded-lg ${
//               isDark ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Description */}
//       <p
//         className={`text-sm leading-relaxed mb-4 ${
//           isDark ? "text-gray-300" : "text-gray-700"
//         }`}
//       >
//         {data.description}
//       </p>

//       {/* Details */}
//       <div className="space-y-3 mb-4">
//         {data.details.map((detail, index) => (
//           <div key={index} className="flex justify-between">
//             <span
//               className={`text-sm ${
//                 isDark ? "text-gray-400" : "text-gray-600"
//               }`}
//             >
//               {detail.label}
//             </span>
//             <span
//               className={`text-sm font-medium ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               {detail.value}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Source */}
//       <div className="text-xs text-gray-500 mb-3">{data.source}</div>

//       {/* More Link */}
//       <button
//         className={`text-sm font-medium hover:underline ${
//           isDark
//             ? "text-blue-400 hover:text-blue-300"
//             : "text-blue-600 hover:text-blue-500"
//         } flex items-center space-x-1`}
//       >
//         <span>{data.moreLink}</span>
//         <ChevronDown size={14} className="rotate-[-90deg]" />
//       </button>
//     </div>
//   );

//   return (
//     <div
//       className={`min-h-screen transition-all duration-300 ${
//         isDark
//           ? "bg-black text-white"
//           : "text-black bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]"
//       }`}
//     >
//       {/* Header */}
//       <div className="fixed top-0 left-0 w-full z-10">
//         <ChatHeader
//           isDark={isDark}
//           onHistoryClick={onHistoryClick}
//           onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
//           selectedChatId={currentChatId}
//           chatHistory={chatHistory}
//           onShareChat={handleShareChat}
//           onShareModalOpen={handleShareModalOpen}
//           onShareModalClose={handleShareModalClose}
//           showShareModal={showShareModal}
//           onArchiveChat={handleArchiveChatFromShare}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="pt-16">
//         {/* Animated Search Interface */}
//         <div className="flex flex-col items-center justify-center py-4 border-b border-gray-200/50 transform transition-all duration-700 ease-out translate-y-0 animate-in slide-in-from-bottom-8">
//           {/* Header with Back Button and Sidebar Toggle */}
//           <div className="w-full max-w-6xl">
//             {onBack && (
//               <button
//                 onClick={onBack}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
//                   isDark
//                     ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
//                     : "bg-white hover:bg-gray-50 text-gray-900 shadow-sm border border-gray-200"
//                 }`}
//               >
//                 <ArrowLeft size={16} />
//                 <span>Back to Search</span>
//               </button>
//             )}
//           </div>

//           {/* Animated Compact Logo */}
//           <div className="mb-4 text-center transform transition-all duration-700 ease-out">
//             <h1
//               className={`text-4xl font-bold mb-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent ${
//                 isDark ? "opacity-90" : ""
//               }`}
//             >
//               BharatAi
//             </h1>
//             <p
//               className={`text-sm ${
//                 isDark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               AI-Enhanced Search Engine for India
//             </p>
//           </div>

//           {/* Animated Search Mode Toggle */}
//           <div className="flex justify-center mb-3 transform transition-all duration-700 ease-out delay-100">
//             <div
//               className={`flex items-center rounded-full p-1 shadow-lg ${
//                 isDark
//                   ? "bg-gray-800 border border-gray-700"
//                   : "bg-white/80 backdrop-blur-sm border border-gray-200"
//               }`}
//             >
//               <button
//                 onClick={() => setSelectedMode("Traditional Search")}
//                 className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
//                   selectedMode === "Traditional Search"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : isDark
//                     ? "text-gray-300 hover:bg-gray-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <Globe size={14} />
//                 <span className="font-medium text-xs">Web Search</span>
//               </button>
//               <button
//                 onClick={() => setSelectedMode("AI Mode")}
//                 className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
//                   selectedMode === "AI Mode"
//                     ? "bg-purple-500 text-white shadow-md"
//                     : isDark
//                     ? "text-gray-300 hover:bg-gray-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <Sparkles size={14} />
//                 <span className="font-medium text-xs">AI Mode</span>
//               </button>
//             </div>
//           </div>

//           {/* Animated Search Bar */}
//           <div className="w-full max-w-2xl px-4 transform transition-all duration-700 ease-out delay-200">
//             <div
//               className={`relative flex items-center rounded-full shadow-xl border-2 ${
//                 isDark
//                   ? "bg-gray-800 border-gray-600 focus-within:border-blue-400"
//                   : "bg-white/90 backdrop-blur-sm border-gray-200 focus-within:border-blue-400"
//               } transition-colors duration-200`}
//             >
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Search the web..."
//                 className={`flex-1 px-5 py-2.5 text-sm rounded-full bg-transparent outline-none ${
//                   isDark
//                     ? "text-white placeholder-gray-400"
//                     : "text-gray-900 placeholder-gray-500"
//                 }`}
//               />

//               {/* Voice Search Button */}
//               <button
//                 onClick={handleVoiceSearch}
//                 className={`p-2 mx-1 rounded-full transition-all duration-200 ${
//                   isListening
//                     ? "bg-red-100 text-red-600 animate-pulse"
//                     : isDark
//                     ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
//                     : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                 }`}
//               >
//                 <Mic size={16} />
//               </button>

//               {/* Search Button */}
//               <button
//                 onClick={handleNewSearch}
//                 disabled={!searchQuery.trim()}
//                 className={`p-2 mr-1 rounded-full transition-all duration-200 ${
//                   searchQuery.trim()
//                     ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
//                     : isDark
//                     ? "bg-gray-700 text-gray-500"
//                     : "bg-gray-200 text-gray-400"
//                 }`}
//               >
//                 <Search size={16} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Search Results with Knowledge Panel */}
//         <div className="max-w-6xl mx-auto px-1 py-1">
//           {/* Search Results Header - Constrained to search bar width */}
//           <div className="transform transition-all duration-700 ease-out delay-400 animate-in slide-in-from-bottom-4">
//             <div className="max-w-6xl mx-auto">
//               <div className="mb-4">
//                 <p
//                   className={`text-sm ${
//                     isDark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   About 125,000 results (0.45 seconds) for "{query}" in{" "}
//                   {searchMode}
//                 </p>
//               </div>
//               {/* Filter Tabs */}
//               <div className="flex flex-wrap items-center gap-2 mb-6">
//                 <span
//                   className={`text-sm font-medium ${
//                     isDark ? "text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   Filter by:
//                 </span>
//                 <div className="flex flex-wrap items-center gap-1">
//                   {filters.map((filter) => (
//                     <button
//                       key={filter}
//                       onClick={() => setSelectedFilter(filter)}
//                       className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
//                         selectedFilter === filter
//                           ? "bg-blue-500 text-white shadow-md"
//                           : isDark
//                           ? "text-gray-300 hover:bg-gray-800 hover:text-white"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       {filter}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Search Results Column */}
//             <div className="lg:col-span-3">
//               <div className="space-y-6 transform transition-all duration-700 ease-out delay-500 animate-in slide-in-from-bottom-6">
//                 {[...displayResults, ...loadMoreResults].map(
//                   (result, index) => (
//                     <div
//                       key={result.id}
//                       className="transform transition-all duration-500 ease-out animate-in slide-in-from-left-4"
//                       style={{ animationDelay: `${500 + index * 100}ms` }}
//                     >
//                       <ResultCard result={result} />
//                     </div>
//                   )
//                 )}
//               </div>

//               {/* Loading Indicator */}
//               {isLoadingMore && (
//                 <div className="flex items-center justify-center mt-8 py-8">
//                   <div className="flex flex-col items-center space-y-3">
//                     <Loader2 
//                       className={`w-8 h-8 animate-spin ${
//                         isDark ? "text-blue-400" : "text-blue-500"
//                       }`} 
//                     />
//                     <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//                       Loading more results...
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* End of Results Indicator */}
//               {!hasMoreResults && loadMoreResults.length > 0 && (
//                 <div className="flex items-center justify-center mt-8 py-8">
//                   <div className="text-center">
//                     <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//                       You've reached the end of search results
//                     </p>
//                     <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
//                       Try refining your search query for more results
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Knowledge Panel Column */}
//             <div className="lg:col-span-1">
//               <div className="transform transition-all duration-700 ease-out delay-600 animate-in slide-in-from-right-4">
//                 <KnowledgePanel data={knowledgePanel} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Menu and Settings */}
//       {showProfileMenu && (
//         <ProfileMenu
//           isDark={isDark}
//           theme={theme}
//           onThemeChange={handleThemeChange}
//           onClose={() => setShowProfileMenu(false)}
//           user={user}
//           isAuthenticated={isAuthenticated}
//           archivedChats={archivedChats}
//           onSelectArchivedChat={handleSelectArchivedChat}
//           onRestoreChat={handleRestoreChat}
//           onDeleteArchivedChat={handleDeleteArchivedChat}
//         />
//       )}
      
//       {showSettings && (
//         <Settings
//           isDark={isDark}
//           onClose={() => setShowSettings(false)}
//                 user={user}
//                 archivedChats={archivedChats}
//                 onSelectArchivedChat={handleSelectArchivedChat}
//                 onRestoreChat={handleRestoreChat}
//                 onDeleteArchivedChat={handleDeleteArchivedChat}
//               />
//             )}
      
//             {/* Chat History Modal */}
//             {showHistoryCard && (
//               <>
//                 <ChatHistoryModal
//                   isDark={isDark}
//                   isOpen={showHistoryCard}
//                   onClose={() => setShowHistoryCard(false)}
//                   chatHistory={chatHistory}
//                   onSelectChat={handleSelectChat}
//                   onNewChat={startNewChat}
//                   onDeleteChat={handleDeleteChat}
//                   onShareChat={handleShareChat}
//                   onArchiveChat={handleArchiveChat}
//                   onRenameChat={handleRenameChat}
//                   selectedChatId={currentChatId}
//                   onOpenSearch={() => setShowSearchModal(true)}
//                   onOpenArchivedChats={handleOpenArchivedChats}
//                 />
      
//                 <SearchModal
//                   isOpen={showSearchModal}
//                   onClose={() => setShowSearchModal(false)}
//                   isDark={isDark}
//                   chatHistory={chatHistory}
//                   onSelectChat={handleSelectChat}
//                   onDeleteChat={handleDeleteChat}
//                   onRenameChat={handleRenameChat}
//                 />
//               </>
//             )}
//     </div>
//   );
// };

// export default WebSearchResponse;
import React, { useState, useEffect, useCallback, useRef, } from "react";
import { PiImagesSquare } from "react-icons/pi";
import { LuVideo, LuNewspaper, LuMessageCircle } from "react-icons/lu";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Clock,
  Share2,
  ExternalLink,
  MoreHorizontal,
  ChevronDown,
  ArrowLeft,
  Filter,
  Search,
  Globe,
  Sparkles,
  Mic,
  Menu,
  Loader2,
  Play,
  Calendar,
  X,
  Map,
} from "lucide-react";
import ChatHeader from "./ChatHeader";
import ProfileMenu from "./ProfileMenu";
import Settings from "./Settings";
import ChatHistoryModal from "./ChatHistoryModal";
import SearchModal from "./SearchModal";
import { FaImage, FaVideo, FaNewspaper, FaComments } from "react-icons/fa";
import { Button } from "../../ui/button";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import News from "./News";
import Maps from "./Maps";
import Mapss from "./Mapss";
import Discussions from "./Discussions";
// AspectRatio component implementation
const AspectRatio = ({
  ratio = 16 / 9,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

// API service that matches your Django backend
const djangoApi = {
  // Image Search
  searchImages: async (query, page = 1, limit = 20, filters = {}) => {
    try {
      console.log("Searching images with query:", query);

      const params = new URLSearchParams({
        keywords: query,
        max_results: limit.toString(),
        safesearch: filters.safesearch || "moderate",
        region: filters.region || "wt-wt",
      });

      // Add image-specific filters
      if (filters.size) {
        params.append("size", filters.size);
      }
      if (filters.color) {
        params.append("color", filters.color);
      }
      if (filters.type) {
        params.append("type", filters.type);
      }
      if (filters.layout) {
        params.append("layout", filters.layout);
      }

      const apiUrl = `http://localhost:8000/images/${encodeURIComponent(
        query
      )}?${params}`;
      console.log("Image API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Image Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Images response received:", data);
      return data;
    } catch (error) {
      console.error("Image search failed:", error);
      throw error;
    }
  },

  // Video Search
  searchVideos: async (query, page = 1, limit = 20, filters = {}) => {
    try {
      console.log("Searching videos with query:", query);

      const params = new URLSearchParams({
        keywords: query,
        max_results: limit.toString(),
        safesearch: "moderate",
        region: "wt-wt",
      });

      if (filters.duration && filters.duration !== "medium") {
        params.append("duration", filters.duration);
      }
      if (filters.quality && filters.quality !== "high") {
        params.append("resolution", filters.quality);
      }

      const apiUrl = `http://localhost:8000/videos/${encodeURIComponent(
        query
      )}?${params}`;
      console.log("Video API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Video Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Videos response received:", data);
      return data;
    } catch (error) {
      console.error("Video search failed:", error);
      throw error;
    }
  },
};

// Image Component with backend integration
const ImageComponent = ({
  query,
  isDark,
  onBack,
  onSearch,
  onThemeChange,
  selectedMode,
  setSelectedMode,
}) => {
  const [searchParams] = useSearchParams();
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFilter, setSelectedImageFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(20);
  const loadMoreRef = useRef(null);

  // Image filters
  const Imagefilters = [
    { id: "all", label: "All" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "type", label: "Type" },
    { id: "time", label: "Time" },
    { id: "license", label: "Usage rights" },
  ];

  // Mock data as fallback
  const generateMockImages = (searchQuery) => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      thumbnail: `https://picsum.photos/seed/${encodeURIComponent(searchQuery)}-${i}/400/300`,
      title: `${searchQuery} image ${i + 1}`,
      source: `source${(i % 5) + 1}.com`,
      width: 400 + (i % 3) * 100,
      height: 300 + (i % 4) * 50,
      url: `https://example.com/image-${i + 1}`,
    }));
  };

  // Fetch images from backend
  const fetchImages = async (searchQuery) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching images for:", searchQuery);

      const imageData = await djangoApi.searchImages(searchQuery, 1, 50);
      console.log("Raw image data:", imageData);

      // Transform backend data to match our structure
      let transformedImages = [];

      if (Array.isArray(imageData) && imageData.length > 0) {
        transformedImages = imageData.map((item, index) => ({
          id: item.id || item.url || `image_${index}_${Date.now()}`,
          thumbnail:
            item.thumbnail ||
            item.url ||
            `https://picsum.photos/seed/${index + searchQuery}/400/300`,
          title: item.title || `${searchQuery} - Image ${index + 1}`,
          source:
            item.source ||
            (item.url ? new URL(item.url).hostname : "Unknown Source"),
          width: item.width || 400 + (index % 3) * 100,
          height: item.height || 300 + (index % 4) * 50,
          url: item.url || `https://example.com/image-${index}`,
        }));
      }

      // Use backend data if available, otherwise use mock data
      const finalImages =
        transformedImages.length > 0
          ? transformedImages
          : generateMockImages(searchQuery);
      setDisplayedImages(finalImages.slice(0, displayCount));
    } catch (err) {
      console.error("Error fetching images:", err);
      // Silently fallback to mock data without showing error message
      setDisplayedImages(
        generateMockImages(searchQuery).slice(0, displayCount)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image click
  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Handle next/previous image navigation
  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < displayedImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  // Handle new search
  const handleNewSearch = () => {
    if (searchQuery.trim()) {
      fetchImages(searchQuery);
      if (onSearch) {
        onSearch(searchQuery, selectedMode);
      }
    }
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNewSearch();
  };

  // Handle voice search
  const handleVoiceSearch = () => setIsListening(!isListening);

  // Handle image download
  const handleDownload = async (imageUrl, imageTitle) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${imageTitle || "image"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Handle image share
  const handleShare = async (imageUrl, imageTitle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: imageTitle,
          url: imageUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(imageUrl).then(() => {
        alert("Image URL copied to clipboard!");
      });
    }
  };

  // Load more images when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMoreResults && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            const nextCount = displayCount + 12;
            setDisplayCount(nextCount);
            setDisplayedImages(
              generateMockImages(searchQuery).slice(0, nextCount)
            );
            setIsLoadingMore(false);
            if (nextCount >= generateMockImages(searchQuery).length) {
              setHasMoreResults(false);
            }
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMoreResults, isLoadingMore, displayCount, searchQuery]);

  // Initial load
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchImages(query);
    } else {
      setDisplayedImages(generateMockImages(query).slice(0, displayCount));
      setIsLoading(false);
    }
  }, [query]);

  const currentImage =
    selectedImage !== null ? displayedImages[selectedImage] : null;
  const hasMore = displayCount < generateMockImages(searchQuery).length;

  return (
    <div
      className={`min-h-screen ${isDark ? " text-white" : "text-gray-900"
        }`}
    >
      {/* Removed the duplicate search header section */}

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-gray-600">Loading images...</p>
              <p className="text-xs text-gray-500">Query: "{searchQuery}"</p>
            </div>
          </div>
        )}

        {/* Error Message - REMOVED */}

        {!isLoading && (
          <>
            {/* Filter Bar */}
            <div className="mb-6 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {Imagefilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={
                    selectedImageFilter === filter.id ? "default" : "default"
                  }
                  size="sm"
                  onClick={() => setSelectedImageFilter(filter.id)}
                  className="rounded-full whitespace-nowrap"
                >
                  {filter.label}
                  {filter.id !== "all" && <Filter className="w-3 h-3 ml-2" />}
                </Button>
              ))}
            </div>

            {/* Related Searches */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Related:</span>
              {[
                `${searchQuery} logo`,
                `${searchQuery} graphics`,
                `${searchQuery} icons`,
                `${searchQuery} illustrations`,
              ].map((term) => (
                <button
                  key={term}
                  className="px-4 py-1.5 bg-surface hover:bg-muted border border-border rounded-full text-sm transition-colors"
                  onClick={() => {
                    setSearchQuery(term);
                    handleNewSearch();
                  }}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Masonry Image Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {displayedImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group break-inside-avoid mb-4 rounded-xl overflow-hidden bg-surface border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/image${index}/400/300`;
                    }}
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-medium mb-1 line-clamp-2">
                        {image.title}
                      </p>
                      <p className="text-xs opacity-80">{image.source}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {image.width} × {image.height}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(image.url, image.title);
                        }}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(image.thumbnail, image.title);
                        }}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && <div ref={loadMoreRef} className="h-4" />}
            </div>

            {/* Loading Spinner for More Images */}
            {isLoadingMore && (
              <div className="flex items-center justify-center mt-8 py-8">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2
                    className={`w-8 h-8 animate-spin ${isDark ? "text-blue-400" : "text-blue-500"
                      }`}
                  />
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Loading more images...
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Image Detail Dialog */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        {selectedImage !== null && (
          <div className="fixed inset-0  z-40 md:bg-black/40 backdrop-blur-sm transition-all duration-300" />
        )}
        <DialogContent className="max-w-4xl p-0 gap-0 max-h-[80%] overflow-y-auto scrollbar-thin rounded">
          <div className={`flex flex-col md:flex-row ${isDark ? "bg-black text-white" : "bg-white"} `}>
            {/* Left side - Image Grid */}
            <div className="hidden md:flex-1 md:block bg-muted/30 overflow-y-auto p-4 md:p-6">
              <div className="columns-2 sm:columns-3 gap-4 space-y-4">
                {displayedImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative break-inside-avoid mb-4 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/image${index}/400/300`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Detail Panel */}
            <div className="w-full md:w-[450px] bg-background border-t md:border-t-0 md:border-l flex flex-col ">
              <div className={`flex items-center justify-between p-3 md:p-4 border-b sticky top-0 bg-background z-10 ${isDark ? "bg-black text-white" : "bg-white"} `}>
                <div className="flex items-center space-x-4 rounded-2xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevImage}
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextImage}
                    disabled={selectedImage === displayedImages.length - 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                  className="ml-auto"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Image Display */}
              <div className="flex-1 overflow-y-auto">
                {currentImage && (
                  <>
                    <div className="p-6">
                      <img
                        src={currentImage.thumbnail}
                        alt={currentImage.title}
                        className="w-full rounded-lg"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/seed/image${selectedImage}/400/300`;
                        }}
                      />
                    </div>

                    {/* Image Info */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {currentImage?.source?.[0]?.toUpperCase() || ""}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {currentImage?.source || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {currentImage?.width && currentImage?.height
                                ? `${currentImage.width} × ${currentImage.height}`
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-lg font-semibold mb-3">
                        {currentImage?.title || "Untitled"}
                      </h2>

                      <div className="flex space-x-2 mb-6">
                        <Button className="flex-1" asChild>
                          <a
                            href={currentImage?.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            handleShare(currentImage.url, currentImage.title)
                          }
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            handleDownload(
                              currentImage.thumbnail,
                              currentImage.title
                            )
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>

                    {/* Related Images */}
                    <div className="px-6 pb-6 border-t pt-6">
                      <h3 className="font-semibold mb-4">
                        More from {currentImage?.source || "this site"}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {displayedImages.slice(0, 6).map((img, idx) => (
                          <div
                            key={img.id}
                            className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(idx)}
                          >
                            <img
                              src={img.thumbnail}
                              alt={img.title}
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                e.target.src = `https://picsum.photos/seed/image${idx}/400/300`;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Video Component with backend integration
const VideoComponent = ({
  query,
  isDark,
  onBack,
  onThemeChange,
  onSearch,
  selectedMode,
  setSelectedMode,
}) => {
  const [searchParams] = useSearchParams();
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [isListening, setIsListening] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoFilter, setSelectedVideoFilter] = useState("All");
  const [displayCount, setDisplayCount] = useState(12);
  const loadMoreRef = useRef(null);

  // Video filters
  const videoFilters = [
    "All",
    "Short videos",
    "Long videos",
    "HD",
    "4K",
    "Recently uploaded",
  ];

  // Mock data as fallback
  const generateMockVideos = (searchQuery) => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      thumbnail: `https://picsum.photos/seed/video-${encodeURIComponent(searchQuery)}-${i}/640/360`,
      title: `${searchQuery} - Video ${i + 1}: Complete Guide and Tutorial`,
      channel: `Channel ${(i % 5) + 1}`,
      views: `${Math.floor(Math.random() * 900 + 100)}K views`,
      duration: `${Math.floor(Math.random() * 40 + 5)}:${String(
        Math.floor(Math.random() * 60)
      ).padStart(2, "0")}`,
      uploadDate: `${Math.floor(Math.random() * 30 + 1)} days ago`,
      url: `https://youtube.com/watch?v=${i}`,
      description:
        "Learn everything about this topic with detailed explanations and examples. Perfect for beginners and advanced users alike.",
    }));
  };

  // Fetch videos from backend
  const fetchVideos = async (searchQuery) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching videos for:", searchQuery);

      const videoData = await djangoApi.searchVideos(searchQuery, 1, 50);
      console.log("Raw video data:", videoData);

      // Transform backend data to match our structure
      let transformedVideos = [];

      if (Array.isArray(videoData) && videoData.length > 0) {
        transformedVideos = videoData.map((item, index) => ({
          id: item.id || item.url || `video_${index}_${Date.now()}`,
          thumbnail:
            item.thumbnail ||
            item.url ||
            `https://picsum.photos/seed/video${index + searchQuery}/640/360`,
          title: item.title || `${searchQuery} - Video ${index + 1}`,
          channel: item.channel || `Channel ${(index % 5) + 1}`,
          views:
            item.views || `${Math.floor(Math.random() * 900 + 100)}K views`,
          duration:
            item.duration ||
            `${Math.floor(Math.random() * 40 + 5)}:${String(
              Math.floor(Math.random() * 60)
            ).padStart(2, "0")}`,
          uploadDate:
            item.uploadDate || `${Math.floor(Math.random() * 30 + 1)} days ago`,
          url: item.url || `https://youtube.com/watch?v=${index}`,
          description:
            item.description ||
            "Learn everything about this topic with detailed explanations and examples. Perfect for beginners and advanced users alike.",
        }));
      }

      // Use backend data if available, otherwise use mock data
      const finalVideos =
        transformedVideos.length > 0
          ? transformedVideos
          : generateMockVideos(searchQuery);
      setDisplayedVideos(finalVideos.slice(0, displayCount));
    } catch (err) {
      console.error("Error fetching videos:", err);
      // Silently fallback to mock data without showing error message
      setDisplayedVideos(
        generateMockVideos(searchQuery).slice(0, displayCount)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video click
  const handleVideoClick = (index) => {
    setSelectedVideo(index);
  };

  // Handle new search
  const handleNewSearch = () => {
    if (searchQuery.trim()) {
      fetchVideos(searchQuery);
      if (onSearch) {
        onSearch(searchQuery, selectedMode);
      }
    }
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNewSearch();
  };

  // Handle voice search
  const handleVoiceSearch = () => setIsListening(!isListening);

  // Load more videos when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMoreResults && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            const nextCount = displayCount + 6;
            setDisplayCount(nextCount);
            setDisplayedVideos(
              generateMockVideos(searchQuery).slice(0, nextCount)
            );
            setIsLoadingMore(false);
            if (nextCount >= generateMockVideos(searchQuery).length) {
              setHasMoreResults(false);
            }
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMoreResults, isLoadingMore, displayCount, searchQuery]);

  // Initial load
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchVideos(query);
    } else {
      setDisplayedVideos(generateMockVideos(query).slice(0, displayCount));
      setIsLoading(false);
    }
  }, [query]);

  const currentVideo =
    selectedVideo !== null ? displayedVideos[selectedVideo] : null;
  const hasMore = displayCount < generateMockVideos(searchQuery).length;

  const relatedTopics = [
    `${searchQuery} software`,
    `${searchQuery} medical`,
    `${searchQuery} download`,
    `${searchQuery} dentistry`,
    `${searchQuery} tutorial`,
    `${searchQuery} review`,
  ];

  return (
    <div
      className={`min-h-screen `}
    >
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-gray-600">Loading videos...</p>
              <p className="text-xs text-gray-500">Query: "{searchQuery}"</p>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Filter Bar */}
            <div className="mb-6 flex items-center space-x-3 overflow-x-auto pb-2">
              {videoFilters.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  className={`rounded-full whitespace-nowrap !text-sm !font-medium !bg-transparent hover:!bg-gray-200 !border-none !shadow-none hover:!text-black ${selectedVideoFilter === filter
                    ? "!bg-blue-500 !text-white"
                    : ""
                    }`}
                  onClick={() => setSelectedVideoFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Video Grid */}
            <div className="space-y-6">
              {displayedVideos.map((video, index) => (
                <Card
                  key={video.id}
                  className={`group overflow-hidden  border-border hover:shadow-lg transition-all duration-300 cursor-pointer ${isDark
            ? "bg-black border-gray-700 hover:bg-gray-800/70"
            : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"}`}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    {/* Video Thumbnail */}
                    <div className="relative md:w-80 flex-shrink-0">
                      <div className="relative rounded-lg overflow-hidden aspect-video bg-muted">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = `https://picsum.photos/seed/video${index}/640/360`;
                          }}
                        />

                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-8 h-8 text-[#61a6fa] fill-[#61a6fa] ml-1" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                          {video.duration}
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {video.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {video.uploadDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {video.views}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#61a6fa] to-[#f7ab59] flex items-center justify-center text-white text-xs font-bold">
                            {video.channel[0]}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {video.channel}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 mt-4">
                        <Button
                          size="sm"
                          className="rounded-full !bg-[#61a6fa] !text-white"
                          asChild
                        >
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className={`rounded-full bg-[#fafafa] border-none hover:!text-black hover:!bg-[#f3f4f7] !shadow-none ${isDark ? "bg-gray-700 text-white" : ""}`}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className={`rounded-full !bg-[#fafafa] !border-none hover:!text-black hover:!bg-[#f3f4f7] !shadow-none  ${isDark ? "bg-gray-700 text-white" : ""}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Intersection Observer Target */}
              {hasMore && <div ref={loadMoreRef} className="h-4" />}
            </div>

            {/* Loading Spinner */}
            {isLoadingMore && (
              <div className="flex items-center justify-center mt-8 py-8">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2
                    className={`w-8 h-8 animate-spin ${isDark ? "text-blue-400" : "text-blue-500"
                      }`}
                  />
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Loading more videos...
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Video Detail Dialog */}
      <Dialog
        open={selectedVideo !== null}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-4xl p-0 gap-0 max-h-[95%] overflow-y-auto scrollbar-thin">
          {currentVideo && (
            <div className={`${isDark ? "bg-black text-white" : "bg-white px-2"}`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                  <span className="font-semibold">YouTube</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="bg-black">
                <AspectRatio ratio={16 / 9}>
                  <div className="relative w-full h-full flex items-center justify-center group">
                    <img
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/video${selectedVideo}/640/360`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white fill-white ml-2" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                      {currentVideo.duration}
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {currentVideo.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="font-medium text-foreground">YouTube</span>
                  </div>
                  <span>{currentVideo.channel}</span>
                  <span>•</span>
                  <span>{currentVideo.uploadDate}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {currentVideo.description}
                </p>

                <div className="flex space-x-2 mb-6">
                  <Button
                    asChild
                    className={`flex-1 !bg-[#61a6fa] hover:!bg-blue-500`}
                  >
                    <a
                      href={currentVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </a>
                  </Button>
                  <Button
                    
                    className="rounded-full !bg-[#fafafa] !border-none hover:!text-black hover:!bg-[#f3f4f7] !shadow-none"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Related Topics */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Related topics</h3>
                  <div className="space-y-2">
                    {relatedTopics.map((topic, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-3 w-full px-4 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                      >
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const WebSearchResponses = ({
  query,
  searchMode,
  // isDark,
  results = [],
  onBack,
  onSearch,
  // theme,
   onThemeChange,
  // handleThemeChange,
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
  onHistoryClick,
}) => {

  
  
  const [searchParams] = useSearchParams();
  const querys = searchParams.get("q") || "";
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [displayCount, setDisplayCount] = useState(2);
  const loadMoreRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState("images");
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [selectedMode, setSelectedMode] = useState(
    searchMode || "Traditional Search"
  );
  const [isListening, setIsListening] = useState(false);
  const [showHistoryCard, setShowHistoryCard] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loadMoreResults, setLoadMoreResults] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [safeSearch, setSafeSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const [showProfileMenu , setShowProfileMenu]= useState(false)
  
  const navigate = useNavigate();

  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const isDark = theme === "dark";
      const handleThemeChange = (value) => {
    setTheme(value);
  
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  
    localStorage.setItem("theme", value);
  };

  const handleFilterChange = (filter) => {
    const q = searchQuery || querys || "";
    const encoded = encodeURIComponent(q);

    switch (filter) {
      case "Images":
        navigate(`/search/images?q=${encoded}`);
        break;
      case "Videos":
        navigate(`/search/videos?q=${encoded}`);
        break;
      case "News":
        navigate(`/search/news?q=${encoded}`);
        break;
      case "Blogs":
        navigate(`/search/blogs?q=${encoded}`);
        break;
      case "Maps":
        navigate(`/search/maps?q=${encoded}`);
        break;
      default:
        navigate(`/search?q=${encoded}`);
    }

    setSelectedFilter(filter);
  };

  const { category } = useParams();
  useEffect(() => {
    if (!category) {
      setSelectedFilter("All");
      return;
    }

    const cap = category.charAt(0).toUpperCase() + category.slice(1);

    setSelectedFilter(cap);
  }, [category]);


  const onSafeSearchToggle = () => setSafeSearch(!safeSearch);
  const [selectedImageFilter, setSelectedImageFilter] = useState("all");
  const filterss = [
    "All",
    "Short videos",
    "Long videos",
    "HD",
    "4K",
    "Recently uploaded",
  ];

  // Remove mock videos since we're using backend now
  // const mockVideos = Array.from({ length: 12 }, (_, i) => ({
  //   id: i + 1,
  //   thumbnail: `https://picsum.photos/seed/video${i + querys}/640/360`,
  //   title: `${querys} - Video ${i + 1}: Complete Guide and Tutorial`,
  //   channel: `Channel ${(i % 5) + 1}`,
  //   views: `${Math.floor(Math.random() * 900 + 100)}K views`,
  //   duration: `${Math.floor(Math.random() * 40 + 5)}:${String(
  //     Math.floor(Math.random() * 60)
  //   ).padStart(2, "0")}`,
  //   uploadDate: `${Math.floor(Math.random() * 30 + 1)} days ago`,
  //   url: `https://youtube.com/watch?v=${i}`,
  //   description:
  //     "Learn everything about this topic with detailed explanations and examples. Perfect for beginners and advanced users alike.",
  // }));

  // Remove displayedVideos since we're using backend component
  // const displayedVideos = mockVideos.slice(0, displayCount);
  // const hasMore = displayCount < mockVideos.length;

  const relatedTopics = [
    `${querys} software`,
    `${querys} medical`,
    `${querys} download`,
    `${querys} dentistry`,
    `${querys} tutorial`,
    `${querys} review`,
  ];

  const currentVideo =
    selectedVideo !== null ? displayedVideos[selectedVideo] : null;

  const Imagefilters = [
    { id: "all", label: "All" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "type", label: "Type" },
    { id: "time", label: "Time" },
    { id: "license", label: "Usage rights" },
  ];

  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < mockImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const currentImage = selectedImage !== null ? mockImages[selectedImage] : null;

  const categoryIcons = [
    { id: "All", label: "All", size: 20 },
    { id: "news", label: "News", icon: <LuNewspaper size={20} /> },
    { id: "images", label: "Images", icon: <PiImagesSquare size={20} /> },
    { id: "maps", label: "Maps", icon: <Map size={20} /> },
    { id: "videos", label: "Videos", icon: <LuVideo size={20} /> },
    {
      id: "Blogs",
      label: "Blogs",
      icon: <LuMessageCircle size={20} />,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filters = ["All", "News", "Images", "Videos", "Local", "Shopping"];

  const displayResults =
    results.length > 0
      ? results
      : [
        {
          id: 2,
          type: "sponsored",
          favicon: "IN",
          domain: "www.india.gov.in",
          tag: "Sponsored",
          timestamp: null,
          title: `Complete Guide to ${query} - Official Information`,
          description: `Comprehensive and authoritative information about ${query}. Get accurate details from government sources and verified information portals.`,
          url: "https://www.india.gov.in",
        },
        {
          id: 3,
          type: "news",
          favicon: "News",
          domain: "indianexpress.com",
          tag: "News",
          timestamp: "1 day ago",
          title: `${query} Analysis and Expert Opinion`,
          description: `In-depth analysis and expert perspectives on ${query}. Understand the implications and get detailed insights from industry specialists.`,
          url: "https://indianexpress.com",
        },
      ];

  const generateAdditionalResults = (page) => {
    const baseResults = [
      {
        type: "web",
        favicon: "Search",
        domain: "www.wikipedia.org",
        tag: "Web",
        timestamp: null,
        title: `${query} - Wikipedia`,
        description: `Detailed encyclopedia entry about ${query}. Get comprehensive background information and historical context from the world's largest online encyclopedia.`,
        url: "https://www.wikipedia.org",
      },
    ]
      .map((result, index) => ({
        ...result,
        id: page * 10 + index + 10,
        title: `${result.title} - Page ${page}`,
      }))
      .slice(0, 3);

    return baseResults;
  };

  const handleScroll = useCallback(() => {
    if (isLoadingMore || !hasMoreResults) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 300) {
      setIsLoadingMore(true);
      setTimeout(() => {
        const newResults = generateAdditionalResults(currentPage + 1);
        setLoadMoreResults((prev) => [...prev, ...newResults]);
        setCurrentPage((prev) => prev + 1);
        setIsLoadingMore(false);
        if (currentPage >= 5) setHasMoreResults(false);
      }, 1500);
    }
  }, [isLoadingMore, hasMoreResults, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const knowledgePanel = {
    title: "Search Results",
    subtitle: `About "${query}"`,
    tabs: ["Info", "Related", "More", "Sources"],
    activeTab: "Info",
    description: `Search results for "${query}" in ${searchMode} mode. These results are curated to provide comprehensive information from reliable sources across the web.`,
    details: [
      { label: "Search Mode", value: searchMode },
      { label: "Results Found", value: "125,000" },
      { label: "Query", value: query },
    ],
    source: "BharatAi Search",
    moreLink: "See more",
  };

  const handleNewSearch = () => {
    if (searchQuery.trim() && onSearch) {
      setIsInitialLoading(true);
      setLoadMoreResults([]);
      setCurrentPage(1);
      setHasMoreResults(true);
      setTimeout(() => setIsInitialLoading(false), 2000);
      onSearch(searchQuery, selectedMode);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNewSearch();
  };

  const handleVoiceSearch = () => setIsListening(!isListening);

  const handleQuickSearch = (suggestion) => {
    setSearchQuery(suggestion);
    if (onSearch) {
      setIsInitialLoading(true);
      setLoadMoreResults([]);
      setCurrentPage(1);
      setHasMoreResults(true);
      setTimeout(() => setIsInitialLoading(false), 2000);
      onSearch(suggestion, selectedMode);
    }
  };

  const handleSelectChat = () => setShowHistoryCard(false);
  const handleDeleteChat = (chatId) => console.log("Deleted chat:", chatId);
  const handleArchiveChat = (chatId) => console.log("Archived chat:", chatId);
  const handleRenameChat = (chatId, newTitle) =>
    console.log("Rename chat:", chatId, newTitle);
  const startNewChat = () => setShowHistoryCard(false);
  const handleOpenArchivedChats = () => setShowSettings(true);

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const ResultCard = ({ result }) => {
    const isSponsored = result.type === "sponsored";

    return (
      <div
        className={`p-6 h-[180px] rounded-lg border transition-all duration-200 hover:shadow-md max-w-2xl ${isSponsored
          ? isDark
            ? "bg-yellow-900/20 border-yellow-600/30 hover:bg-yellow-900/30"
            : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
          : isDark
            ? "bg-black border-gray-700 hover:bg-gray-800/70"
            : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
          }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-sm">{result.favicon}</span>
            <span
              className={`text-sm truncate ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {result.domain}
            </span>
            {result.tag && (
              <span
                className={`px-2 py-1 text-xs rounded-full ${isSponsored
                  ? "bg-yellow-100 text-yellow-800"
                  : result.type === "news"
                    ? "bg-blue-100 text-blue-800"
                    : result.type === "business"
                      ? "bg-green-100 text-green-800"
                      : result.type === "academic"
                        ? "bg-purple-100 text-purple-800"
                        : result.type === "professional"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
              >
                {result.tag}
              </span>
            )}
            {result.timestamp && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock size={12} />
                <span className="text-xs">{result.timestamp}</span>
              </div>
            )}
          </div>
          <button
            className={`p-1 rounded hover:${isDark ? "bg-gray-700" : "bg-gray-100"
              } transition-colors`}
          >
            <MoreHorizontal
              size={16}
              className={isDark ? "text-gray-400" : "text-gray-600"}
            />
          </button>
        </div>

        <h3
          className={`text-lg font-medium mb-2 line-clamp-2 ${isDark
            ? "text-blue-300 hover:text-blue-200"
            : "text-blue-600 hover:text-blue-500"
            } cursor-pointer transition-colors`}
        >
          {result.title}
        </h3>

        <p
          className={`text-sm leading-relaxed line-clamp-3 ${isDark ? "text-gray-300" : "text-gray-700"
            }`}
        >
          {result.description}
        </p>
      </div>
    );
  };

  const KnowledgePanel = ({ data }) => (
    <div
      className={`top-16 rounded-lg border p-6 max-w-md ${isDark
        ? "bg-gray-800/60 border-gray-700 backdrop-blur-sm"
        : "bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
        }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2
            className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
              }`}
          >
            {data.title}
          </h2>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {data.subtitle}
          </p>
        </div>
        <button
          className={`p-1 rounded hover:${isDark ? "bg-gray-700" : "bg-gray-100"
            } transition-colors`}
        >
          <Share2
            size={16}
            className={isDark ? "text-gray-400" : "text-gray-600"}
          />
        </button>
      </div>

      <div className="flex space-x-4 mb-4 border-b border-gray-200/50">
        {/* {data.tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 text-sm font-medium transition-colors ${tab === data.activeTab
              ? isDark
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-blue-600 border-b-2 border-blue-600"
              : isDark
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))} */}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
          />
        ))}
      </div>

      <p
        className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-700"
          }`}
      >
        {data.description}
      </p>

      <div className="space-y-3 mb-4">
        {data.details.map((detail, index) => (
          <div key={index} className="flex justify-between">
            <span
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {detail.label}
            </span>
            <span
              className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mb-3">{data.source}</div>

      <button
        className={`text-sm font-medium hover:underline ${isDark
          ? "text-blue-400 hover:text-blue-300"
          : "text-blue-600 hover:text-blue-500"
          } flex items-center space-x-1`}
      >
        <span>{data.moreLink}</span>
        {/* <ChevronDown size={14} className="rotate-[-90deg]" /> */}
      </button>
    </div>
  );

 

  return (
    <div
      className={`min-h-screen transition-all duration-300 cursor-default ${selectedVideo !== null && "blur-sm"
        } ${isDark
          ? "bg-black text-white"
          : "text-black bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]"
        }`}
    >
      <div
        className={`fixed top-0 left-0 w-full z-20 ${isSticky
          ? `
            ${isDark
            ? "bg-black text-white"
            : "text-black bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]"
          }` : ""
          }`}
      >

        <ChatHeader
          isDark={isDark}
          onHistoryClick={onHistoryClick}
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

      {selectedFilter !== "Maps" ? (
        <div className="pt-16">
          <div className="flex flex-col items-center justify-center py-4  ">
            {/* <div className="w-full max-w-6xl">
              {onBack && (
                <button
                  onClick={onBack}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                      : "bg-white hover:bg-gray-50 text-gray-900 shadow-sm border border-gray-200"
                  }`}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Search</span>
                </button>
              )}
            </div> */}

            <div className="mb-4 mt-4 text-center transform transition-all duration-700 ease-out">
              <h1
                className={`text-4xl font-bold mb-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent ${isDark ? "opacity-90" : ""
                  }`}
              >
                BharatAi
              </h1>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                AI-Enhanced Search Engine for India
              </p>
            </div>


            <div className={`transition-all duration-300 ${isSticky
              ? " fixed top-10 lg:top-0 left-0 w-full flex flex-col lg:flex-row-reverse justify-center items-center py-2 gap-2 lg:py-5 z-30 "
              : "flex flex-col items-center w-full gap-3"
              }`}
            >
              <div className="flex justify-center items-center  transform transition-all duration-700 ease-out delay-100">
                <div
                  className={`flex items-center rounded-full p-1 shadow-lg ${isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200"
                    }
                  
                    `}

                >
                  <button
                    onClick={() => setSelectedMode("Traditional Search")}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${selectedMode === "Traditional Search"
                      ? `${isDark ? "bg-gray-700" : "bg-blue-500 text-white shadow-md"}`
                      : isDark
                        ? " text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Globe size={14} />
                    <span className="font-medium text-xs">Web Search</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMode("AI Mode");
                      const random = Date.now();
                      setTimeout(() => {
                        window.location.href = `/test/chat?reload=${random}`;
                      }, 100);
                    }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${selectedMode === "AI Mode"
                      ? "bg-purple-500 text-white shadow-md"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Sparkles size={14} />
                    <span className="font-medium text-xs">AI Mode</span>
                  </button>
                </div>
              </div>

              <div className={`w-full max-w-2xl px-4 transform transition-all duration-700 ease-out delay-200 ${isSticky ? "fixed z-50" : ""} `}>
                <div
                  className={`flex w-full items-center rounded-full shadow-xl border-2 transition-all duration-300 max-w-full md:max-w-xl lg:max-w-3xl
                   ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"} `} >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search the web..."
                    className={`flex-1 px-5 py-2.5 text-sm rounded-full bg-transparent outline-none z-50  ${isDark
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                      }`}
                  />
                  <button
                    onClick={handleVoiceSearch}
                    className={`p-2 mx-1 rounded-full transition-all duration-200 ${isListening
                      ? "bg-red-100 text-red-600 animate-pulse"
                      : isDark
                        ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                  >
                    <Mic size={16} />
                  </button>
                  <button
                    onClick={handleNewSearch}
                    disabled={!searchQuery.trim()}
                    className={`p-2 mr-1 rounded-full transition-all duration-200 ${searchQuery.trim()
                      ? `${isDark ? "bg-gray-700" : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"}`
                      : isDark
                        ? "bg-gray-700 text-gray-500"
                        : "bg-gray-200 text-gray-400"
                      }`}
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={` w-full ${isSticky
              ? `fixed top-[55px] left-0 z-10 pt-20 sm:pt-20 lg:pt-0 h-[150px] lg:h-[60px] shadow-md  ${isDark
                ? "bg-black text-white"
                : "text-black bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]"
              }`
              : ""
              }`}
          >

            <div className={` flex flex-nowrap gap-4 mb-4 mt-3 md:mt-5 max-w-6xl mx-auto px-4 items-center justify-between overflow-x-auto scrollbar-none ${isSticky}`}>
              <div className="flex flex-nowrap gap-2 justify-center">
                {categoryIcons.map((cat) => (
                  <button
                    key={cat.id}
                    className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 focus:outline-none px-3 py-1 rounded-full ${selectedFilter === cat.label
                      ? `${isDark ? "bg-gray-700 text-white" : "bg-blue-500 text-white"}`
                      : isDark
                        ? "text-white hover:bg-gray-700 hover:text-white"
                        : "text-gray-900 hover:bg-blue-500 hover:text-white"
                      }`}
                    onClick={() => handleFilterChange(cat.label)}
                  >
                    <span className="opacity-70">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
                <div className="relative left-5 pt-3 lg:left-3/4 ">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Safe search </span>

                    <button
                      onClick={onSafeSearchToggle}
                      className={`w-8 h-4 rounded-full transition-all duration-200 relative ${safeSearch ? `${isDark ? "bg-gray-700" : "bg-blue-500"}` : "bg-gray-400"}`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${safeSearch ? "left-4" : "left-0.5"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="APItest"></div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-1 py-1">
            <div className="transform transition-all duration-700 ease-out delay-400 animate-in slide-in-from-bottom-4">
              <div className="max-w-6xl mx-0 ml-4">
                <div className="mb-4">
                  <p
                    className={`text-xs sm:text-sm break-words text-center sm:text-left ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    About 1,25,000 results (0.45 seconds) for "{query}" in{" "}
                    {searchMode}
                  </p>
                </div>
              </div>
            </div>

            {selectedFilter !== "Videos" &&
              selectedFilter !== "Images" &&
              selectedFilter !== "News" &&
              selectedFilter !== "Blogs" && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 max-w-6xl mx-auto px-4">
                  <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
                    {[...displayResults, ...loadMoreResults].map(
                      (result, index) => (
                        <div
                          key={result.id}
                          className="transform transition-all duration-500 ease-out animate-in slide-in-from-left-4"
                          style={{ animationDelay: `${500 + index * 100}ms` }}
                        >
                          <ResultCard result={result} />
                        </div>
                      )
                    )}
                    {isLoadingMore && (
                      <div className="flex items-center justify-center mt-8 py-8">
                        <div className="flex flex-col items-center space-y-3">
                          <Loader2
                            className={`w-8 h-8 animate-spin ${isDark ? "text-blue-400" : "text-blue-500"
                              }`}
                          />
                          <p
                            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                          >
                            Loading more results...
                          </p>
                        </div>
                      </div>
                    )}
                    {!hasMoreResults && loadMoreResults.length > 0 && (
                      <div className="flex items-center justify-center mt-8 py-8">
                        <div className="text-center">
                          <p
                            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                          >
                            You've reached the end of search results
                          </p>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"
                              }`}
                          >
                            Try refining your search query for more results
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="top-16 -mt-4 max-h-[85vh] w-[450px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-auto">
                      <KnowledgePanel data={knowledgePanel} />
                    </div>
                  </div>
                </div>
              )}



            {/* Images Section */}
            {selectedFilter == "Images" && (
              <ImageComponent
                query={query}
                isDark={isDark}
                onBack={onBack}
                onSearch={onSearch}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                
              />
            )}

            {/* News Section - Preserved */}
            {selectedFilter == "News" && <News query={query}
                isDark={isDark}
                onBack={onBack}
                onSearch={onSearch}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}/>}

            {/* Videos Section with Backend Integration */}
            {selectedFilter == "Videos" && (
              <VideoComponent
                query={query}
                isDark={isDark}
                onBack={onBack}
                onSearch={onSearch}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
              />
            )}
          </div>
        </div>
      ) : (
        
        <div className="fixed inset-0 ">
          <Mapss />
        </div>

      )}

      {selectedFilter == "Blogs" && (
        <Discussions 
                query={query}
                isDark={isDark}
                onBack={onBack}
                onSearch={onSearch}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}/>
      )}

      {showProfileMenu && (
        <ProfileMenu
          isDark={isDark}
          theme={theme}
          onThemeChange={handleThemeChange}
          onClose={() => setShowProfileMenu(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          archivedChats={archivedChats}
          onSelectArchivedChat={handleSelectArchivedChat}
          onRestoreChat={handleRestoreChat}
          onDeleteArchivedChat={handleDeleteArchivedChat}
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

export default WebSearchResponses;
