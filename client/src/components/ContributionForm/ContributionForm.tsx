import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContributionForm } from "./useContributionForm";
import { useUserHistory } from "./useUserHistory";
import Sidebar from "./Sidebar";
import FormFields from "./FormFields";
import ResultDisplay from "./ResultDisplay";

export default function ContributionForm() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchHistory } = useUserHistory();
  const {
    formData,
    showResult,
    result,
    resultTitle,
    viewingHistory,
    handleChange,
    handleSubmit,
    handleEdit,
    handleNewPrompt,
    setResult,
    setResultTitle,
    setShowResult,
    setViewingHistory,
  } = useContributionForm(fetchHistory);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (!isLoggedIn) {
      navigate("/?authRequired=true")
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E9D4C3]">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setResult={setResult}
        setResultTitle={setResultTitle}
        setShowResult={setShowResult}
        setViewingHistory={setViewingHistory}
      />
      <div className="md:hidden p-4 fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#5C2E0C] focus:outline-none"
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <main className="flex-1 p-5 md:p-10 flex justify-center bg-main-bg bg-cover">
        {showResult ? (
          <ResultDisplay
            resultTitle={resultTitle}
            result={result}
            handleEdit={handleEdit}
            handleNewPrompt={handleNewPrompt}
            viewingHistory={viewingHistory}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-6 shadow"
          >
            <FormFields formData={formData} handleChange={handleChange} />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#5C2E0C] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#4a250a] transition"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}