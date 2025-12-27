import React from 'react';
import { ArrowRight, Play, Check } from 'lucide-react';

const AiToolSection = () => {
  return (
    <div className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_70%,rgba(255,255,255,0.6)_100%),linear-gradient(to_right,#e2eef6_0%,#d3def8_45%,#c8d3f8_65%,#dcd6f7_85%,#f1eef6_100%)] text-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-600"></div>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <pattern id="triangles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="50,0 100,87 0,87" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#triangles)" />
          </svg>
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-4 h-4 bg-blue-200 opacity-50 transform rotate-45"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col lg:flex-row flex-wrap w-full items-center justify-between gap-10 max-w-screen-2xl mx-auto">
          {/* Left Text */}
          <div className="text-left w-full lg:w-2/3 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-100 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              Future is here.
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Meet changes!
            </h2>
          </div>

          {/* Play Button */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <button className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100/50 backdrop-blur-sm rounded-full border border-blue-200 hover:bg-blue-200 transition-all duration-300 transform hover:scale-110">
              <Play className="w-8 h-8 text-blue-800 ml-1 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-12 text-sm text-gray-100">Play video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 sm:px-6 md:px-10 lg:px-20 max-w-screen-2xl mx-auto flex flex-col gap-12">
        {/* Text */}
        <div className="w-full space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Only pay for<br />what you use.
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Triggerfish bluntnose knifefish upside-down catfish convict cichlid cat shark saw shark trout cod.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Pacific hake false trevally queen parrotfish black prickleback moss trevally queen parrotfish black.
          </p>
          <ul className="space-y-3 max-w-2xl mx-auto md:mx-0">
            {['Fine-tuning models', 'Embedding models', 'InstructGPT'].map((item, i) => (
              <li key={i} className="flex items-center justify-center md:justify-start space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Cards */}
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <div className="bg-white w-full rounded-3xl p-8 border border-gray-300 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-3xl font-bold mb-2">Basic</h3>
              <p className="text-gray-500 mb-6">Great for private individuals</p>
              <ul className="space-y-3 mb-8">
                {['1 User', 'Unlimited Projects', 'Download prototypes', '1 Gb workspace'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-4xl font-bold text-gray-900">Free</div>
              <button className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-blue-200 transition-colors">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white w-full rounded-3xl p-8 border border-blue-300 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                14 days free period
              </div>
              <h3 className="text-3xl font-bold mt-8 mb-6 text-gray-900">Premium</h3>
              <ul className="space-y-3 mb-8">
                {['3 Users', 'Unlimited Projects', 'Download prototypes', '100 Gb workspace'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-800">$99</div>
                <div className="text-gray-600">/mo</div>
              </div>
              <button className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-blue-200 transition-colors">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiToolSection;
