import { Zap, Download, Globe, Clock, Settings, ZapIcon, User } from "lucide-react";
import bharatAi from "/src/assets/images/bharatai2.png";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignInPopup } from "../../Header"; 

export function EditorActions({ sidebarOpen, setSidebarOpen, onProfileClick }) {
  // const navigate = useNavigate();
  const { userToken, user } = useContext(AuthContext); 
  const [theme, setTheme] = useState("light");
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleSignInClick = (e) => {
    if (e) e.preventDefault();
    setShowSignInPopup(true);
  };

  // Check if user is authenticated
  const isAuthenticated = !!(userToken && user);

  return (
    <>
      <div className="flex items-center ml-2">
        {!sidebarOpen && (<img src={bharatAi} alt="Bharat AI" className="h-10 w-auto" />)}
      </div>

      <div className="flex float-end ml-auto items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Publish</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Google</DropdownMenuItem>
            <DropdownMenuItem>BSearch</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isAuthenticated ? (
          <button
            className={`p-2 rounded-lg ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            onClick={onProfileClick}
          >
            <User size={20} />
          </button>
        ) : (
          <button
            onClick={handleSignInClick}
            className={`px-3 py-1.5 border rounded-lg text-sm ${
              isDark
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Sign In Popup */}
      {showSignInPopup && (
        <SignInPopup
          showPopup={showSignInPopup}
          setShowPopup={setShowSignInPopup}
        />
      )}
    </>
  );
}