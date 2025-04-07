import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface FormState {
  persona: string;
  context: string;
  task: string;
  output: string;
  constraint: string;
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<SetStateAction<string>>;
  setResultTitle: Dispatch<SetStateAction<string>>;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setViewingHistory: Dispatch<SetStateAction<boolean>>;
  userHistory: any[];
  handleDeleteHistory: (id: number) => Promise<void>;
  loading: boolean;
  formData: FormState;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setResult,
  setResultTitle,
  setShowResult,
  setViewingHistory,
  userHistory,
  handleDeleteHistory,
  loading,
}) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleHistoryClick = (item: any) => {
    const title = `${item.persona || "Untitled"} - ${item.task || ""}`;
    const response = item.response ? item.response : "No response available";

    setResult(response);
    setResultTitle(title);
    setShowResult(true);
    setViewingHistory(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <aside
      className={`md:w-1/5 p-4 pt-10 flex justify-center bg-[#f1e9d7] ${
        isMobileMenuOpen
          ? "fixed top-0 left-0 h-full w-full z-50 transform translate-x-0"
          : "transform -translate-x-full md:translate-x-0"
      } transition-transform duration-300 md:static ${
        isMobileMenuOpen ? "block" : "hidden md:block"
      }`}
    >
      <div className="bg-white w-full flex flex-col justify-between max-w-2xl p-6 rounded-xl shadow-md">
        {isMobileMenuOpen && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="w-full">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="font-bold text-3xl mb-6 hover:text-[#4a250a]">
              AskIQ
            </h1>
          </div>
          <ul className="p-4 pl-1 space-y-3 overflow-y-auto min-h-[70vh] max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {loading ? (
              <li className="text-gray-400 text-sm text-center">Loading...</li>
            ) : userHistory && userHistory.length > 0 ? (
              userHistory.map((item: any) => (
                <li key={item.id}>
                  <div
                    className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-start justify-between transition-colors duration-200 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none"
                    tabIndex={0} // Corrected to lowercase tabindex
                  >
                    <div
                      className="cursor-pointer flex-grow break-words overflow-hidden"
                      onClick={() => handleHistoryClick(item)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {item.persona}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.task}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 text-sm">
                <svg
                  className="h-10 w-10 mb-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3M3 11h18M5 19h14M5 15h14m-9 4h4"
                  />
                </svg>
                <span>No history found</span>
                <span className="text-xs text-gray-500">
                  Start by making a new prompt!
                </span>
              </div>
            )}
          </ul>
        </div>
        <div className="flex items-center justify-center mt-6 space-x-2">
          <span className="text-sm text-gray-600">Logged in as:</span>
          <span className="text-sm font-semibold text-[#5C2E0C]">
            {username || "Guest"}
          </span>
        </div>
        <div className="mt-2 text-center">
          <div
            onClick={logout}
            className="text-sm text-[#5C2E0C] font-semibold cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;