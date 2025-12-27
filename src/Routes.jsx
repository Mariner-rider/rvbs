import React, { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Preloader from "./components/Preloader.component";
import Contact from "./pages/Contact.page";

import SignUpComponent from "./components/SignUpComponent";
import LoginComponent from "./components/LoginComponent";
import ExploreComponent from "./components/Explore";
import { AuthContext } from "./context/AuthContext";
import MainComponents from "./components/Home/Index";
import SessionDetailPage from "./components/AiSidebar/AsideSessions/SessionDetail";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ShareComponent from "./components/AiSidebar/SharePage";
import TermOfUse from "./components/TermOfUse";
import About from "./components/About/Index";
import Services from "./components/services/Services";
import Research from "./components/Research/Research";
import SearchBarPage from "./components/ChatMainBody/ChatSearch";
import Models from "./components/Models/ModelsMain";
import MainRyteComponent from "./components/Ryte/Index";
import ReviewerLayout from "./components/CodeReviewer/ReviewerLayout";
import ChatComponent from "./components/ChatMainBody/ChatComponent";
import HeroSection from "./components/test/heroSection";
import AboutSection from "./components/test/about";

import ContactPage from "./components/test/contact";
import PricingPage from "./components/test/pricing";
import Features from "./components/test/features";
import AiTools from "./components/test/AiTools";
import ChatInterface from "./components/test/chat/ChatInterface";
// import SessionListTest from "./components/AiSidebar/SessionTest";
import Privacy from "./components/test/privacy"
import Terms from "./components/test/terms"
import RyteLayout from "./components/test/chat/RyteLayout"
import AiChat from "./components/test/chat/AiChat";
import WebSearch from "./components/test/chat/WebSearch";
import WebSearchResponses from "./components/test/chat/WebSearchResponse";
import PageNotFound from "./components/NotFound";
import SubscriptionDashboard from "./components/test/SubscriptionDashboard";
// import NewRyte from "./components/test/chat/NewRyte";
const Routing = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Preloader />
      <Routes>
        {/* <Route path="/" element={<MainHomeComponent />} />
        <Route
          path="/login"
          element={user ? <MainHomeComponent /> : <LoginComponent />}
        /> */}
        <Route path="/" element={<MainComponents />} />
        <Route
          path="/login"
          element={user ? <MainComponents /> : <LoginComponent />}
          // element={<LoginComponent />}
        />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat/:sessionId" element={<ChatComponent />} />
        <Route path="/chat" element={<ChatComponent />} />

        {/* <Route path="/session" element={<SessionListTest/>} /> */}

        <Route path="/Explore" element={<ExploreComponent />} />
        <Route path="/NewPage" element={<MainComponents />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-of-use" element={<TermOfUse />} />
        <Route path="/about" element={<About />} />
        <Route path="/session/:id" element={<SessionDetailPage />} />
        <Route path="/session-detail/:id" element={<SessionDetailPage />} />
        <Route path="/share/:id" element={<ShareComponent />} />
        <Route path="/products" element={<Services />} />
        <Route path="/research" element={<Research />} />
        <Route path="/chatbar" element={<SearchBarPage />} />
        <Route path="/models" element={<Models />} />
        <Route path="/ryte" element={<MainRyteComponent />} />
        <Route path="/code" element={<ReviewerLayout />} />
        <Route path="/test" element={<HeroSection />} />

        <Route path="/test/about" element={<AboutSection />} />
        <Route path="/test/contact" element={<ContactPage />} />
        <Route path="/test/pricing" element={<PricingPage />} />
        <Route path="/test/features" element={<Features />} />
        <Route path="/test/tools" element={<AiTools />} />
        <Route path="/test/chat" element={<ChatInterface />} />
        <Route path="/test/privacy" element={< Privacy />} />
        <Route path="/test/terms" element={< Terms />} />
        <Route path="/test/chat/Rytelayout" element={< RyteLayout />} />
        <Route path="/test/chat/Aichat" element={<AiChat />} />
        <Route path="/test/chat/WebSearch" element={<WebSearch />} />
        <Route path="/search/:category?" element={<WebSearchResponses />} />
        <Route path="/test/subscription" element={<SubscriptionDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

     
    </>
  );
};

export default Routing;
