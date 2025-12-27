import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, User, BookOpen, Clock, ExternalLink, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';

const Discussions = ({
    isDark,
}) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [currentCategory, setCurrentCategory] = useState('discussions');
    const [displayedBlog, setDisplayedBlog] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMoreResults, setHasMoreResults] = useState(true);
    // Mock blog data
    const mockBlogs = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `${query}: Complete Guide and Best Practices ${i + 1}`,
        author: `Author ${(i % 5) + 1}`,
        authorAvatar: `https://ui-avatars.com/api/?name=Author+${(i % 5) + 1}&background=random`,
        excerpt: 'Discover the achievements that set us apart. From groundbreaking projects to industry accolades, we take pride in our accomplishments. Learn how to immerse yourself in the culture of each place you visit by following these insider tips.',
        image: i % 2 === 0 ? `https://picsum.photos/seed/blog${i + query}/800/400` : undefined,
        publishedDate: `${['August', 'March', 'May', 'October'][i % 4]} ${(i % 28) + 1}, ${2017 + (i % 8)}`,
        readTime: `${Math.floor(Math.random() * 10 + 3)} min read`,
        category: ['Health & Nutrition', 'Sustainability', 'Cultural Insights', 'Travel Tips', 'Technology'][i % 5],
        tags: ['Tutorial', 'Guide', 'Best Practices'].slice(0, (i % 3) + 1),
        featured: i < 2,
    }));

    const categories = ['All', 'Featured', 'Travel', 'Technology', 'Lifestyle', 'Business'];

    useEffect(() => {
        setDisplayedBlog(mockBlogs.slice(0, 8));
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight
            ) {
                loadMoreBlog();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayedBlog, hasMoreResults]);

    const loadMoreBlog = () => {
        if (isLoadingMore || !hasMoreResults) return;
        setIsLoadingMore(true);

        setTimeout(() => {
            const nextCount = displayedBlog.length + 5;
            const nextItems = mockBlogs.slice(0, nextCount);
            setDisplayedBlog(nextItems);
            setIsLoadingMore(false);
            if (nextCount >= mockBlogs.length) {
                setHasMoreResults(false);
            }
        }, 1000);
    };


    return (
        <div className="min-h-screen bg-background w-full">


            <main className="max-w-6xl mx-auto ">
                {/* Hero Section */}
                {/* <div className="text-center mb-12"> */}
                {/* <Badge className="mb-4 text-sm">Blog</Badge> */}
                {/* <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Discover our latest articles
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the achievements that set us apart. From groundbreaking projects to industry accolades.
                    </p> */}
                {/* </div> */}

                {/* Category Filter */}
                <div className="mb-8 flex items-center justify-left space-x-3 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="default"
                            size="sm"
                            className="rounded-full whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Featured Blogs */}
                {mockBlogs.slice(0, 2).some(b => b.featured) && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                            <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                            Featured Articles
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {mockBlogs.slice(0, 2).map((blog) => (
                                <Card
                                    key={blog.id}
                                    className={`group bg-white overflow-hidden border-border hover:shadow-xl transition-all duration-300 ${isDark
                                        ? "bg-black border-gray-700 hover:bg-gray-800/70"
                                        : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"}`}
                                >
                                    {blog.image && (
                                        <div className="relative overflow-hidden aspect-[2/1]">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 `}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <Badge className="absolute top-4 left-4 bg-primary">
                                                {blog.category}
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={blog.authorAvatar}
                                                    alt={blog.author}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{blog.author}</p>
                                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                        <span>{blog.publishedDate}</span>
                                                        <span>•</span>
                                                        <span>{blog.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="rounded-full">
                                                <Bookmark className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Blogs Grid */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">All Articles</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockBlogs.slice(2).map((blog) => (
                        <Card
                            key={blog.id}
                            className={`group ${isDark
                                ? "bg-black border-gray-700 hover:bg-gray-800/70"
                                : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"} overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col`}
                        >
                            {blog.image && (
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground backdrop-blur-sm">
                                        {blog.category}
                                    </Badge>
                                </div>
                            )}

                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {blog.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                </div>

                                <div className="border-t border-border pt-4 mt-auto">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={blog.authorAvatar}
                                                alt={blog.author}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <p className="text-xs font-medium text-foreground">{blog.author}</p>
                                                <p className="text-xs text-muted-foreground">{blog.publishedDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
                                                <Share2 className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{blog.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
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
                {!hasMoreResults && displayedBlog.length > 0 && (
                    <div className="flex items-center justify-center mt-8 py-8">
                    </div>
                )}
            </main>
        </div>
    );
};

export default Discussions;
