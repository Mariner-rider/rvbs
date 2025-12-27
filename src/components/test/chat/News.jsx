import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    TrendingUp,
    Clock,
    Calendar,
    Share2,
    ExternalLink,
    Loader2,
} from "lucide-react";

const News = ({
    isDark,
}) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [displayedNews, setDisplayedNews] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMoreResults, setHasMoreResults] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showHistoryCard, setShowHistoryCard] = useState(false);
    // Mock data
    const mockNews = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `${query || "Global"}: Breaking News Story ${i + 1
            } - Latest Updates and Analysis`,
        source: ["Yahoo Finance", "Tribune India", "Moneycontrol", "Reuters", "Bloomberg"][i % 5],
        sourceLogo: `https://ui-avatars.com/api/?name=${["YF", "TI", "MC", "RT", "BG"][i % 5]
            }&background=random`,
        snippet:
            "Earlier this week, new developments emerged that have significant implications for the market and stakeholders. Experts are analyzing the situation closely...",
        image: i % 3 === 0 ? `https://picsum.photos/seed/news${i + query}/400/250` : undefined,
        publishedTime: i < 3 ? `${i + 1} hours ago` : `${i} days ago`,
        category: ["Business", "Technology", "Politics", "Health", "Sports"][i % 5],
        trending: i < 3,
    }));

    // Initial load
    useEffect(() => {
        setDisplayedNews(mockNews.slice(0, 8));
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight
            ) {
                loadMoreNews();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayedNews, hasMoreResults]);

    const loadMoreNews = () => {
        if (isLoadingMore || !hasMoreResults) return;
        setIsLoadingMore(true);

        setTimeout(() => {
            const nextCount = displayedNews.length + 5;
            const nextItems = mockNews.slice(0, nextCount);
            setDisplayedNews(nextItems);
            setIsLoadingMore(false);
            if (nextCount >= mockNews.length) {
                setHasMoreResults(false);
            }
        }, 1000);
    };

    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);




    const filters = ["All", "Latest", "Top stories", "Past hour", "Past 24 hours", "Past week"];

    return (
        <div className="min-h-screen text-gray-900">

            <main className="max-w-7xl mx-auto">
                {/* Filter Bar */}
                <div className="mb-6 flex items-center space-x-3 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`px-4 py-1  rounded-full text-sm  whitespace-nowrap cursor-pointer ${isDark ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100"}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Top Stories Section */}
                {mockNews.slice(0, 3).some((n) => n.trending) && (
                    <div className={` mb-8`}>
                        <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-700"}`}>Top Stories</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {mockNews.slice(0, 3).map((news) => (
                                <div
                                    key={news.id}
                                    className={` border rounded-lg overflow-hidden shadow-sm hover:shadow-md transform transition-all duration-500 ease-out animate-in slide-in-from-left-4 ${isDark
                                        ? "bg-black border-gray-700 hover:bg-gray-800/70"
                                        : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"}`}>
                                    {news.image && (
                                        <div className="relative">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className={`w-full h-48 object-cover `}
                                            />
                                            <span className={`absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded`}>
                                                {news.category}
                                            </span>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className={`font-semibold  mb-2 hover:text-blue-600 ${isDark ? "text-white" : "text-gray-900"}`}>
                                            {news.title}
                                        </h3>
                                        <div className={`flex justify-between items-center text-xs text-gray-500`}>
                                            <span>{news.source}</span>
                                            <span className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {news.publishedTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Latest News Section */}
                <div className="space-y-4">
                    <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-700"}`}>Latest News</h2>
                    {displayedNews.map((news) => (
                        <div
                            key={news.id}
                            className={`flex flex-col md:flex-row ${isDark
                                ? "bg-black border-gray-700 hover:bg-gray-800/70 text-white"
                                : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"} border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition`}
                        >
                            {news.image && (
                                <div className="md:w-1/3">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-4 flex-1">
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                    <img
                                        src={news.sourceLogo}
                                        alt={news.source}
                                        className="w-5 h-5 rounded"
                                    />
                                    <span className="font-medium">{news.source}</span>
                                    <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                                        {news.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold mb-1 hover:text-blue-600">
                                    {news.title}
                                </h3>

                                <p className="text-sm text-gray-700 mb-3">{news.snippet}</p>

                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {news.publishedTime}
                                    </span>

                                    <div className="flex gap-3">
                                        <button className="hover:text-blue-600">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button className="hover:text-blue-600">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading  */}
                {isLoadingMore && (
                    <div className="flex items-center justify-center mt-8 py-8">
                        <div className="flex flex-col items-center space-y-3">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <p className="text-sm text-gray-600">Loading more results...</p>
                        </div>
                    </div>
                )}

                {/* End of Results */}
                {!hasMoreResults && displayedNews.length > 0 && (
                    <div className="flex items-center justify-center mt-8 py-8">
                    </div>
                )}
            </main>


        </div>
    );
};

export default News;
