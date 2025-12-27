import React, { useState, useEffect, useContext } from "react";
import { Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext"; 

const ScrollSignInPopup = () => {
  const { login, userToken } = useContext(AuthContext); 
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
  });

  
  const isAuthenticated = !!userToken;


  useEffect(() => {
    if (isAuthenticated) {
      setShowPopup(false);
      return;
    }

    let scrollTimer = null;
    const handleScroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollPosition > windowHeight * 0.3) {
          setShowPopup(true);
        }
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    setErrorMessage("");
    
    if (isSignUp) {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name');
        return false;
      }
      if (!formData.email.trim()) {
        setErrorMessage('Please enter your email address');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage('Please enter a valid email address');
        return false;
      }
      if (!formData.password) {
        setErrorMessage('Please enter a password');
        return false;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return false;
      }
      if (!formData.agreeToTerms) {
        setErrorMessage('Please agree to the Terms of Service and Privacy Policy');
        return false;
      }
    } else {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your email or username');
        return false;
      }
      if (!formData.password) {
        setErrorMessage('Please enter your password');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    
    try {
      if (isSignUp) {
        // Sign Up API call
        const response = await fetch('http://127.0.0.1:8000/user/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Automatically sign in after successful signup
          await handleSignIn(formData.email, formData.password);
        } else {
          setErrorMessage(data.message || data.detail || 'Sign up failed. Please try again.');
        }
      } else {
        // Sign In
        await handleSignIn(formData.name, formData.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (emailOrUsername, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailOrUsername, // Backend might accept email or username
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.data?.access) {
        // Use the login function from AuthContext to store the token
        login(data.data.access);
        setShowPopup(false);
        resetForm();
      } else {
        setErrorMessage(data.message || data.detail || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorMessage('Sign in failed. Please try again.');
    }
  };

  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      window.location.href = 'http://127.0.0.1:8000/google-login/';
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrorMessage('Google sign-in failed. Please try again or use email/password.');
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      agreeToTerms: false,
    });
    setErrorMessage("");
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsSignUp(false);
    resetForm();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  // Check if submit button should be disabled
  const isSubmitDisabled = isLoading || (isSignUp && !formData.agreeToTerms);

  // Don't render anything if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      {/* Sign In/Sign Up Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative transform transition-all duration-300 scale-100">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              <p className="text-sm text-gray-600 mt-4">
                {isSignUp
                  ? "Join us and start your journey today!"
                  : "Sign in to continue your journey!"}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mb-6 bg-white border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-4">
              {/* Name/Email Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={isSignUp ? "Full Name" : "Email or Username"}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                />
              </div>

              {/* Email Input - Show only for sign up */}
              {isSignUp && (
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
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

              {/* Confirm Password - Only for sign up */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
              )}

              {/* Remember Me & Forgot Password - Only for sign in */}
              {!isSignUp && (
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
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 disabled:opacity-50"
                    />
                    <span className="text-gray-600 text-sm">Remember me</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      // You can implement forgot password functionality here
                      // For now, redirect to a forgot password route or show modal
                      alert("Password reset functionality would be implemented here.");
                    }}
                    disabled={isLoading}
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors underline disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Terms acceptance for sign up */}
              {isSignUp && (
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded mt-1 disabled:opacity-50"
                  />
                  <span className="text-gray-600 text-sm">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => alert("Terms of Service: This would open the full terms document.")}
                      className="text-purple-600 hover:underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => alert("Privacy Policy: This would open the privacy policy document.")}
                      className="text-purple-600 hover:underline"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`w-full font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform ${
                  isSubmitDisabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            {/* Toggle between sign in and sign up */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={toggleMode}
                  disabled={isLoading}
                  className="text-purple-600 hover:text-purple-700 transition-colors underline font-medium disabled:opacity-50"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollSignInPopup;