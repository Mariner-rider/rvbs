// ContentGenerator.js
import { useContent } from "../../context/RyteContext";
import React, { useState, useEffect } from "react";
import { SelectBar } from "./SelectBar";
import MainCard from "./MainCard";
import Suggestions from "./Suggestions";

const ContentGenerator = () => {
  // State for selection inputs
  const [tone, setTone] = useState("");
  const [useCase, setUseCase] = useState("");
  const [variant, setVariant] = useState("");
  const [creativity, setCreativity] = useState("balanced");
  const [language, setLanguage] = useState("english");

  // State for the input/output
  const [inputParams, setInputParams] = useState({});
  const [result, setResult] = useState("");

  // Content Context
  const { loading, error, ...generators } = useContent();

  // Define parameter fields for each content type
  const paramFields = {
    video_idea: [
      { name: "keywords", label: "Keywords (comma separated)", type: "text" },
    ],
    video_description: [
      { name: "videoTitle", label: "Video Title", type: "text" },
    ],
    channel_description: [
      { name: "channelName", label: "Channel Name", type: "text" },
    ],
    tagline: [{ name: "description", label: "Description", type: "text" }],
    story: [
      {
        name: "keyPoints",
        label: "Key Points (comma separated)",
        type: "text",
      },
      { name: "words", label: "Word Count", type: "number", defaultValue: 500 },
    ],
    product_description: [
      { name: "productName", label: "Product Name", type: "text" },
      {
        name: "productFeatures",
        label: "Product Features (comma separated)",
        type: "text",
      },
      {
        name: "keywords",
        label: "Keywords (comma separated)",
        type: "text",
      },
    ],
    paraphrase: [
      { name: "text", label: "Text to Paraphrase", type: "textarea" },
    ],
    job_description: [{ name: "jobRole", label: "Job Role", type: "text" }],
    facebook_post: [
      { name: "text", label: "Post Content", type: "textarea" },
      { name: "postType", label: "Post Type", type: "text" },
      {
        name: "keywords",
        label: "Keywords (comma separated)",
        type: "text",
      },
    ],
    email: [{ name: "subject", label: "Email Subject", type: "text" }],
    email_reply: [
      { name: "previousEmail", label: "Previous Email", type: "textarea" },
      {
        name: "keyPoints",
        label: "Key Points to Include (comma separated)",
        type: "text",
      },
    ],
    cover_letter: [
      { name: "role", label: "Job Role", type: "text" },
      { name: "skills", label: "Skills (comma separated)", type: "text" },
    ],
    blog: [
      { name: "subject", label: "Blog Subject", type: "text" },
      {
        name: "noOfHeading",
        label: "Number of Headings",
        type: "number",
        defaultValue: 5,
      },
    ],
    linkedin_post: [
      { name: "objective", label: "Post Objective", type: "text" },
      { name: "targetAudience", label: "Target Audience", type: "text" },
      {
        name: "keyPoints",
        label: "Key Points (comma separated)",
        type: "text",
      },
    ],
  };

  // Function mapping for content type to generator function
  const generatorFunctions = {
    video_idea: (p) => generators.generateVideoIdea(p.keywords, p.temperature),
    video_description: (p) =>
      generators.generateVideoDescription(p.videoTitle, p.temperature),
    channel_description: (p) =>
      generators.generateChannelDescription(p.channelName, p.temperature),
    tagline: (p) => generators.generateTagline(p.description, p.temperature),
    story: (p) => generators.generateStory(p.keyPoints, p.words, p.temperature),
    product_description: (p) =>
      generators.generateProductDescription(
        p.productName,
        p.productFeatures,
        p.keywords,
        p.temperature
      ),
    paraphrase: (p) => generators.paraphraseText(p.text, p.temperature),
    job_description: (p) =>
      generators.generateJobDescription(p.jobRole, p.temperature),
    facebook_post: (p) =>
      generators.generateFacebookPost(
        p.text,
        p.postType,
        p.keywords,
        p.temperature
      ),
    email: (p) => generators.generateEmail(p.subject, p.temperature),
    email_reply: (p) =>
      generators.generateEmailReply(
        p.previousEmail,
        p.keyPoints,
        p.temperature
      ),
    cover_letter: (p) =>
      generators.generateCoverLetter(p.role, p.skills, p.temperature),
    blog: (p) =>
      generators.generateBlog(p.subject, p.noOfHeading, p.temperature),
    linkedin_post: (p) =>
      generators.generateLinkedInPost(
        p.objective,
        p.targetAudience,
        p.keyPoints,
        p.temperature
      ),
  };

  // Options for SelectBar
  const useCaseOptions = [
    {
      label: "Content Creation",
      items: [
        { value: "video_idea", label: "Video Idea" },
        { value: "video_description", label: "Video Description" },
        { value: "channel_description", label: "Channel Description" },
        { value: "story", label: "Story" },
        { value: "blog", label: "Blog" },
      ],
    },
    {
      label: "Marketing",
      items: [
        { value: "tagline", label: "Tagline" },
        { value: "product_description", label: "Product Description" },
        { value: "facebook_post", label: "Facebook Post" },
        { value: "linkedin_post", label: "LinkedIn Post" },
      ],
    },
    {
      label: "Professional",
      items: [
        { value: "job_description", label: "Job Description" },
        { value: "email", label: "Email" },
        { value: "email_reply", label: "Email Reply" },
        { value: "cover_letter", label: "Cover Letter" },
      ],
    },
    {
      label: "Text Processing",
      items: [{ value: "paraphrase", label: "Paraphrase" }],
    },
  ];

  // Reset parameters when use case changes
  useEffect(() => {
    setInputParams({});
  }, [useCase]);

  // Map creativity level to temperature
  const getTemperature = () => {
    switch (creativity) {
      case "low":
        return 0.3;
      case "high":
        return 0.9;
      default:
        return 0.7; // balanced
    }
  };

  const handleInputChange = (name, value) => {
    setInputParams({
      ...inputParams,
      [name]: value,
    });
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!useCase) {
      alert("Please select a use case");
      return;
    }

    const fields = paramFields[useCase] || [];
    let missingFields = [];

    fields.forEach((field) => {
      if (
        !inputParams[field.name] &&
        field.name !== "words" &&
        field.name !== "noOfHeading"
      ) {
        missingFields.push(field.label);
      }
    });

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const generatorFn = generatorFunctions[useCase];
      if (!generatorFn) {
        alert("Invalid use case selected");
        return;
      }

      const params = {
        ...inputParams,
        temperature: getTemperature(),
      };

      const response = await generatorFn(params);
      setResult(
        typeof response === "object"
          ? JSON.stringify(response, null, 2)
          : response
      );
    } catch (err) {
      console.error("Error generating content:", err);
      setResult("Error generating content: " + err.message);
    }
  };

  const renderParamFields = () => {
    const fields = paramFields[useCase] || [];
    return fields.map((field) => (
      <div key={field.name} className="flex flex-col mx-1 flex-1">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {field.label}
        </label>
        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            value={inputParams[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            rows="4"
          />
        ) : field.type === "number" ? (
          <input
            type="number"
            id={field.name}
            value={inputParams[field.name] || field.defaultValue || ""}
            onChange={(e) =>
              handleInputChange(
                field.name,
                parseInt(e.target.value, 10) || field.defaultValue
              )
            }
            className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
        ) : (
          <input
            type="text"
            id={field.name}
            value={inputParams[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
        )}
      </div>
    ));
  };

  return (
    <>
      <SelectBar
        setLanguage={setLanguage}
        setCreativity={setCreativity}
        setVariant={setVariant}
        setUseCase={setUseCase}
        setTone={setTone}
        useCaseOptions={useCaseOptions}
      />
      {/* Results */}
      <MainCard result={result} error={error} loading={loading} />
      <Suggestions
        renderParamFields={renderParamFields}
        handleGenerate={handleGenerate}
        useCase={useCase}
        loading={loading}
      />
    </>
  );
};

export default ContentGenerator;
