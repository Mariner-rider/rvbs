import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Users,
  MessageSquare,
  Video,
  Send,
  Hash,
   X,
} from "lucide-react";
import Header from "./Header";
import AiToolSection from "./AiToolSection";
import Footer from "./Footer";

const AiTools = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const companies = [
    { name: "MINIMIZE INTERIOR", logo: "MI" },
    { name: "ND2 Nordyne Defense", logo: "ND2" },
    { name: "Metriks Data Center", logo: "MD" },
    { name: "QUO LEGAL FIRM", logo: "QUO" },
    { name: "AGRIMAX", logo: "AG" },
    { name: "JKS Est.1996", logo: "JKS" },
  ];

  return (
    <>
    <Header />
      <div className="min-h-screen bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] text-gray-900 overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100"
          />
           <div className="absolute inset-0 bg-white/10 backdrop-blur pointer-events-none"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left Side - Abstract 3D Shape */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-600 rounded-full opacity-30 blur-3xl animate-pulse" />
                  <div className="absolute inset-4 sm:inset-6 lg:inset-8 bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-400 rounded-full opacity-50 blur-2xl animate-pulse delay-1000" />
                  <div
                    className="absolute inset-8 sm:inset-12 lg:inset-16 bg-gradient-to-br from-blue-600 via-cyan-300 to-purple-400 rounded-full opacity-70 blur-xl animate-spin"
                    style={{ animationDuration: "20s" }}
                  />
                  <div className="absolute inset-12 sm:inset-16 lg:inset-24 bg-gradient-to-br from-cyan-600 via-blue-400 to-purple-600 rounded-full opacity-60 blur-lg animate-bounce" />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Artificial
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Intelligence
                </span>
                <br />
                <span className="text-gray-900">in nowadays</span>
                <br />
                <span className="text-gray-900">life</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mummichog paradise fish! Triggerfish bango guppy opah sunfish
                bluntnose knifefish upside-down catfish cobia spookfish convict
                cichlid.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    Discover
                    <ArrowRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </span>
                </button>

                <button className="group px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 text-gray-700 rounded-full font-semibold transition-all duration-300 hover:border-blue-400 hover:bg-blue-50">
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    Watch video
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 bg-white/50 backdrop-blur-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center opacity-60">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 hover:opacity-100 transition-opacity duration-300 text-center sm:text-left"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {company.logo}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">
                      {company.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
              <div className="text-center lg:text-left">
                <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">
                  [ services ]
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">
                  Unique, ownable
                  <br />
                  intelligence
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm lg:text-base text-gray-700">
                Explore more
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Build Apps Card */}
              <div className="md:col-span-1 lg:col-span-1 lg:row-span-2">
                <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300 min-h-[300px] sm:min-h-[400px] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                  <div className="relative z-10 h-full flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 leading-tight text-gray-900">
                      Build, compare, and ship Generation apps in minutes
                    </h3>
                    <div className="mb-6 sm:mb-8">
                      <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
                    </div>
                    <div className="mt-auto">
                      <div className="text-4xl sm:text-6xl font-bold mb-2 text-gray-900">20K</div>
                      <div className="text-gray-600">happy customers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scale Spellbook Card */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-cyan-100 via-cyan-50 to-blue-100 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300 min-h-[250px] sm:min-h-[300px] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
                      Explore Scale Spellbook
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Triggerfish bluntnose knifefish upside-down catfish kfish
                      convict.
                    </p>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full opacity-60 blur-xl animate-pulse" />
                  </div>
                </div>
              </div>

              {/* OpenAI Card */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300 min-h-[250px] sm:min-h-[300px] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900/10 rounded-full mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600/30 rounded-full" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Open AI</h3>
                  </div>
                </div>
              </div>

              {/* Integrations Card */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300 min-h-[200px] sm:min-h-[250px] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                  <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900">
                        Keep flying with
                        <br />
                        your favorite service
                      </h3>
                    </div>
                    <div className="flex gap-2 sm:gap-4 flex-wrap">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-400 rounded-xl flex items-center justify-center">
                        <Hash className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400 rounded-xl flex items-center justify-center">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moving Text Section */}
        <div className="relative z-10 py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="relative w-full whitespace-nowrap">
            <div className="inline-block animate-marquee">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent px-4 sm:px-8">
                Changing the game for Artificial Intelligence
              </h2>
            </div>
            <div
              className="inline-block animate-marquee ml-4 sm:ml-8"
              aria-hidden="true"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent px-4 sm:px-8">
                Changing the game for Artificial Intelligence
              </h2>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">
                  [ about ]
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mt-4 mb-6 sm:mb-8 text-gray-900">
                  Our mission is to
                  <br />
                  accelerate the
                  <br />
                  development of AI
                  <br />
                  applications
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Triggerfish bluntnose knifefish upside-down catfish kfish
                  convict cichlid cat shark saw shark trout cod.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Pacific hake false trevally queen parrotfish black prickleback
                  moss revally queen parrotfish black prickleback moss. Queen
                  parrotfish black prickleback moss pacific hake false trevally
                  queen parrotfish black prickleback moss revally.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Mummichog paradise fish! Triggerfish bango guppy opah sunfish
                  bluntnose knifefish upside-down catfish cobia spookfish
                  convict cichlid.
                </p>

                <button className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto lg:mx-0 text-gray-700">
                  Explore more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Code Editor */}
              <div className="relative order-2 lg:order-1">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xl">
                  {/* VS Code Header */}
                  <div className="bg-gray-100 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 sm:ml-4 hidden sm:inline">
                        VISUAL STUDIO CODE
                      </span>
                    </div>
                  </div>

                  {/* File Tabs */}
                  <div className="bg-gray-50 px-3 sm:px-4 py-1 flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
                    <div className="text-xs text-gray-500 py-1 whitespace-nowrap">
                      📁 runtime.go
                    </div>
                    <div className="text-xs text-gray-500 py-1 whitespace-nowrap">
                      🟨 days_between.js
                    </div>
                    <div className="text-xs text-gray-500 py-1 whitespace-nowrap hidden sm:inline">
                      🔧 server.go
                    </div>
                    <div className="text-xs text-blue-600 py-1 border-b border-blue-600 whitespace-nowrap">
                      📄 Product.java
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-3 sm:p-4 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto bg-white">
                    <div className="text-gray-400">1</div>
                    <div className="text-gray-400">
                      2 <span className="text-purple-600">package</span>{" "}
                      <span className="text-blue-600">main</span>
                    </div>
                    <div className="text-gray-400">3</div>
                    <div className="text-gray-400">
                      4 <span className="text-purple-600">type</span>{" "}
                      <span className="text-blue-600">Run</span>{" "}
                      <span className="text-purple-600">struct</span> {"{"}
                    </div>
                    <div className="text-gray-400">
                      5 <span className="text-blue-600">Time</span>{" "}
                      <span className="text-green-600">int</span>{" "}
                      <span className="text-gray-500 hidden sm:inline">// in milliseconds</span>
                    </div>
                    <div className="text-gray-400">
                      6 <span className="text-blue-600">Results</span>{" "}
                      <span className="text-green-600">string</span>
                    </div>
                    <div className="text-gray-400">
                      7 <span className="text-blue-600">Failed</span>{" "}
                      <span className="text-green-600">bool</span>
                    </div>
                    <div className="text-gray-400">8 {"}"}</div>
                    <div className="text-gray-400">9</div>
                    <div className="text-gray-400 hidden sm:block">
                      10{" "}
                      <span className="text-gray-500">
                        // Get average runtime of successful runs in seconds
                      </span>
                    </div>
                    <div className="text-gray-400">
                      11 <span className="text-purple-600">func</span>{" "}
                      <span className="text-blue-600">
                        averageRuntimeInSeconds
                      </span>
                      (runs []<span className="text-blue-600">Run</span>){" "}
                      <span className="text-green-600">float64</span> {"{"}
                    </div>
                    <div className="text-gray-400">
                      12 <span className="text-purple-600">var</span>{" "}
                      <span className="text-blue-600">totalTime</span>{" "}
                      <span className="text-green-600">int</span>
                    </div>
                    <div className="text-gray-400 sm:block hidden">
                      13 <span className="text-purple-600">var</span>{" "}
                      <span className="text-blue-600">failedRuns</span>{" "}
                      <span className="text-green-600">int</span>
                    </div>
                    <div className="text-gray-400 sm:block hidden">
                      14 <span className="text-purple-600">for</span> _,{" "}
                      <span className="text-blue-600">run</span> :={" "}
                      <span className="text-purple-600">range</span> runs {"{"}
                    </div>
                    <div className="text-gray-400 sm:block hidden">
                      15 <span className="text-purple-600">if</span> run.Failed{" "}
                      {"{"}
                    </div>
                    <div className="text-gray-400 sm:block hidden">16 failedRuns++</div>
                    <div className="text-gray-400 sm:block hidden">
                      17 {"}"} <span className="text-purple-600">else</span>{" "}
                      {"{"}
                    </div>
                    <div className="text-gray-400 sm:block hidden">
                      18 totalTime += run.Time
                    </div>
                    <div className="text-gray-400 sm:block hidden">19 {"}"}</div>
                    <div className="text-gray-400 sm:block hidden">20 {"}"}</div>
                    <div className="text-gray-400 sm:block hidden">21</div>
                    <div className="text-gray-400 sm:block hidden">
                      22 averageRuntime :={" "}
                      <span className="text-green-600">float64</span>(totalTime)
                      / <span className="text-green-600">float64</span>(
                      <span className="text-purple-600">len</span>(runs) -
                      failedRuns) /{" "}
                      <span className="text-orange-500">1000</span>
                    </div>
                    <div className="text-gray-400 sm:block hidden">
                      23 <span className="text-purple-600">return</span>{" "}
                      averageRuntime
                    </div>
                    <div className="text-gray-400 sm:block hidden">24 {"}"}</div>
                  </div>

                  {/* Bottom Status Bar */}
                  <div className="bg-blue-500 px-3 sm:px-4 py-1 flex items-center justify-between text-xs">
                    <span className="text-white">▶ main</span>
                    <span className="text-white hidden sm:inline">UTF-8 | LF | Go</span>
                    <span className="text-white sm:hidden">Go</span>
                  </div>
                </div>
              </div>

              {/* Features Content */}
              <div className="order-1 lg:order-2">
                <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">
                  [ features ]
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mt-4 mb-6 sm:mb-8 text-gray-900">
                  Easy to integrate using
                  <br />
                  our API access
                </h3>

                {/* Feature Tabs */}
                <div className="flex flex-wrap gap-4 sm:gap-8 mb-6 sm:mb-8">
                  <button className="text-gray-900 border-b-2 border-blue-600 pb-2 font-medium text-sm sm:text-base">
                    Fine-tuning models
                  </button>
                  <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm sm:text-base">
                    Embedding models
                  </button>
                  <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm sm:text-base">
                    InstructGPT
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Triggerfish bluntnose knifefish upside-down catfish kfish
                    convict cichlid cat shark saw shark trout cod.
                  </p>

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Pacific hake false trevally queen parrotfish black
                    prickleback moss revally queen parrotfish black prickleback
                    moss. Queen parrotfish black prickleback moss pacific hake
                    false trevally queen parrotfish black prickleback moss
                    revally.
                  </p>
                </div>

                <button className="px-6 py-3 sm:px-8 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm sm:text-base text-gray-700">
                  Explore more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Feature Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-200 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Foundation Models</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pacific hake false trevally queen parrotfish black
                    prickleback moss revally queen parrotfish black
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-cyan-200 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Enterprise Data</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Queen parrotfish black prickleback moss pacific hake false
                    trevally queen parrotfish black prickleback moss
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-purple-200 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    Fine-Tuning and RLHF
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Triggerfish bluntnose knifefish upside-down catfish kfish
                    convict cichlid cat shark saw shark trout cod.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 15s linear infinite;
  }

  /* Ensure proper stacking context */
  .fixed {
    will-change: transform;
  }

  /* Custom scrollbar for code editor */
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #F3F4F6;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #9CA3AF;
    border-radius: 3px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
  }

  /* Mobile optimization for animations */
  @media (max-width: 640px) {
    .animate-spin {
      animation-duration: 30s !important;
    }
    
    .animate-pulse {
      animation-duration: 3s !important;
    }
    
    .animate-bounce {
      animation-duration: 2s !important;
    }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .animate-spin,
    .animate-pulse,
    .animate-bounce,
    .animate-marquee {
      animation: none !important;
    }
    
    .hover\\:scale-105:hover {
      transform: none !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .bg-gradient-to-r,
    .bg-gradient-to-br {
      background: #FFFFFF !important;
    }
    
    .text-gray-600 {
      color: #374151 !important;
    }
  }

  /* Fix z-index stacking issues */
  .relative {
    position: relative;
  }

  /* Prevent layout shift */
  .bg-\\[radial-gradient\\(circle_at_center\\,transparent_0\\%\\,transparent_30\\%\\,rgba\\(255\\,255\\,255\\,0\\.6\\)_70\\%\\,rgba\\(255\\,255\\,255\\,0\\.6\\)_100\\%\\)\\,linear-gradient\\(to_right\\,\\#e2eef6_0\\%\\,\\#d3def8_45\\%\\,\\#c8d3f8_65\\%\\,\\#dcd6f7_85\\%\\,\\#f1eef6_100\\%\\)\\] {
    min-height: 100vh;
    width: 100%;
  }

  /* Prevent content jumping */
  * {
    box-sizing: border-box;
  }

  /* Focus styles for accessibility */
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
`}</style>

      </div>
      <AiToolSection />
      <Footer />
    </>
  );
};

export default AiTools;