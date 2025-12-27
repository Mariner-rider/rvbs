import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Facebook, Twitter, Linkedin, Youtube, Phone, Mail } from 'lucide-react';

const AieroLandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "manojchouh",
      rating: 5,
      text: "Nice theme with excellent support from the developers. All of my doubts and requests were fixed within a day."
    },
    {
      name: "sinilan",
      rating: 5,
      text: "Wonderful and clean design will create an excellent base for starting the new agency. Especially when you don't want to do design turnkey and are looking for something to help you make a fast and easy launch."
    },
    {
      name: "hikevin2000",
      rating: 5,
      text: "The customer support is excellent! Thank you Sergey for your quick response and everything you did for me!"
    },
    {
      name: "elkab 3",
      rating: 5,
      text: "Amazing customer support. I had one modifications and the customer support was super helpful and quick to answer them both."
    },
    {
      name: "kerim80",
      rating: 5,
      text: "Fast and good support. Theme easy to customize and many useable custom Elementor theme widgets! Nice work."
    },
    {
      name: "metintahayilma",
      rating: 5,
      text: "A perfect theme in every respect. They are very good especially in terms of support. I definitely recommend it. I bought dozens of themes. If I put them all on top of each other, it can't catch the success of this theme."
    }
  ];

  const blogPosts = [
    {
      category: "AI Trends",
      date: "21 Jan 2024",
      readTime: "5 min read",
      title: "How Natural Language Processing is revolutionizing Text Analysis",
      subtitle: "How AI is being used to provide personalized shopping experiences and improve customer satisfaction",
      image: "/api/placeholder/400/250"
    },
    {
      category: "Technology",
      date: "2 Jan 2024",
      readTime: "AI News",
      title: "How can I get started with Artificial Intelligence for my business?",
      subtitle: "A discussion on the ethical considerations and data privacy issues surrounding AI applications",
      image: "/api/placeholder/400/250"
    }
  ];

  const collaborators = [
    { name: "MINIMIZE INTERIOR", logo: "MI" },
    { name: "WEST", logo: "WEST" },
    { name: "NAUTILUS", logo: "N" },
    { name: "QUO LEGAL FIRM", logo: "QUO" },
    { name: "ARIMAX", logo: "A" },
    { name: "LOGO", logo: "L" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-blue-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Get number of testimonials to show based on screen size
  const getTestimonialsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3;
  };

  const [testimonialsToShow, setTestimonialsToShow] = useState(getTestimonialsToShow());

  useEffect(() => {
    const handleResize = () => {
      setTestimonialsToShow(getTestimonialsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]">
      {/* Testimonials Section */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex justify-center mb-3 sm:mb-4">
              {renderStars(5)}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 px-2 leading-tight">
              User stories: hear what others love about our{' '}
              <span className="text-blue-600">WordPress themes</span>!
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {testimonials.slice(currentTestimonial, currentTestimonial + testimonialsToShow).map((testimonial, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-lg shadow-sm border border-white/50 hover:bg-blue-50/70 transition-colors duration-300">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{testimonial.name}</h4>
                    <div className="flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-1.5 sm:p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
              <div className="flex space-x-1.5 sm:space-x-2">
                {Array.from({ length: Math.ceil(testimonials.length / testimonialsToShow) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i * testimonialsToShow)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                      Math.floor(currentTestimonial / testimonialsToShow) === i ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-1.5 sm:p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Blog Section */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Geometric Pattern */}
            <div className="relative order-2 lg:order-1">
              <div className="w-full h-48 sm:h-64 lg:h-96 flex items-center justify-center">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 opacity-10">
                  {Array.from({ length: 32 }, (_, i) => (
                    <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 border-gray-600 transform rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Blog</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 leading-tight">
                  Exploring the world of artificial intelligence with Aiero blogging
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {blogPosts.map((post, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl border border-white/50 hover:bg-blue-50/60 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
                        <span className="bg-blue-100 px-2 sm:px-3 py-1 rounded-full text-blue-800 whitespace-nowrap">{post.category}</span>
                        <span className="whitespace-nowrap">{post.date}</span>
                        <span className="whitespace-nowrap">{post.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <button className="px-2 sm:px-3 py-1 bg-white/70 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-300 hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap">
                          AI Trends
                        </button>
                        <button className="px-2 sm:px-3 py-1 bg-white/70 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-300 hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap">
                          Analytics
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{post.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collaborators Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">Partners</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-2 leading-tight">
                Our trusted collaborators<br />in progress and success
              </h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 opacity-60">
              {collaborators.map((collab, index) => (
                <div key={index} className="text-center flex-shrink-0">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-600">{collab.logo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero/CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-300 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          {/* Diagonal lines pattern */}
          <div className="absolute inset-0 opacity-10 sm:opacity-20">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white transform rotate-45"
                style={{
                  width: '200%',
                  top: `${i * 5}%`,
                  left: '-50%',
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Elevate your business<br />
            with our innovative<br />
            solutions
          </h1>
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default AieroLandingPage;