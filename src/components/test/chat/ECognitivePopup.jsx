import React, { useEffect, useState } from "react";
import { Zap, Shield, Clock, X } from "lucide-react";
import bharatAi from "/src/assets/images/bharatai2.png";

const ECognitivePopup = ({ isDark = true, onClose }) => {
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div
        className={`relative ${isDark ? "bg-gray-900" : "bg-white"
          } rounded-xl w-[420px] shadow-2xl border ${isDark ? "border-gray-800" : "border-gray-200"
          }`}
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-[5rem] h-[5rem] rounded-full ${isDark ? "bg-white" : "bg-indigo-100"
              } flex items-center justify-center overflow-hidden`}>

              <img
                src={bharatAi}
                alt="Bharat AI"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"
                }`}>
                Incognito Mode
              </h3>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                Private & fast conversations
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`px-6 py-4 ${isDark ? "bg-gray-800/40" : "bg-gray-50"
          }`}>
          <div className="space-y-3">

            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg ${isDark ? "bg-indigo-700/30" : "bg-indigo-100"
                } flex items-center justify-center flex-shrink-0`}>
                <Zap size={16} className={isDark ? "text-indigo-400" : "text-indigo-700"} />
              </div>
              <div className="flex-1 pt-0.5">
                <p className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"
                  }`}>
                  Instant responses
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Optimized for speed with zero latency
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg ${isDark ? "bg-indigo-700/30" : "bg-indigo-100"
                } flex items-center justify-center flex-shrink-0`}>
                <Shield size={16} className={isDark ? "text-indigo-400" : "text-indigo-700"} />
              </div>
              <div className="flex-1 pt-0.5">
                <p className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"
                  }`}>
                  No data storage
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Messages are deleted immediately after processing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg ${isDark ? "bg-indigo-700/30" : "bg-indigo-100"
                } flex items-center justify-center flex-shrink-0`}>
                <Clock size={16} className={isDark ? "text-indigo-400" : "text-indigo-700"} />
              </div>
              <div className="flex-1 pt-0.5">
                <p className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"
                  }`}>
                  Stateless sessions
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Each message is independent with no history
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Notice */}
        <div className="px-6 py-4">
          <div className={`p-3 rounded-lg ${isDark ? "bg-indigo-900/30 border border-indigo-700/40" : "bg-indigo-50 border border-indigo-200"
            }`}>
            <p className={`text-xs leading-relaxed ${isDark ? "text-indigo-200" : "text-indigo-900"
              }`}>
              <strong>Privacy Note:</strong> Your conversation won't appear in chat history and will be erased after this session.
            </p>
          </div>
        </div>

        <div className={`px-6 py-4 flex items-center justify-center border-t ${isDark ? "border-gray-800" : "border-gray-200"
          }`}>
          <div className="flex flex-col items-center space-y-5">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square w-[7px] rounded-full transition-all ${i < countdown
                      ? isDark ? "bg-indigo-400" : "bg-indigo-500"
                      : isDark ? "bg-gray-700" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECognitivePopup;