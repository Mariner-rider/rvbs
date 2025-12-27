// Reasoning.jsx
import React from 'react';

const Reasoning = ({ 
  reasoningLines = [], 
  isThinking = false, 
  isDark = false 
}) => {
  if (!isThinking && reasoningLines.length === 0) {
    return null;
  }

  return (
    <div className={`mb-4 p-4 rounded-lg border ${
      isDark 
        ? 'bg-gray-900 border-gray-700 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-700'
    }`}>
      <div className="flex items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Reasoning</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {isThinking ? (
          <div className="flex items-center space-x-2 py-1">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">Analyzing your query...</span>
          </div>
        ) : (
          reasoningLines.map((line, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <span className="text-gray-500 mt-0.5">•</span>
              <span>{line}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reasoning;