import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Phone, Menu } from "lucide-react";
import AieroInterface from "./AieroInterface";
import Header from "./Header";
import Footer from "./Footer";
import AieroLandingPage from "./AieroLanding";
import ScrollSignInPopup from "./ScrollSignInPopup"
const HeroSection = () => {
  return (
    <>
      <Header />
   {/* <ScrollSignInPopup/> */}
      <section className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)]">
        {/* Animated background elements - Responsive positioning */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 lg:-top-40 lg:-right-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
          <div
            className="absolute -bottom-20 -left-20 sm:-bottom-32 sm:-left-32 lg:-bottom-40 lg:-left-40 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-100 rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/4 left-1/6 sm:top-1/3 sm:left-1/4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Top badge - Responsive */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 sm:px-4 shadow-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-800">
                  Introducing Bharat AI
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Beta
                </span>
              </div>
            </div>

            {/* Main heading - Highly responsive typography */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  AI-Powered
                </span>
                <span className="text-gray-900 block">Writing Suite</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
                Transform your ideas into compelling content with our
                intelligent writing assistant. From emails to blogs, let AI
                elevate your writing.
              </p>
            </div>

            {/* CTA buttons - Mobile-first responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-14 lg:mb-16 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-4 py-3 sm:py-2 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-auto border-0"
              >
                Start Creating
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-6 sm:px-4 py-3 sm:py-2 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 h-auto bg-white"
              >
                Watch Demo
              </Button>
            </div>

            {/* Service cards - Fully responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-full mx-auto px-2 sm:px-4">
              {/* API Integration Card */}
              <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col sm:flex-row gap-2">
                  <span className="bg-white text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full">
                    AI Solutions
                  </span>
                  <span className="bg-white text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full">
                    AI Services
                  </span>
                </div>

                <div className="mt-12 sm:mt-8 mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-white leading-tight">
                    API integration to your business model for effective working
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-teal-500 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 h-auto bg-transparent mt-4"
                  >
                    Explore more
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </Button>
                </div>

                {/* Decorative 3D element - Responsive sizing */}
                <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full transform translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 lg:translate-x-8 lg:translate-y-8 opacity-80">
                  <div className="absolute inset-2 sm:inset-3 lg:inset-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Y
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>

              {/* Documentation Card */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                    Accompanying documentation for all services and products
                  </h3>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-white leading-relaxed">
                    Explore limitless possibilities with our intelligent
                    solutions. Embrace the power of artificial intelligence
                    today.
                  </p>
                </div>

                {/* User rating - Responsive layout */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <div className="flex -space-x-1 sm:-space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex text-yellow-400 text-sm sm:text-base">
                    ★★★★★
                  </div>
                  <span className="text-blue-100 text-xs sm:text-sm">
                    200+ users
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold opacity-20 absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                  20k
                </div>
                <div className="text-blue-100 text-xs sm:text-sm absolute bottom-3 sm:bottom-4 left-6 sm:left-10">
                  downloads
                </div>
              </div>

              {/* Technical Support Card */}
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] sm:col-span-2 lg:col-span-1">
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div className="mt-12 sm:mt-16 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white leading-tight">
                    Technical support for the entire service life
                  </h3>
                  <p className="text-white text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                    Instant assistance for all your queries. Experience seamless
                    service with our AI-powered.
                  </p>
                </div>

                {/* Decorative pattern - Responsive sizing */}
                <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 opacity-20">
                  <div className="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-4">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Fully responsive */}
      <section className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-12 sm:py-16 lg:py-20 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left Column - Main Content */}
            <div>
              <div className="inline-block bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-6 sm:mb-8">
                [ about ]
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Explore limitless possibilities with our intelligent solutions
              </h2>

              {/* Large number display - Responsive sizing */}
              <div className="flex items-baseline gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  270k
                </span>
                <div className="text-gray-900">
                  <div className="text-lg sm:text-xl font-semibold">
                    AI Solutions
                  </div>
                  <div className="text-base sm:text-lg text-gray-600">
                    for our clients
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:pt-8 xl:pt-16">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                AIERO is a leading AI agency committed to transforming
                businesses through cutting-edge artificial intelligence
                solutions. We specialize in delivering tailored AI strategies
                that drive innovation, optimize processes, and unlock new
                opportunities for growth.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                With a team of experts in machine learning, data science, and
                advanced analytics, we help companies harness the power of AI to
                solve complex challenges and gain a competitive edge. From
                predictive analytics and intelligent automation to natural
                language processing and computer vision, AIERO empowers
                organizations to thrive in the digital age with intelligent,
                scalable, and sustainable solutions.
              </p>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 h-auto bg-white group"
              >
                Explore more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Bottom Section - Feature Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
            {/* AI Technology */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-80"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                AI Technology
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Emphasize the expertise and knowledge of your team in developing
                and implementing neural networks
              </p>
            </div>

            {/* Tailored Solutions */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl opacity-80 transform rotate-12"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Tailored solutions
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Mention your ability to customize solutions based on specific
                business requirements
              </p>
            </div>

            {/* Cutting-edge Technology */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-80"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Cutting-edge technology
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Highlight your use of the latest tools and techniques in neural
                network development
              </p>
            </div>

            {/* Modern Development */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-80 transform -rotate-12"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Modern development
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Showcase successful case studies or client testimonials that
                demonstrate the effectiveness of your services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Network Section - Fully responsive */}
      <section className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-12 sm:py-16 lg:py-20 px-3 sm:px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          {/* SVG X Section - Responsive sizing */}
          <div className="flex items-center justify-center lg:justify-start mb-8 sm:mb-10 lg:mb-0 order-2 lg:order-1">
            <svg
              viewBox="0 0 400 400"
              className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] xl:w-[700px] xl:h-[700px] lg:-ml-[150px] xl:-ml-[250px] transition-all duration-500"
              fill="none"
            >
              <defs>
                <linearGradient id="outlineX" x1="0" y1="0" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>

              <polygon
                points="60,60 170,60 190,140 80,140"
                stroke="url(#outlineX)"
                strokeWidth="1"
                fill="none"
                className="opacity-30"
              />
              <polygon
                points="320,260 210,260 230,340 340,340"
                stroke="url(#outlineX)"
                strokeWidth="1"
                fill="none"
                className="opacity-30"
              />
              <polygon
                points="340,60 230,60 60,340 170,340"
                stroke="url(#outlineX)"
                strokeWidth="1"
                fill="none"
                className="opacity-30"
              />
            </svg>
          </div>

          {/* Right Column - Content - Responsive text and layout */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Tinker with a{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Neural Network right here
                </span>{" "}
                in your browser. Don't worry, you can't break it. We Promise.
              </h2>
            </div>

            {/* Partner/Client Logos - Responsive grid */}
            <div className="pt-6 sm:pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center opacity-60">
                {/* Logo 1 - MINIMIZE INTERIOR */}
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-600 tracking-wider">
                    MINIMIZE
                  </div>
                  <div className="text-xs font-medium text-gray-600 tracking-wider">
                    INTERIOR
                  </div>
                </div>

                {/* Logo 2 - N02 */}
                <div className="text-center">
                  <div className="bg-gray-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold inline-block">
                    N02
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Nordyne</div>
                  <div className="text-xs text-gray-600">Brand</div>
                  <div className="text-xs text-gray-600">Systems</div>
                </div>

                {/* Logo 3 - Metrika */}
                <div className="text-center">
                  <div className="border-2 border-gray-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 mx-auto flex items-center justify-center mb-2">
                    <span className="text-sm font-medium text-gray-700">M</span>
                  </div>
                  <div className="text-xs text-gray-600">Metrika</div>
                  <div className="text-xs text-gray-600">Design Studio</div>
                </div>

                {/* Logo 4 - QUO LEGAL */}
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-600 mb-1">
                    QUO
                  </div>
                  <div className="text-xs text-gray-600 tracking-wider">
                    LEGAL
                  </div>
                  <div className="text-xs text-gray-600 tracking-wider">
                    FIRM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AieroInterface />
      <AieroLandingPage />
      <Footer />
    </>
  );
};

export default HeroSection;