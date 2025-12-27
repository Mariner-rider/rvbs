// RyteContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the context
const RyteContext = createContext();

// Base URL for all API endpoints
const BASE_URL = "http://127.0.0.1:8000/r_chat1/";

export const RyteProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic function to make API requests
  const fetchContent = async (useCase, params) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        use_case: useCase,
        temperature: params.temperature || 0.7,
        ...params,
      });

      const response = await axios.get(`${BASE_URL}?${queryParams}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  // Specific functions for each use case
  const generateVideoIdea = async (keywords, temperature = 0.7) => {
    return fetchContent("video_idea", { keywords, temperature });
  };

  const generateVideoDescription = async (videoTitle, temperature = 0.7) => {
    return fetchContent("video_description", {
      video_title: videoTitle,
      temperature,
    });
  };

  const generateChannelDescription = async (channelName, temperature = 0.7) => {
    return fetchContent("channel_description", {
      channel_name: channelName,
      temperature,
    });
  };

  const generateTagline = async (description, temperature = 0.7) => {
    return fetchContent("tagline", { description, temperature });
  };

  const generateStory = async (keyPoints, words = 500, temperature = 0.7) => {
    return fetchContent("story", { key_points: keyPoints, words, temperature });
  };

  const generateProductDescription = async (
    productName,
    productFeatures,
    keywords,
    temperature = 0.7
  ) => {
    return fetchContent("product_description", {
      product_name: productName,
      product_features: productFeatures,
      keywords,
      temperature,
    });
  };

  const paraphraseText = async (text, temperature = 0.7) => {
    return fetchContent("paraphrase", { text, temperature });
  };

  const generateJobDescription = async (jobRole, temperature = 0.7) => {
    return fetchContent("job_description", { job_role: jobRole, temperature });
  };

  const generateFacebookPost = async (
    text,
    postType,
    keywords,
    temperature = 0.7
  ) => {
    return fetchContent("facebook_post", {
      text,
      post_type: postType,
      keywords,
      temperature,
    });
  };

  const generateEmail = async (subject, temperature = 0.7) => {
    return fetchContent("email", { subject, temperature });
  };

  const generateEmailReply = async (
    previousEmail,
    keyPoints,
    temperature = 0.7
  ) => {
    return fetchContent("email_reply", {
      previous_email: previousEmail,
      key_points: keyPoints,
      temperature,
    });
  };

  const generateCoverLetter = async (role, skills, temperature = 0.7) => {
    return fetchContent("cover_letter", { role, skills, temperature });
  };

  const generateBlog = async (subject, noOfHeading = 5, temperature = 0.7) => {
    return fetchContent("blog", {
      subject,
      no_of_heading: noOfHeading,
      temperature,
    });
  };

  const generateLinkedInPost = async (
    objective,
    targetAudience,
    keyPoints,
    temperature = 0.7
  ) => {
    return fetchContent("linkedin_post", {
      objective,
      target_audience: targetAudience,
      key_points: keyPoints,
      temperature,
    });
  };

  // Values to be provided by the context
  const value = {
    loading,
    error,
    generateVideoIdea,
    generateVideoDescription,
    generateChannelDescription,
    generateTagline,
    generateStory,
    generateProductDescription,
    paraphraseText,
    generateJobDescription,
    generateFacebookPost,
    generateEmail,
    generateEmailReply,
    generateCoverLetter,
    generateBlog,
    generateLinkedInPost,
  };

  return <RyteContext.Provider value={value}>{children}</RyteContext.Provider>;
};

// Custom hook to use the content context
export const useContent = () => {
  const context = useContext(RyteContext);
  if (!context) {
    throw new Error("useContent must be used within a RyteProvider");
  }
  return context;
};
