import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; // Import your existing AuthContext
import Settings from "./settings";
import {
  Sun,
  Moon,
  Info,
  FileText,
  Shield,
  Github,
  ExternalLink,
  Settings as SettingsIcon,
  LogOut,
  Zap,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfileMenu = ({
  isDark,
  theme,
  onThemeChange,
  onClose,
  archivedChats,
  onRestoreChat,
  onDeleteArchivedChat,
  onSelectArchivedChat,
}) => {
  // Use your existing AuthContext
  const { user, isLoggedIn, handleSignOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const themeOptions = [
    { name: "Light", icon: Sun, value: "light" },
    { name: "Dark", icon: Moon, value: "dark" },
  ];

  const MenuItem = ({
    icon: Icon,
    text,
    subtext,
    onClick,
    isDark,
  }) => (
    <button
      className={`w-full text-left px-2 py-1 transition-colors rounded mb-1 ${isDark
          ? "hover:bg-[#2c2c2c] text-white"
          : "hover:bg-gray-100 text-black"
        }`}
      onClick={onClick}
    >
      <div className="flex space-x-3 items-start">
        <div className="pt-0.5">
          <Icon
            size={16}
            className={isDark ? "text-gray-400" : "text-gray-600"}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm">{text}</span>
          {subtext && (
            <span
              className={`text-[10px] leading-none ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {subtext}
            </span>
          )}
        </div>
      </div>
    </button>
  );

  const handleSignOutClick = () => {
    handleSignOut();
    onClose();
    window.location.reload();
    
    // alert('Signed out successfully!');
    //  navigate("/test"); 
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        className="absolute top-14 right-4 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${isDark ? "bg-[#1a1a1a]" : "bg-white"
            } rounded-lg shadow-lg border ${isDark ? "border-gray-700" : "border-gray-200"
            } w-64 py-1 px-2`}
        >
          {/* User Section with Real Data from AuthContext */}
          <div
            className={`px-2 py-2 border-b ${isDark ? "border-gray-700" : "border-gray-200"
              }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${isDark ? "bg-blue-600" : "bg-blue-600"
                  } rounded-full w-7 h-7 flex items-center justify-center`}
              >
                <span className="text-white font-medium text-sm">
                  {isLoggedIn && user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : 'G'}
                </span>
              </div>
              <div>
                <div
                  className={`font-medium text-sm ${isDark ? "text-white" : "text-black"
                    }`}
                >
                  {isLoggedIn && user?.name ? user.name : 'Guest'}
                </div>
                <div
                  className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                    } flex items-center space-x-1`}
                >
                  <span>
                    {isLoggedIn && user?.email ? user.email : 'guest@email.com'}
                  </span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Section */}
          <div className="py-1">
            <MenuItem
              icon={Zap}
              text="Upgrade to Pro"
              subtext="Unlimited searches & premium models"
              onClick={() => navigate("/test/pricing")}
              isDark={isDark}
            />
          </div>

          {/* Settings */}
          <div
            className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"
              } pt-1 pb-0`}
          >
            <MenuItem
              icon={SettingsIcon}
              text="Settings"
              onClick={() => setShowSettings(true)}
              isDark={isDark}
            />
          </div>

          {/* Theme Section */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center space-x-2 text-sm font-medium ${isDark ? "text-white" : "text-black"
                  }`}
              >
                <Sun size={16} />
                <span>Theme</span>
              </div>
              <div className="flex items-center space-x-1">
                {themeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => onThemeChange(option.value)}
                      className={`p-1 rounded transition-colors ${theme === option.value
                          ? isDark
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-black"
                          : isDark
                            ? "text-gray-400 hover:text-white hover:bg-[#2c2c2c]"
                            : "text-gray-600 hover:text-black hover:bg-gray-100"
                        }`}
                    >
                      <IconComponent size={14} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div
            className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"
              } py-1`}
          >
            <Link to="/test/about">
              <MenuItem icon={Info} text="About" isDark={isDark} />
            </Link>

            <Link to="/test/terms">
              <MenuItem icon={FileText} text="Terms" isDark={isDark} />
            </Link>

            <Link to="/test/privacy">
              <MenuItem icon={Shield} text="Privacy" isDark={isDark} />
            </Link>

            <Link
              to="https://github.com/BHARATTECH-ECOSYSTEMS/BharatAi_RS1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuItem icon={Github} text="GitHub" isDark={isDark} />
            </Link>
             <Link to="/test/subscription">
              <MenuItem icon={Crown} text="Subscription" isDark={isDark} />
            </Link>
          </div>

          {/* Sign Out Button - Only show if authenticated */}
          {isLoggedIn && (
            <div
              className={`px-2 py-2 border-t ${isDark ? "border-gray-700" : "border-gray-200"
                }`}
            >
              <button
                className={`flex items-center justify-between w-full text-left py-1 px-2 rounded transition-colors ${isDark
                    ? "hover:bg-[#2c2c2c] text-white"
                    : "hover:bg-gray-100 text-black"
                  }`}
                onClick={handleSignOutClick}
              >
                <div className="flex items-center space-x-2">
                  <LogOut
                    size={16}
                    className={isDark ? "text-gray-400" : "text-gray-600"}
                  />
                  <span className="text-sm">Sign Out</span>
                </div>
                <ExternalLink
                  size={12}
                  className={isDark ? "text-gray-400" : "text-gray-600"}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {showSettings && (
        <Settings
          isDark={isDark}
          onClose={() => setShowSettings(false)}
          user={user}
          archivedChats={archivedChats}
          onRestoreChat={onRestoreChat}
          onDeleteArchivedChat={onDeleteArchivedChat}
          onSelectArchivedChat={onSelectArchivedChat}
        />
      )}
    </div>
  );
};

export default ProfileMenu;