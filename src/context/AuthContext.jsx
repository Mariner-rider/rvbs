// import React, { createContext, useState, useEffect } from "react";
// import { gapi } from "gapi-script";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userToken, setUserToken] = useState(null);

//   const GOOGLE_CLIENT_ID =
//     "987299179183-76kotsb10vcfvqhg9rf6svu1tq51nfvt.apps.googleusercontent.com";
//   const GITHUB_CLIENT_ID = "Ov23lizM6ZjJcLcVnQ6O";
//   const REDIRECT_URI = "https://bharatai-indol.vercel.app/login";
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isLogin, setIsLogin] = useState(true);

//   // Set up Axios interceptor to add authorization token to each request
//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       (config) => {
//         if (userToken) {
//           config.headers.Authorization = `Bearer ${userToken}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Remove the interceptor when component unmounts
//     return () => {
//       axios.interceptors.request.eject(interceptor);
//     };
//   }, [userToken]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const payload = { email, password };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/user/login/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Login successful:", response.data);

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       setUser(response.data.user);
//       setUserToken(response.data.token);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error(
//         "Login error:",
//         error.response ? error.response.data : error.message
//       );
//       alert(error.response ? error.response.data.message : error.message);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const payload = { name, email, password };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/user/signup/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Signup successful:", response.data);
//       // navigate("/login");
//     } catch (error) {
//       console.error(
//         "Signup error:",
//         error.response ? error.response.data : error.message
//       );
//       alert(error.response ? error.response.data.message : error.message);
//     }
//   };

//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId: GOOGLE_CLIENT_ID,
//         scope: "email",
//       });
//     }
//     gapi.load("client:auth2", start);
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUserToken(token);
//       setUser(JSON.parse(storedUser));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const googleClientId =
//     "987299179183-76kotsb10vcfvqhg9rf6svu1tq51nfvt.apps.googleusercontent.com";

//   useEffect(() => {
//     window.gapi.load("auth2", () => {
//       window.gapi.auth2.init({
//         client_id: googleClientId,
//       });
//     });
//   }, [googleClientId]);

//   const handleGoogleLogin = async () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();

//     try {
//       const googleUser = await auth2.signIn();
//       const profile = googleUser.getBasicProfile();
//       const id_token = googleUser.getAuthResponse().id_token;

//       console.log("Google Profile: ", {
//         name: profile.getName(),
//         email: profile.getEmail(),
//         id_token,
//       });

//       const formData = new FormData();
//       formData.append("token", id_token);

//       const response = await axios.post(
//         "http://localhost:8000/google-login/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);
//       setUserToken(token);
//       setIsLoggedIn(true);

//       console.log("Backend Response: ", response.data);
//     } catch (error) {
//       console.error("Google Login Error:", error);
//     }
//   };

//   const handleGitHubLogin = () => {
//     try {
//       const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
//       window.location.href = githubAuthUrl;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleSignOut = async () => {
//     console.log("Signout function called"); // Debugging log
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.warn("No token found, skipping logout request.");
//         return;
//       }

//       // Send logout request to backend
//       await axios.post(
//         "http://localhost:8000/user/logout/",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Logout successful");

//       // Clear local storage and state after successful logout
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setUser(null);
//       setIsLoggedIn(false);
//       setUserToken(null);

//       // If using Google Auth, sign out
//       if (window.gapi && window.gapi.auth2) {
//         const auth2 = window.gapi.auth2.getAuthInstance();
//         if (auth2) {
//           auth2
//             .signOut()
//             .then(() => console.log("User signed out from Google"));
//         }
//       } else {
//         console.warn("Google Auth instance not found");
//       }
//     } catch (error) {
//       console.error(
//         "Logout error:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   const values = {
//     user,
//     isLoggedIn,
//     handleGoogleLogin,
//     handleGitHubLogin,
//     handleSignOut,
//     handleLogin,
//     handleSignup,
//     email,
//     setEmail,
//     password,
//     setPassword,
//     setName,
//     isLogin,
//     setIsLogin,
//     userToken,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useState, useEffect } from "react";
import { gapi } from "gapi-script";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTimeoutId, setRefreshTimeoutId] = useState(null);

  const GOOGLE_CLIENT_ID =
    "987299179183-76kotsb10vcfvqhg9rf6svu1tq51nfvt.apps.googleusercontent.com";
  const GITHUB_CLIENT_ID = "Ov23lizM6ZjJcLcVnQ6O";
  const REDIRECT_URI = "https://bharatai-indol.vercel.app/login";
  const API_BASE_URL = "http://localhost:8000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Token utilities
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired - subtract 60 seconds as buffer
      return decoded.exp * 1000 < Date.now() + 60000;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  const processTokenResponse = (response) => {
    const { token, refresh_token, user } = response.data;

    try {
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000; // Convert to milliseconds

      // Store securely
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_expires_at", expiresAt);
      localStorage.setItem("user", JSON.stringify(user));

      // Update state
      setUser(user);
      setUserToken(token);
      setRefreshToken(refresh_token);
      setTokenExpiresAt(expiresAt);
      setIsLoggedIn(true);

      // Schedule token refresh
      scheduleTokenRefresh(expiresAt);

      return true;
    } catch (error) {
      console.error("Failed to process token:", error);
      return false;
    }
  };

  const scheduleTokenRefresh = (expiresAt) => {
    // Clear any existing timeout
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }

    const currentTime = Date.now();
    const timeUntilExpiry = expiresAt - currentTime;

    // Schedule refresh at 90% of token lifetime
    const refreshTime = timeUntilExpiry * 0.9;

    if (refreshTime <= 0) {
      // Token is already expired or very close to expiry
      refreshAuthToken();
      return;
    }

    console.log(
      `Token refresh scheduled in ${Math.round(refreshTime / 1000)} seconds`
    );
    const timeoutId = setTimeout(() => refreshAuthToken(), refreshTime);
    setRefreshTimeoutId(timeoutId);
  };

  const refreshAuthToken = async () => {
    if (isRefreshing || !refreshToken) return;

    setIsRefreshing(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/refresh-token/`,
        { refresh_token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      processTokenResponse(response);
      console.log("Token refreshed successfully");
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, user needs to log in again
      handleSignOut();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Set up Axios interceptor to add authorization token to each request
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (!userToken) return config;

        // Check if token needs refresh before making request
        if (
          isTokenExpired(userToken) &&
          refreshToken &&
          !config.url.includes("/refresh-token/")
        ) {
          await refreshAuthToken();
        }

        // Get the latest token (which may have been refreshed)
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and not already retrying
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;

          try {
            await refreshAuthToken();
            // Retry the original request with new token
            const latestToken = localStorage.getItem("token");
            originalRequest.headers.Authorization = `Bearer ${latestToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            handleSignOut();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Remove interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
      if (refreshTimeoutId) {
        clearTimeout(refreshTimeoutId);
      }
    };
  }, [userToken, refreshToken, isRefreshing]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const success = processTokenResponse(response);
      if (success) {
        console.log("Login successful");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = { name, email, password };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/signup/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      setIsLogin(true); // Switch to login form after successful signup
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedExpiresAt = localStorage.getItem("token_expires_at");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // Check if token is expired
      if (isTokenExpired(token) && storedRefreshToken) {
        // Token expired but we have refresh token - attempt refresh
        setRefreshToken(storedRefreshToken);
        refreshAuthToken();
      } else if (!isTokenExpired(token)) {
        // Token is still valid
        setUserToken(token);
        setRefreshToken(storedRefreshToken);
        setTokenExpiresAt(Number(storedExpiresAt));
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);

        // Schedule refresh
        scheduleTokenRefresh(Number(storedExpiresAt));
      } else {
        // Token expired and no refresh token or refresh failed
        handleSignOut();
      }
    }
  }, []);

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
      });
    });
  }, [GOOGLE_CLIENT_ID]);

  const handleGoogleLogin = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    try {
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      const id_token = googleUser.getAuthResponse().id_token;

      console.log("Google Profile: ", {
        name: profile.getName(),
        email: profile.getEmail(),
      });

      const formData = new FormData();
      formData.append("token", id_token);

      const response = await axios.post(
        `${API_BASE_URL}/google-login/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      processTokenResponse(response);
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGitHubLogin = () => {
    try {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
      window.location.href = githubAuthUrl;
    } catch (error) {
      console.error("GitHub login error:", error);
      alert("GitHub login failed. Please try again.");
    }
  };

  const handleSignOut = () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // Attempt to notify backend about logout
        axios
          .post(
            `${API_BASE_URL}/user/logout/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((error) => {
            console.warn("Logout notification failed:", error);
            // Continue with local logout regardless of server response
          });
      }

      // Clear all timeouts
      if (refreshTimeoutId) {
        clearTimeout(refreshTimeoutId);
        setRefreshTimeoutId(null);
      }

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_expires_at");
      localStorage.removeItem("user");

      // Clear state
      setUser(null);
      setIsLoggedIn(false);
      setUserToken(null);
      setRefreshToken(null);
      setTokenExpiresAt(null);

      // Sign out from Google if applicable
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2
            .signOut()
            .then(() => console.log("User signed out from Google"));
        }
      }

      console.log("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };


  const handleGoogleAuthSuccess = (data) => {
  try {
    if (data.token) localStorage.setItem("token", data.token);
    if (data.refresh_token)
      localStorage.setItem("refresh_token", data.refresh_token);
    if (data.user)
      localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user || null);
    setUserToken(data.token || null);
    setIsLoggedIn(true);

    console.log("Google Auth success - context updated");
  } catch (err) {
    console.error("Error in handleGoogleAuthSuccess:", err);
  }
};







  // Check for token expiration periodically (safety net)
  useEffect(() => {
    if (!isLoggedIn || !tokenExpiresAt) return;

    const checkInterval = setInterval(() => {
      if (Date.now() > tokenExpiresAt - 60000 && refreshToken) {
        console.log("Safety check: Token needs refresh");
        refreshAuthToken();
      } else if (Date.now() > tokenExpiresAt && !refreshToken) {
        console.log("Safety check: Token expired with no refresh token");
        handleSignOut();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [isLoggedIn, tokenExpiresAt, refreshToken]);

  const values = {
    user,
    isLoggedIn,
    handleGoogleLogin,
    handleGitHubLogin,
    handleSignOut,
    handleLogin,
    handleSignup,
    email,
    setEmail,
    password,
    setPassword,
    setName,
    isLogin,
    setIsLogin,
    userToken,
    refreshAuthToken, // Expose refresh function if needed
    handleGoogleAuthSuccess,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
