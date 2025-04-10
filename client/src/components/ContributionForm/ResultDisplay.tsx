import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ResultDisplayProps {
  resultTitle: string;
  result: string;
  handleEdit: () => void;
  handleNewPrompt: () => void;
  viewingHistory: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  resultTitle,
  result,
  handleEdit,
  handleNewPrompt,
}) => {
  const [isResultFocused, setIsResultFocused] = useState(false);

  return (
    <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-xl shadow-md max-w-2xl w-full mt-16 lg:mt-0">
      <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold mb-4 text-gray-800">
        {resultTitle}
      </h2>
      <div
        tabIndex={0}
        onFocus={() => setIsResultFocused(true)}
        onBlur={() => setIsResultFocused(false)}
        className={`w-full p-4 border rounded-lg mb-6 transition-all duration-300 overflow-y-auto max-h-[60vh] min-h-24 leading-relaxed ${
          isResultFocused
            ? "border-blue-400 ring-2 ring-blue-200"
            : "border-gray-300"
        }`}
      >
        {result ? (
          <div className="break-words text-base sm:text-lg lg:text-base">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <button
          onClick={handleEdit}
          className="bg-[#6D4C41] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#5C3B31] transition w-full"
        >
          Edit Input
        </button>
        <button
          onClick={handleNewPrompt}
          className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-300 transition w-full mt-4"
        >
          New Prompt
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
