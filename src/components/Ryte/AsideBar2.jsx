import React, { useContext, useState, useEffect } from "react";
import FeatureIllustration from "../../assets/images/features-illustration.svg";
import { ModeContext } from "../../context/Mode.context";
import DropUpMenu from "../AiSidebar/AsideSettings";
import { AuthContext } from "../../context/AuthContext";
import DiscoverModels from "../../components/Models/DiscoverModels";
import AiToggleButton from "../AiSidebar/AiToggleButton";


const AiSideBar2 = ({ chatHistory }) => {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleMode } = useContext(ModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  // Track screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet-portrait');
      } else if (width < 992) {
        setScreenSize('tablet-landscape');
      } else if (width < 1200) {
        setScreenSize('desktop-small');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Responsive classes based on screen size
  const getResponsiveClasses = () => {
    const baseClasses = "flex flex-col justify-between bg-white dark:text-gray-300 dark:bg-slate-900 flex-shrink-0 transition-all duration-300";
    
    switch (screenSize) {
      case 'mobile':
        return `${baseClasses} 
          fixed inset-y-0 left-0 z-50 
          w-full max-w-xs
          h-screen
          pt-2 px-3
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-xl
        `;
      
      case 'tablet-portrait':
        return `${baseClasses} 
          fixed inset-y-0 left-0 z-40
          w-72
          h-screen
          pt-3 px-4
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg
        `;
        
      case 'tablet-landscape':
        return `${baseClasses} 
          relative
          w-64 lg:w-72
          h-[95vh] lg:h-[96vh]
          pt-3 px-4 lg:px-6
          -mt-3
        `;
        
      default:
        return `${baseClasses} 
          h-[101vh] lg:h-[96vh] 
          -mt-3 pt-3 pl-6 pr-6 lg:pr-2 
          w-64
        `;
    }
  };

  // Get responsive content classes
  const getContentClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return "flex flex-col mt-8";
      case 'tablet-portrait':
        return "flex flex-col mt-10";
      default:
        return "flex flex-col mt-14 lg:mt-4";
    }
  };

  // Get responsive illustration classes
  const getIllustrationClasses = (position) => {
    const baseClasses = "pointer-events-none absolute -z-0";
    
    if (screenSize === 'mobile') {
      return `${baseClasses} hidden`; // Hide illustrations on mobile
    }
    
    if (position === 'top') {
      return `${baseClasses} -left-[6%] opacity-0 dark:opacity-70 -translate-x-1/2 top-[1%] mt-[-5rem] cj3ve`;
    } else {
      return `${baseClasses} -left-[6%] opacity-0 dark:opacity-55 -translate-x-1/2 top-[70%] mt-[-5rem] cj3ve`;
    }
  };

  // Get responsive user section classes
  const getUserSectionClasses = () => {
    const baseClasses = "flex items-center justify-between mt-2 mb-3 dark:bg-gray-900/40 hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 border border-gray-400 border-opacity-40 space-y-1 rounded-lg transition-colors duration-200";
    
    switch (screenSize) {
      case 'mobile':
        return `${baseClasses} -mx-2 py-2 px-2`;
      case 'tablet-portrait':
        return `${baseClasses} -mx-3 py-2.5 px-2`;
      default:
        return `${baseClasses} -mx-4 py-3 px-2`;
    }
  };

  // Get responsive avatar size
  const getAvatarSize = () => {
    switch (screenSize) {
      case 'mobile':
        return "size-8";
      default:
        return "size-9";
    }
  };

  // Get responsive text sizes
  const getTextSizes = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          userName: "text-xs",
          userStatus: "text-xs"
        };
      default:
        return {
          userName: "text-sm",
          userStatus: "text-xs"
        };
    }
  };

  const textSizes = getTextSizes();

  return (
    <>
      {/* Mobile overlay */}
      {(screenSize === 'mobile' || screenSize === 'tablet-portrait') && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDropdown}
        />
      )}
      
      {/* Mobile toggle button */}
      {(screenSize === 'mobile' || screenSize === 'tablet-portrait') && (
        <button
          onClick={toggleDropdown}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <div className={getResponsiveClasses()}>
        <div className="flex flex-col overflow-hidden">
          <div className={getContentClasses()}>
            {/* Background illustrations - hidden on small screens */}
            <div
              className={getIllustrationClasses('top')}
              aria-hidden="true"
            >
              <img
                src={FeatureIllustration}
                className="max-w-none"
                width="1440"
                height="0"
                alt="Illustration"
              />
            </div>
            <div
              className={getIllustrationClasses('bottom')}
              aria-hidden="true"
            >
              <img
                src={FeatureIllustration}
                className="max-w-none h-72"
                width="1640"
                alt="Illustration"
              />
            </div>
          </div>
        </div>

        <div className="mb-2 lg:mb-4 flex-shrink-0">
          {/* Discover Models - responsive */}
          <div className="mb-2 lg:mb-3">
            <DiscoverModels />
          </div>
          
          {/* User section - responsive */}
          <div className={getUserSectionClasses()}>
            <div className="flex items-center min-w-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${getAvatarSize()} bg-slate-500 p-[7px] rounded-full mr-2 flex-shrink-0`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <div className={`${textSizes.userName} text-gray-800 dark:text-gray-200 font-semibold capitalize truncate`}>
                  {user ? user.name : "UserName"}
                </div>
                <div className={`${textSizes.userStatus} text-gray-400`}>
                  Freemium
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <DropUpMenu
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                toggleMode={toggleMode}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiSideBar2;