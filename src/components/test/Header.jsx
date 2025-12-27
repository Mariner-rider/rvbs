import React, { useState, useEffect, useContext } from "react";
import { Menu, Sparkles, X, Eye, EyeOff, ArrowRight, Mail, Shield } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { OTPVerification } from "./OTPVerification";
const API_BASE_URL = "http://localhost:8000";

// Button component
const Button = ({ variant = "default", size = "default", className = "", children, onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export const SignInPopup = ({ showPopup, setShowPopup }) => {
  const {
    handleLogin,
    handleSignup,
    handleGoogleAuthSuccess,
    email,
    setEmail,
    password,
    setPassword,
    setName,
    isLogin,
    setIsLogin
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [isGoogleFlow, setIsGoogleFlow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
  });

  useEffect(() => {
    setEmail(formData.email);
    setPassword(formData.password);
    setName(formData.name);
  }, [formData.email, formData.password, formData.name, setEmail, setPassword, setName]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
    setSuccessMessage("");
  };

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.name.trim()) {
        setError('Please enter your full name');
        return false;
      }
      if (!formData.email.trim()) {
        setError('Please enter your email address');
        return false;
      }
      if (!PASSWORD_REGEX.test(formData.password)) {
        setError(
          "Password must be at least 6 characters long, include one uppercase, one lowercase, one number, and one special symbol."
        );
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (!formData.agreeToTerms) {
        setError('Please agree to the Terms of Service and Privacy Policy');
        return false;
      }
    } else {
      if (!formData.email.trim()) {
        setError('Please enter your email');
        return false;
      }
      if (!formData.password) {
        setError('Please enter your password');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      const targetEmail = isGoogleFlow ? googleEmail : formData.email;
      setOtpEmail(targetEmail);
      setShowOTPModal(true);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await handleSignup(e);
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerified = async () => {
    setShowOTPModal(false);
    setIsLoading(true);
    setError("");

    try {
      if (isGoogleFlow) {
        const pendingAuth = sessionStorage.getItem("pendingGoogleAuth");
        if (pendingAuth) {
          const data = JSON.parse(pendingAuth);

          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }

          handleGoogleAuthSuccess(data);
          setShowPopup(false);
          resetForm();
          sessionStorage.removeItem("pendingGoogleAuth");

          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        const loginEvent = { preventDefault: () => {} };
        await handleLogin(loginEvent);
        setShowPopup(false);
        resetForm();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        console.log("Google Code Response:", codeResponse);

        const response = await fetch(`${API_BASE_URL}/google-login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });

        const data = await response.json();
        console.log("Backend Response:", data);

        if (!data.success) {
          throw new Error(data.message || "Google sign-in failed");
        }

        const userEmail = data.user?.email;
        if (!userEmail) {
          throw new Error("Email not received from Google");
        }

        setGoogleEmail(userEmail);
        setIsGoogleFlow(true);
        setIsLogin(true);

        sessionStorage.setItem("pendingGoogleAuth", JSON.stringify(data));

        setOtpEmail(userEmail);
        setShowOTPModal(true);

      } catch (error) {
        console.error("Google Login Error:", error);
        setError(error.message || "Google login failed. Please try again.");
        setIsGoogleFlow(false);
        setGoogleEmail("");
      } finally {
        setIsLoading(false);
      }
    },

    onError: (error) => {
      console.error("Google OAuth Error:", error);
      setError("Google authentication failed. Please try again.");
      setIsLoading(false);
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      agreeToTerms: false,
    });
    setError("");
    setSuccessMessage("");
    setGoogleEmail("");
    setIsGoogleFlow(false);
    setOtpEmail("");
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsLogin(true);
    resetForm();
    sessionStorage.removeItem("pendingGoogleAuth");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const isSubmitDisabled = isLoading || (!isLogin && !formData.agreeToTerms);

  if (!showPopup) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white shadow-2xl p-8 w-full max-w-md relative transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">

            <button
              onClick={closePopup}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {!isLogin ? "Create Account" : "Welcome Back"}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              <p className="text-sm text-gray-600 mt-4">
                {!isLogin
                  ? "Join us and start your journey today!"
                  : "Sign in to continue your journey!"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {successMessage}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mb-3 bg-white border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="flex items-center mb-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-3">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={isGoogleFlow ? googleEmail : formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleFlow}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                />
              </div>

              {!isGoogleFlow && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              )}

              {!isLogin && !isGoogleFlow && (
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
              )}

              {isLogin && !isGoogleFlow && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => !isLoading && setFormData((prev) => ({
                      ...prev,
                      rememberMe: !prev.rememberMe,
                    }))}
                  >
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    />
                    <span className="text-gray-600 text-sm">Remember me</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Password reset functionality will be implemented!")}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors underline disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start space-x-2 space-y-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-[10px] disabled:opacity-50"
                  />
                  <span className="text-gray-600 text-sm">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => alert("Terms of Service document")}
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => alert("Privacy Policy document")}
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`w-full font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform ${isSubmitDisabled
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-[1.02]"
                  }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <span>{!isLogin ? "Create Account" : "Sign In"}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-5">
              <span className="text-gray-600 text-sm">
                {!isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={toggleMode}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 transition-colors underline font-medium disabled:opacity-50"
                >
                  {!isLogin ? "Sign In" : "Sign Up"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <OTPVerification
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={otpEmail}
        onVerificationSuccess={handleOTPVerified}
        autoSendOTP={true}
      />
    </>
  );
};

// ****************************************************************************************************************************************************


// Main Header Component
const Header = () => {
  const { user, isLoggedIn, handleSignOut } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [sidebarOpen]);



  useEffect(() => {
    let triggered = false; 

    const handleScroll = () => {
      if (!triggered && window.scrollY > 300 && !isLoggedIn) {
        setShowSignInPopup(true); 
        triggered = true; 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn]);



  const handleSignInClick = (e) => {
    if (e) e.preventDefault();
    setShowSignInPopup(true);
    setSidebarOpen(false);
  };

  const handleSignOutClick = () => {
    handleSignOut();
    alert('Signed out successfully!');
    setShowSignInPopup(true);
  };

  const handleGetStarted = () => {
    window.location.href = '/test/chat';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
        : "bg-white/80 backdrop-blur-xl border-b border-gray-100"
        }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bharat AI
              </span>
            </div>

            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="/test/features" className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors">Features</a>
              <a href="/test/tools" className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors">AI Tools</a>
              <a href="/test/pricing" className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors">Pricing</a>
              <a href="/test/about" className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors">About</a>
              <a href="/test/contact" className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors">Contact us</a>
            </nav>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="hidden md:block">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <span className="mr-3 text-sm text-gray-600">
                      👋 Hi, {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base px-3 lg:px-4"
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </Button>
                )}

              </div>
              <Button
                className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-4 lg:px-6 shadow-lg text-sm lg:text-base"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10"
                onClick={toggleSidebar}
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleSidebar}></div>
          <div className="absolute top-0 right-0 w-72 sm:w-80 md:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-blue-600">Bharat AI</span>
              </div>
              <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <nav className="flex flex-col p-4 sm:p-6 space-y-1">
              <a href="/test/features" onClick={toggleSidebar} className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg">Features</a>
              <a href="/test/tools" onClick={toggleSidebar} className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg">AI Tools</a>
              <a href="/test/pricing" onClick={toggleSidebar} className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg">Pricing</a>
              <a href="/test/about" onClick={toggleSidebar} className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg">About</a>
              <a href="/test/contact" onClick={toggleSidebar} className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg">Contact us</a>

              <div className="border-t border-gray-200 my-4"></div>

              {isLoggedIn ? (
                <div className="px-4 py-3 text-sm text-gray-600 bg-blue-50 rounded-lg">
                  👋 Hi, {user?.name || 'User'}
                </div>
              ) : (
                <button
                  onClick={handleSignInClick}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg text-left w-full"
                >
                  Sign In
                </button>
              )}

              <div className="mt-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl shadow-lg"
                  onClick={() => {
                    handleGetStarted();
                    toggleSidebar();
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Sign In/Sign Up Popup */}
      <SignInPopup
        showPopup={showSignInPopup}
        setShowPopup={setShowSignInPopup}
      />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16 lg:h-18"></div>
    </>
  );
};

export default Header;