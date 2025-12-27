import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ModeProvider } from "./context/Mode.context.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ScrollToTop } from "./components/JumpToTop.component.jsx";
import { RyteProvider } from "./context/RyteContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google"; 

const GOOGLE_CLIENT_ID ='987299179183-76kotsb10vcfvqhg9rf6svu1tq51nfvt.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
          <BrowserRouter>
            <RyteProvider>
              <ScrollToTop>
                <ModeProvider>
                  <App />
                </ModeProvider>
              </ScrollToTop>
            </RyteProvider>
          </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
