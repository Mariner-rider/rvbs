// import React, { useState } from "react";

// const Side = ({ onGenerate }) => {
//   const [language, setLanguage] = useState("");
//   const [tone, setTone] = useState("");
//   const [useCase, setUseCase] = useState("");
//   const [response, setResponse] = useState("");
//   const [variant, setVariant] = useState("");
//   const [creativity, setCreativity] = useState("");

//   const handleGenerate = () => {
//     const data = {
//       language,
//       tone,
//       useCase,
//       response,
//       variant,
//       creativity,
//     };
//     onGenerate(data); // Pass data to parent
//   };

//   return (
//     <div className="w-full max-w-xs md:max-w-sm bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col space-y-6 h-screen sticky top-0">
//       {/* Language and Tone Section */}
//       <div className="flex flex-col md:flex-row md:space-x-4">
//         <div className="flex-1">
//           <label htmlFor="language" className="block text-sm font-medium text-gray-700">
//             Select Language
//           </label>
//           <select
//             id="language"
//             className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option className="text-black" value="">-- Choose Language --</option>
//             <option className="text-black" value="english">English</option>
//             <option  className="text-black" value="spanish">Spanish</option>
//             <option className="text-black" value="french">French</option>
//           </select>
//         </div>
//         <div className="flex-1 mt-4 md:mt-0">
//           <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
//             Select Tone
//           </label>
//           <select
//             id="tone"
//             className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={tone}
//             onChange={(e) => setTone(e.target.value)}
//           >
//             <option className="text-black" value="">-- Choose Tone --</option>
//             <option className="text-black" value="formal">Formal</option>
//             <option className="text-black" value="informal">Informal</option>
//             <option className="text-black" value="friendly">Friendly</option>
//           </select>
//         </div>
//       </div>

//       {/* Use Case Section */}
//       <div>
//         <label htmlFor="useCase" className="block text-sm font-medium text-gray-700">
//           Choose Use Case
//         </label>
//         <select
//           id="useCase"
//           className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           value={useCase}
//           onChange={(e) => setUseCase(e.target.value)}
//         >
//           <option className="text-black" value="">-- Choose Use Case --</option>
//           <option className="text-black" value="blog">Blog Writing</option>
//           <option className="text-black" value="email">Email Drafting</option>
//           <option className="text-black" value="social-media">Social Media Content</option>
//         </select>
//       </div>

//       {/* Your Response Section */}
//       <div>
//         <label htmlFor="response" className="block text-sm font-medium text-gray-700">
//           Your Response
//         </label>
//         <textarea
//           id="response"
//           className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           rows="4"
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//         />
//       </div>

//       {/* Variants and Creativity Section */}
//       <div className="flex flex-col md:flex-row md:space-x-4">
//         <div className="flex-1">
//           <label htmlFor="variant" className="block text-sm font-medium text-gray-700">
//             Variants
//           </label>
//           <select
//             id="variant"
//             className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={variant}
//             onChange={(e) => setVariant(e.target.value)}
//           >
//             <option className="text-black" value="">-- Choose Variant --</option>
//             <option className="text-black" value="v1">Variant 1</option>
//             <option className="text-black" value="v2">Variant 2</option>
//           </select>
//         </div>
//         <div className="flex-1 mt-4 md:mt-0">
//           <label htmlFor="creativity" className="block text-sm font-medium text-gray-700">
//             Creativity
//           </label>
//           <select
//             id="creativity"
//             className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             value={creativity}
//             onChange={(e) => setCreativity(e.target.value)}
//           >
//             <option className="text-black" value="">-- Choose Creativity --</option>
//             <option className="text-black" value="low">Low</option>
//             <option className="text-black" value="medium">Medium</option>
//             <option  className="text-black" value="high">High</option>
//           </select>
//         </div>
//       </div>

//       {/* Generate Button */}
//       <button
//         className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         onClick={handleGenerate}
//       >
//         Generate
//       </button>
//     </div>
//   );
// };

// export default Side;
import React, { useState } from "react";

const Side = ({ onGenerate, darkMode }) => {
  const [language, setLanguage] = useState("");
  const [tone, setTone] = useState("");
  const [useCase, setUseCase] = useState("");
  const [response, setResponse] = useState("");
  const [variant, setVariant] = useState("");
  const [creativity, setCreativity] = useState("");

  const handleGenerate = () => {
    const data = {
      language,
      tone,
      useCase,
      response,
      variant,
      creativity,
    };
    onGenerate(data); // Pass data to parent
  };

  return (
    <div
      className={`w-full max-w-xs md:max-w-sm p-4 rounded-lg shadow-lg flex flex-col space-y-6 h-screen sticky top-0 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Language and Tone Section */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label htmlFor="language" className="block text-sm font-medium">
            Select Language
          </label>
          <select
            id="language"
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">-- Choose Language --</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <label htmlFor="tone" className="block text-sm font-medium">
            Select Tone
          </label>
          <select
            id="tone"
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">-- Choose Tone --</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
      </div>

      {/* Use Case Section */}
      <div>
        <label htmlFor="useCase" className="block text-sm font-medium">
          Choose Use Case
        </label>
        <select
          id="useCase"
          className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <option value="">-- Choose Use Case --</option>
          <option value="blog">Blog Writing</option>
          <option value="email">Email Drafting</option>
          <option value="social-media">Social Media Content</option>
        </select>
      </div>

      {/* Your Response Section */}
      <div>
        <label htmlFor="response" className="block text-sm font-medium">
          Your Response
        </label>
        <textarea
          id="response"
          className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows="4"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      </div>

      {/* Variants and Creativity Section */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label htmlFor="variant" className="block text-sm font-medium">
            Variants
          </label>
          <select
            id="variant"
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option value="">-- Choose Variant --</option>
            <option value="v1">Variant 1</option>
            <option value="v2">Variant 2</option>
          </select>
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <label htmlFor="creativity" className="block text-sm font-medium">
            Creativity
          </label>
          <select
            id="creativity"
            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={creativity}
            onChange={(e) => setCreativity(e.target.value)}
          >
            <option value="">-- Choose Creativity --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleGenerate}
      >
        Generate
      </button>
    </div>
  );
};

export default Side;
