import React, { useState } from "react";

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
  viewingHistory,
}) => {
  const [isResultFocused, setIsResultFocused] = useState(false);

  return (
    <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow text-center">
      <h2 className="font-bold text-xl mb-4">{resultTitle}</h2>
      <div
        tabIndex={0}
        onFocus={() => setIsResultFocused(true)}
        onBlur={() => setIsResultFocused(false)}
        className={`w-full p-4 border rounded-xl mb-6 transition-all duration-200 
              overflow-auto max-h-80 min-h-24 break-words leading-relaxed 
              ${isResultFocused
            ? "border-orange-400 ring-2 ring-orange-300"
            : "border-gray-200"
          }`}
      >
        {result ? result : <span className="text-gray-400">Loading...</span>}
      </div>
      <div className="space-y-2">
        {!viewingHistory && (
          <button
            onClick={handleEdit}
            className="bg-[#5C2E0C] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#4a250a] transition"
          >
            Edit Input
          </button>
        )}
        <div
          onClick={handleNewPrompt}
          className="text-sm text-[#5C2E0C] font-semibold cursor-pointer"
        >
          New Prompt
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;