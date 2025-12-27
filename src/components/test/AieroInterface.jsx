import React, { useState } from 'react';
import { Play, Globe, MessageSquare, Shield, BarChart3, Layers, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const AieroInterface = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const integrationIcons = [
    { name: 'Slack', color: 'bg-green-500', icon: '#' },
    { name: 'Jira', color: 'bg-blue-500', icon: 'J' },
    { name: 'Messenger', color: 'bg-purple-500', icon: 'M' },
    { name: 'Skype', color: 'bg-blue-400', icon: 'S' },
    { name: 'Telegram', color: 'bg-blue-600', icon: 'T' },
    { name: 'Discord', color: 'bg-indigo-600', icon: 'D' }
  ];

  const features = [
    {
      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      title: "Natural Language Processing (NLP)",
      description: "Understand, interpret, and generate human language for enhanced communication.",
      color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      title: "Scalability & Flexibility",
      description: "Easily scale AI applications to handle growing data and user demands.",
      color: "bg-green-50 border-green-200 text-green-600"
    },
    {
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      title: "Customizable Dashboards",
      description: "Interactive dashboards for real-time insights and performance monitoring.",
      color: "bg-purple-50 border-purple-200 text-purple-600"
    },
    {
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      title: "Robust Security",
      description: "Implement AI-based security measures to detect and prevent threats in real time.",
      color: "bg-orange-50 border-orange-200 text-orange-600"
    }
  ];

  const neuralNetworkFeatures = [
    {
      title: "Feedforward Process",
      description: "The inputs are multiplied by their respective weights, summed up, and passed through the activation function.",
      icon: "03"
    },
    {
      title: "Activation Function",
      description: "The inputs are multiplied by their respective weights, summed up, and passed through the activation function.",
      icon: "01"
    },
    {
      title: "Neurons and Layers",
      description: "A neural network consists of interconnected nodes called neurons. Neurons are organized into layers.",
      icon: "02"
    },
     {
      title: "Neurons and Layers",
      description: "A neural network consists of interconnected nodes called neurons. Neurons are organized into layers.",
      icon: "02"
    },
     {
      title: "Neurons and Layers",
      description: "A neural network consists of interconnected nodes called neurons. Neurons are organized into layers.",
      icon: "02"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % neuralNetworkFeatures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? neuralNetworkFeatures.length - 1 : prev - 1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] text-gray-800 relative overflow-hidden">
      {/* Top moving banner - Updated for light theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 transform -rotate-1 -mt-2 mb-2 sm:mb-4 py-2 sm:py-3 lg:py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 lg:px-8">
            Join ChatGPT in shaping the future of technology for the whole world.
          </span>
          <span className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 lg:px-8">
            Join ChatGPT in shaping the future of technology for the whole world.
          </span>
          <span className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 lg:px-8">
            Join ChatGPT in shaping the future of technology for the whole world.
          </span>
          <span className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4 sm:px-6 lg:px-8">
            Join ChatGPT in shaping the future of technology for the whole world.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Hero Section - Light theme updates */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] mb-12 sm:mb-16 lg:mb-20">
          <div className="relative order-2 lg:order-1">
            {/* Main AIERO Card - Light theme gradient */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-96">
              {/* Diagonal lines pattern */}
              <div className="absolute inset-0 opacity-20 sm:opacity-30">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  {[...Array(20)].map((_, i) => (
                    <line
                      key={i}
                      x1={i * 25 - 100}
                      y1="0"
                      x2={i * 25 + 200}
                      y2="400"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>

              {/* AIERO Branding */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
                    Bharat Ai
                  </h1>
                </div>

                {/* Watch intro section */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" />
                  </div>
                  <span className="text-white/90 text-xs sm:text-sm">Watch video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content with dark text */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6 text-gray-800">
                Embrace the power of{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  artificial intelligence
                </span>{' '}
                today
              </h2>
              
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                AI strategies that drive innovation, optimize processes, and unlock new opportunities for growth.
              </p>
            </div>

            {/* Features List - Light theme colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Fine-tuning models</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Embedding models</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">InstructGPT</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Artificial Intelligence</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Chat bots</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">MLJourney</span>
                </div>
              </div>
            </div>

            {/* CTA Button - Light theme hover */}
            <div className="pt-4 sm:pt-6 lg:pt-8">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Explore more
              </button>
            </div>
          </div>
        </div>

        {/* Features Section - Light theme */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <span className="text-orange-600 text-xs sm:text-sm font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              [ features ]
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left side - Title and description */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-gray-800">
                Powerful AI features driving innovation and{' '}
                <span className="text-gray-500">intelligent transform</span>
              </h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                AIERO empowers organizations to thrive in the digital age with intelligent, scalable, 
                and sustainable solutions. Partner with us to navigate the future of technology and 
                achieve unparalleled business success.
              </p>

              {/* Large watermark text */}
              <div className="relative hidden sm:block">
                <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-200 absolute -top-4 sm:-top-6 lg:-top-8 -left-2 sm:-left-4 select-none">
                  Aiero
                </div>
              </div>
            </div>

            {/* Right side - Mock chat interface - Light theme */}
            <div className="relative order-1 lg:order-2">
              {/* 3D layered background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-xl sm:rounded-2xl transform rotate-2 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-cyan-200/20 rounded-xl sm:rounded-2xl transform -rotate-1 scale-102"></div>
              
              {/* Main chat interface */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <h4 className="text-gray-800 font-semibold text-sm sm:text-base">Messages</h4>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-3 sm:space-y-4">
                  {/* User avatars list */}
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    <div className="flex -space-x-1 sm:-space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border border-white sm:border-2 flex items-center justify-center text-xs font-bold text-white ${
                          ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-cyan-500', 'bg-pink-500'][i]
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span>Team Chat</span>
                  </div>

                  {/* Sample messages */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">A</div>
                      <div className="bg-gray-100 rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2 max-w-[70%] sm:max-w-xs">
                        <p className="text-xs sm:text-sm text-gray-800">How's the AI project going? Any updates on the neural network?</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 justify-end">
                      <div className="bg-blue-500 rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2 max-w-[70%] sm:max-w-xs">
                        <p className="text-xs sm:text-sm text-white">Making great progress! The model accuracy improved by 15%.</p>
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">B</div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">C</div>
                      <div className="bg-gray-100 rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2 max-w-[70%] sm:max-w-xs">
                        <p className="text-xs sm:text-sm text-gray-800">That's awesome! Ready for deployment?</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 justify-end">
                      <div className="bg-blue-500 rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2 max-w-[70%] sm:max-w-xs">
                        <p className="text-xs sm:text-sm text-white">Almost there! Running final tests.</p>
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">D</div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full px-3 sm:px-4 py-1 sm:py-2">
                      <span className="text-gray-500 text-xs sm:text-sm">Type a message...</span>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid - Light theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {features.map((feature, index) => (
              <div key={index} className={`p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border ${feature.color} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{feature.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Neural Networks Section - Light theme */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <span className="text-orange-600 text-xs sm:text-sm font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              [ how it works ]
            </span>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-8 text-gray-800">
              Neural networks are a fundamental component of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>{' '}
              (AI) systems
            </h3>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
              <button 
                className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button 
                className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                onClick={nextSlide}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Neural network features - Light theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {neuralNetworkFeatures.slice(0, 3).map((feature, index) => (
              <div key={index} className={`text-center p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border hover:border-blue-300 transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-50 border-blue-300' : 'bg-white/70 border-gray-200'
              }`}>
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{feature.icon}</span>
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section - Light theme */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4 sm:gap-0">
            <div className="flex-1">
              <span className="text-orange-600 text-xs sm:text-sm font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-200 mb-3 sm:mb-4 inline-block">
                projects
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl text-gray-800">
                Exploring groundbreaking AI projects transforming industries and driving innovation
              </h3>
            </div>
            <div className="text-right self-start sm:self-end">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-200 mb-1 sm:mb-2">200+</div>
              <div className="text-gray-500 text-xs sm:text-sm transform rotate-90 origin-bottom-left hidden sm:block">
                Projects
              </div>
              <div className="text-gray-500 text-xs sm:text-sm sm:hidden">
                Projects
              </div>
            </div>
          </div>

          {/* Scrollable Projects Container - Light theme */}
          <div className="relative">
            <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
              {/* Project Card 1 */}
              <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] bg-white/70 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 relative overflow-hidden group hover:bg-gradient-to-br hover:from-purple-50 hover:via-blue-50 hover:to-cyan-50 transition-all duration-500 hover:border-cyan-300 flex-shrink-0">
                <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full border border-gray-300 group-hover:border-cyan-300 group-hover:text-cyan-600 transition-all duration-300">
                    AI Solution
                  </span>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                    NeuroForge: Crafting Future-Ready AI Solutions for Industry Innovation
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    The inputs are multiplied by their respective weights, summed up.
                  </p>
                  <button className="flex items-center gap-1 sm:gap-2 text-cyan-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Explore more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Project Card 2 - Featured with gradient */}
              <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] bg-white/70 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 relative overflow-hidden group hover:bg-gradient-to-br hover:from-purple-50 hover:via-blue-50 hover:to-cyan-50 transition-all duration-500 hover:border-cyan-300 flex-shrink-0">
                {/* Flowing wave animation */}
                
                <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full border border-gray-300 group-hover:border-cyan-300 group-hover:text-cyan-600 transition-all duration-300">
                    AI Solution
                  </span>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-cyan-700 transition-colors duration-300 leading-tight">
                    NeuroForge: Crafting Future-Ready AI Solutions for Industry Innovation
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    The inputs are multiplied by their respective weights, summed up.
                  </p>
                  <button className="flex items-center gap-1 sm:gap-2 text-cyan-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Explore more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] bg-white/70 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 relative overflow-hidden group hover:bg-gradient-to-br hover:from-green-50 hover:via-emerald-50 hover:to-teal-50 transition-all duration-500 hover:border-emerald-300 flex-shrink-0">
                <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full border border-gray-300 group-hover:border-emerald-300 group-hover:text-emerald-600 transition-all duration-300">
                    Integration
                  </span>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                    SentientSolutions: Crafting Smart Solutions in Every AI Project Venture
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Advanced integration capabilities for seamless AI deployment.
                  </p>
                  <button className="flex items-center gap-1 sm:gap-2 text-emerald-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Explore more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] bg-white/70 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 relative overflow-hidden group hover:bg-gradient-to-br hover:from-orange-50 hover:via-red-50 hover:to-pink-50 transition-all duration-500 hover:border-pink-300 flex-shrink-0">
                <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full border border-gray-300 group-hover:border-pink-300 group-hover:text-pink-600 transition-all duration-300">
                    Development
                  </span>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-pink-700 transition-colors duration-300 leading-tight">
                    DeepVision: Advanced Computer Vision Solutions for Modern Enterprises
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Revolutionary computer vision technology for next-gen applications.
                  </p>
                  <button className="flex items-center gap-1 sm:gap-2 text-pink-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Explore more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Project Card 5 */}
              <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] bg-white/70 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 relative overflow-hidden group hover:bg-gradient-to-br hover:from-indigo-50 hover:via-purple-50 hover:to-violet-50 transition-all duration-500 hover:border-violet-300 flex-shrink-0">
                <div className="absolute top-4 sm:top-5 lg:top-6 left-4 sm:left-5 lg:left-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full border border-gray-300 group-hover:border-violet-300 group-hover:text-violet-600 transition-all duration-300">
                    Analytics
                  </span>
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-4 sm:left-5 lg:left-6 right-4 sm:right-5 lg:right-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-violet-700 transition-colors duration-300 leading-tight">
                    DataMind: Intelligent Analytics Platform for Strategic Decision Making
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Powerful analytics engine for data-driven business insights.
                  </p>
                  <button className="flex items-center gap-1 sm:gap-2 text-violet-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Explore more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <div className="flex gap-1 sm:gap-2">
                <div className="w-6 h-1 sm:w-8 sm:h-1 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-1 sm:w-4 sm:h-1 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-1 sm:w-4 sm:h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section - Light theme */}
        <div className="text-center py-12 sm:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
              Ready to transform your business with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI?
              </span>
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              Join thousands of organizations already using AIERO to drive innovation and achieve unprecedented growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started Today
              </button>
              <button className="w-full sm:w-auto border border-gray-400 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* Custom scrollbar styles - Light theme */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        
        @media (min-width: 640px) {
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
        }
        
        .scrollbar-track-gray-200::-webkit-scrollbar-track {
          background-color: rgba(229, 231, 235, 0.8);
          border-radius: 3px;
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.8);
          border-radius: 3px;
        }
        
        .scrollbar-thumb-gray-400:hover::-webkit-scrollbar-thumb {
          background-color: rgba(107, 114, 128, 1);
        }

        /* Enhanced mobile touch scrolling */
        @media (max-width: 640px) {
          .scrollbar-thin {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }
        }
      `}</style>
    </div>
  );
};

export default AieroInterface;