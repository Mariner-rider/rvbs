import React, { useState } from "react";
import Suggestions from "./Suggestions";
import { SelectBar } from "./SelectBar";

const TopBar = ({ onGenerate }) => {
  const [language, setLanguage] = useState("");
  const [tone, setTone] = useState("");
  const [useCase, setUseCase] = useState("");
  const [response, setResponse] = useState("");
  const [variant, setVariant] = useState("");
  const [creativity, setCreativity] = useState("");

  console.log(language);
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
    <>
      {/* Language and Tone Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <SelectBar
          setLanguage={setLanguage}
          setCreativity={setCreativity}
          setTone={setTone}
          setUseCase={setUseCase}
          setVariant={setVariant}
        />
      </div>
      {/* <div className="absolute bottom-10 left-0 right-0 lg:w-[78rem] mx-auto">
        <Suggestions
          setResponse={setResponse}
          response={response}
          handleGenerate={handleGenerate}
        />
      </div> */}
    </>
  );
};

export default TopBar;
