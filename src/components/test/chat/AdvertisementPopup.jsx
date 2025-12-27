import React from "react";
import { X } from "lucide-react";

const AdvertisementPopup = ({ showPopup}) => {
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            {/* UPDATED: Only show close button as fallback */}
            {/* <button
              onClick={onClose}
              className="absolute right-4 top-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Close (ad will auto-close when response completes)"
            >
              <X size={24} />
            </button> */}

            {/* Advertisement Content */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Special Offer Just for You!
              </h1>
              <p className="text-gray-600 mb-6">
                Get 50% off on our premium subscription for a limited time.
                Don't miss out on this amazing deal!
              </p>
              
              <button
                onClick={() => alert("Offer Activated!")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Claim Offer
              </button>
              
              {/* UPDATED: Add info text */}
              <p className="text-xs text-gray-500 mt-4">
                Ad will close automatically when your response is ready
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertisementPopup;

