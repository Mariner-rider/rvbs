import React from "react";
import { ChevronRight, Play } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-4 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section - Ultra Responsive */}
          <div className="relative w-full h-80 overflow-hidden rounded-3xl mb-8">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
              {/* Flowing shapes */}
              <div className="absolute inset-0">
                {/* Large flowing shape 1 */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl transform rotate-12"></div>

                {/* Large flowing shape 2 */}
                <div className="absolute top-10 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/40 to-transparent rounded-full blur-2xl transform -rotate-45"></div>

                {/* Medium flowing shape 3 */}
                <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-2xl transform rotate-45"></div>

                {/* Large flowing shape 4 */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl transform -rotate-12"></div>

                {/* Medium flowing shape 5 */}
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-300/25 to-transparent rounded-full blur-2xl transform rotate-30"></div>

                {/* Abstract curved elements */}
                <div className="absolute top-16 left-32 w-64 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl transform rotate-45 skew-x-12"></div>

                <div className="absolute bottom-16 right-32 w-56 h-40 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-xl transform -rotate-30 skew-y-12"></div>
              </div>

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              {/* Main Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-5xl font-light text-white">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section - Enhanced Responsiveness */}
        <div className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            {/* Section Tag */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <span className="text-gray-600 text-xs sm:text-sm">
                [ about ]
              </span>
            </div>

            {/* Main Heading - Ultra Responsive */}
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Awesome things in working with Bharat AI WordPress theme
              </h2>
            </div>

            {/* Two-Column Layout - Responsive Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-6xl mx-auto">
              {/* Left Side - Large Bharat AI Text */}
              <div className="flex justify-center items-center order-2 lg:order-1">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-gray-500 tracking-wider transform rotate-1">
                    Bharat Ai
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    At XXLando, we are a leading AI services provider dedicated
                    to delivering innovative solutions that leverage artificial
                    intelligence to transform businesses.
                  </p>
                  <p>
                    Our team of experts specializes in cutting-edge AI
                    technologies, offering customized strategies and
                    implementations to help you stay ahead in today's
                    data-driven world. Unlock the full potential of AI with
                  </p>
                  <p>
                    XXLando, your trusted partner in the future of intelligent
                    technology stay ahead in today's data-driven world. Unlock
                    the full potential of AI with XXLando, your trusted partner
                    in the future of intelligent technology stay ahead in
                    today's.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Section - Responsive */}
        <div className="relative overflow-hidden py-2 sm:py-3 md:py-4 mb-2 sm:mb-3 md:mb-4">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 md:px-8">
              Neural Networks in shaping the future of technology.
            </span>
            <span className="text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 md:px-8">
              Neural Networks in shaping the future of technology.
            </span>
            <span className="text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 md:px-8">
              Neural Networks in shaping the future of technology.
            </span>
          </div>
        </div>

        {/* Mission and Vision Cards - Ultra Responsive */}
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Mission Card - Dark */}
            <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 opacity-30">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-teal-400">
                  XXX
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
                  Mission
                </h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                  <p>
                    Certainly, crafting a clear and inspiring mission statement
                    is essential for a development company. It should reflect
                    your company's values, purpose, and long-term objectives.
                    Here's a sample mission statement for a development company.
                  </p>
                  <p>
                    At Bharat AI our mission is to empower businesses and
                    organizations through innovative development solutions. We
                    are committed to delivering exceptional, tailored software,
                    websites, and applications that not only meet our clients.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Gradient Card with Abstract Design */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-white relative overflow-hidden">
              {/* Abstract background shapes - Responsive */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-2xl sm:blur-3xl -translate-y-10 sm:-translate-y-20 translate-x-10 sm:translate-x-20"></div>
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-28 sm:w-42 md:w-56 h-28 sm:h-42 md:h-56 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full blur-2xl sm:blur-3xl translate-y-10 sm:translate-y-20 -translate-x-10 sm:-translate-x-20"></div>
                <div className="absolute top-1/2 right-5 sm:right-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-br from-blue-400/25 to-purple-400/25 rounded-full blur-lg sm:blur-xl"></div>
              </div>

              <div className="relative z-10">
                {/* Large Number - Responsive */}
                <div className="text-right mb-4 sm:mb-6 md:mb-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold opacity-90 leading-none">
                    500+
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg opacity-80 mt-1 sm:mt-2">
                    Created projects
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-8 sm:mb-12 md:mb-16 leading-tight">
                  we create a professional product using artificial intelligence
                </h3>

                {/* Bottom section */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 sm:gap-3 text-white hover:bg-white/20 border border-white/30 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />
                    </div>
                    <span className="font-medium">Watch video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Network Section with Pentagons - Enhanced Responsiveness */}
        <section className="relative bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Geometric Pattern Background - Responsive */}
          <div className="absolute inset-0 opacity-5 sm:opacity-10 z-0">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 800"
            >
              <defs>
                <pattern
                  id="hexPattern"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                  className="sm:w-24 sm:h-24"
                >
                  <polygon
                    points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="1"
                    className="sm:stroke-2"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>
          </div>

          {/* Container for proper spacing */}
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            {/* Two Column Layout - Ultra Responsive */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* Left: Random Pentagons - Responsive Positioning - Hidden on mobile to prevent overlap */}
              <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-full">
                {/* Random Pentagon Positions - Only visible on large screens */}
                <div className="absolute top-16 left-16 w-16 h-16 opacity-40 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute top-32 left-32 w-12 h-12 opacity-50 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute top-48 left-20 w-20 h-20 opacity-30 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-32 left-24 w-14 h-14 opacity-35 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-48 left-40 w-12 h-12 opacity-45 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute top-24 left-48 w-10 h-10 opacity-40 animate-pulse">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Subtle pentagons for tablets */}
                <div className="absolute top-1/4 right-1/4 w-8 h-8 opacity-20 animate-pulse xl:w-12 xl:h-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-1/4 right-1/3 w-6 h-6 opacity-25 animate-pulse xl:w-10 xl:h-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>

              {/* Right: Content - Ultra Responsive */}
              <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
                <div className="max-w-2xl w-full text-center lg:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 sm:mb-8 lg:mb-12">
                    <span className="text-gray-900">Tinker with a </span>
                    <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Neural Network
                    </span>
                    <span className="text-gray-900">
                      {" "}
                      right here in your browser. Don't worry, you can't break
                      it. We promise.
                    </span>
                  </h1>

                  {/* Company Logos - Optimized Grid to prevent overlap */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10 max-w-lg mx-auto lg:mx-0">
                    {/* Minimize Interior */}
                    <div className="flex flex-col items-center lg:items-start opacity-60 hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3">
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light text-gray-600 tracking-wider">
                        MINIMIZE
                      </div>
                      <div className="text-xs text-gray-500 mt-1">INTERIOR</div>
                    </div>

                    {/* ND2 */}
                    <div className="flex flex-col sm:flex-row items-center lg:items-start opacity-60 hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3">
                      <div className="bg-gray-400 text-white px-2 py-1 sm:px-3 sm:py-1 rounded font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-0 sm:mr-2">
                        ND2
                      </div>
                      <div className="text-gray-600 text-center sm:text-left">
                        <div className="text-xs sm:text-sm font-medium">
                          Nordyne
                        </div>
                        <div className="text-xs">Defense Dynamics</div>
                      </div>
                    </div>

                    {/* Metriks */}
                    <div className="opacity-60 hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3">
                      <div className="border-2 border-gray-400 rounded-full px-2 py-1 sm:px-3 sm:py-2 text-center">
                        <div className="text-gray-600 font-medium text-xs sm:text-sm">
                          Metriks
                        </div>
                        <div className="text-xs text-gray-500">Data Center</div>
                      </div>
                    </div>

                    {/* QUO Legal Firm */}
                    <div className="flex flex-col sm:flex-row items-center lg:items-start opacity-60 hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3">
                      <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-gray-400 mb-1 sm:mb-0 sm:mr-2">
                        QUO
                      </div>
                      <div className="text-gray-600 text-center sm:text-left">
                        <div className="text-xs sm:text-sm font-medium">
                          LEGAL
                        </div>
                        <div className="text-xs">FIRM</div>
                      </div>
                    </div>
                  </div>

                  {/* Small decorative pentagons for mobile - positioned to not overlap */}
                  <div className="lg:hidden mt-8 flex justify-center space-x-8 opacity-20">
                    <div className="w-4 h-4 animate-pulse">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                          points="50,10 90,35 75,85 25,85 10,35"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="w-3 h-3 animate-pulse">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                          points="50,10 90,35 75,85 25,85 10,35"
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="w-4 h-4 animate-pulse">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                          points="50,10 90,35 75,85 25,85 10,35"
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section - Ultra Responsive */}
        <section className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 md:gap-16">
              {/* Left Side - Content */}
              <div className="lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="text-xs sm:text-sm text-gray-600 tracking-wide">
                  [ team ]
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  The Neural Network experts: uniting talent for intelligent
                  solutions
                </h2>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  Awesome team members
                </p>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base mx-auto lg:mx-0">
                  Explore more
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Right Side - Team Grid - Ultra Responsive */}
              <div className="lg:w-1/2 w-full">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {/* Team Member 1 - Alan Begham */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-60 md:h-72 lg:h-80 relative">
                      {/* Photo placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                            👨
                          </span>
                        </div>
                      </div>

                      {/* Watermark text - Responsive */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-white/20 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold rotate-90 transform">
                          Aiaro
                        </div>
                      </div>

                      {/* Share button */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                      </div>

                      {/* Name overlay - Responsive */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 md:p-4 text-white">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg">
                          Alan Begham
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300">
                          / CEO Aiaro /
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 2 - Arthur Dowson */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-60 md:h-72 lg:h-80 relative">
                      {/* Photo placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                            👨
                          </span>
                        </div>
                      </div>

                      {/* Watermark text */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold rotate-90 transform">
                          Solution
                        </div>
                      </div>

                      {/* Share button */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                      </div>

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 md:p-4 text-white">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg">
                          Arthur Dowson
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300">
                          / AI Programmer /
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 3 - Dan Smith */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-60 md:h-72 lg:h-80 relative">
                      {/* Photo placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                            👨
                          </span>
                        </div>
                      </div>

                      {/* Watermark text */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold rotate-90 transform">
                          Neural
                        </div>
                      </div>

                      {/* Share button */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                      </div>

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 md:p-4 text-white">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg">
                          Dan Smith
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300">
                          / Manager /
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 4 - Brandon Adams */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-60 md:h-72 lg:h-80 relative">
                      {/* Photo placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                            👨
                          </span>
                        </div>
                      </div>

                      {/* Watermark text */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-white/20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold rotate-90 transform">
                          Neural
                        </div>
                      </div>

                      {/* Share button */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                      </div>

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 md:p-4 text-white">
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg">
                          Brandon Adams
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300">
                          / HR Neuro /
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Ultra Responsive */}
        <section className=" text-black py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16">
              {/* Left Side - Content */}
              <div className="lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8">
                <div className="text-xs sm:text-sm text-gray-400 tracking-wide">
                  [ get in touch ]
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  We are always ready to help you and answer your questions
                </h2>

                <p className="text-black leading-relaxed text-sm sm:text-base">
                  Pacific hake false trevally queen parrotfish black prickleback
                  mosshead warbonnet sweeper! Greenling sleeper.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {/* Call Center */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base sm:text-lg">
                      Contact
                    </h4>
                    <p className="text-gray-800 text-sm sm:text-base">
                     +91-05124050467
                    </p>
                
                  </div>

                  {/* Our Location */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base sm:text-lg">
                      Our Location
                    </h4>
                    <p className="text-gray-800 text-sm sm:text-base">
                      Lucknow, Uttar Pradesh, India
                    </p>
                    
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-base sm:text-lg">Email</h4>
                  <div className="bg-white text-black px-3 sm:px-4 py-1 sm:py-2 rounded-xl inline-block">
                    <span className="font-medium text-sm sm:text-base">
                      Contact@bharatai.bsearch.in
                    </span>
                  </div>
                </div>
              </div>
              {/* Right Side - Contact Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-gray-900">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                    Get in Touch
                  </h3>

                  <form className="space-y-4 sm:space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Message"
                        rows="4"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg font-medium transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base"
                    >
                      Send message
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Animation Styles */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }

          /* Custom breakpoint for extra small devices */
          @media (max-width: 480px) {
            .xs\\:h-56 {
              height: 14rem;
            }
          }

          /* Ensure proper scaling on very small devices */
          @media (max-width: 320px) {
            .text-xs {
              font-size: 0.65rem;
            }
            .text-sm {
              font-size: 0.75rem;
            }
            .text-base {
              font-size: 0.85rem;
            }
            .text-lg {
              font-size: 0.95rem;
            }
            .text-xl {
              font-size: 1.1rem;
            }
            .text-2xl {
              font-size: 1.3rem;
            }
            .text-3xl {
              font-size: 1.6rem;
            }
            .text-4xl {
              font-size: 2rem;
            }
            .text-5xl {
              font-size: 2.5rem;
            }
          }

          /* Surface Pro and similar tablet optimizations */
          @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
            .md\\:text-responsive {
              font-size: 1.1rem;
            }
            .md\\:p-responsive {
              padding: 1.5rem;
            }
          }

          /* Foldable device optimizations */
          @media (min-width: 280px) and (max-width: 653px) {
            .fold\\:text-sm {
              font-size: 0.8rem;
            }
            .fold\\:p-2 {
              padding: 0.5rem;
            }
            .fold\\:gap-2 {
              gap: 0.5rem;
            }
          }

          /* iPhone SE and similar small devices */
          @media (max-width: 375px) {
            .se\\:text-xs {
              font-size: 0.6rem;
            }
            .se\\:p-1 {
              padding: 0.25rem;
            }
            .se\\:gap-1 {
              gap: 0.25rem;
            }
          }

          /* Nest Hub and large display optimizations */
          @media (min-width: 1024px) {
            .hub\\:text-xl {
              font-size: 1.25rem;
            }
            .hub\\:p-8 {
              padding: 2rem;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default About;
