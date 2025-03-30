import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts";

interface HistoryItem {
  title: string;
  result: string;
  id: number;
}

const getUsernameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || "Unknown User";
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export default function ContributionForm() {
  const initialFormState = {
    persona: "",
    context: "",
    task: "",
    output: "",
    constraint: "",
  };

  const [username, setUsername] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [isResultFocused, setIsResultFocused] = useState(false);
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [resultTitle, setResultTitle] = useState("Result");
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/queries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserHistory(response.data.queries || []);
    } catch (error) {
      console.error("Failed to fetch user history:", error);
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setUsername(getUsernameFromToken());
      fetchHistory();
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const aiResponse = await axios.post(
        `${API_URL}/query-ai/query-response`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const generatedResult = aiResponse.data.response;

      await axios.post(
        `${API_URL}/queries`,
        {
          ...formData,
          response: generatedResult,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResult(generatedResult);
      setResultTitle("Result");
      setShowResult(true);
      fetchHistory();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEdit = () => {
    setShowResult(false);
  };

  const handleHistoryClick = (item: any) => {
    const title = `${item.persona || "Untitled"} - ${item.task || ""}`;

    const response = item.response ? item.response : "No response available";

    setResult(response);
    setResultTitle(title);
    setShowResult(true);
    setViewingHistory(true);
    setIsMobileMenuOpen(false);
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/queries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserHistory(userHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete history item:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const handleNewPrompt = () => {
    setFormData(initialFormState);
    setShowResult(false);
    setViewingHistory(false);
    setResult("");
    setResultTitle("Result");
  };

  const fields = [
    {
      name: "persona",
      label: "Persona",
      description:
        "A persona describes who the result will be tailored for. For example: 'You are a Product Owner, Scrum Master...'",
    },
    {
      name: "context",
      label: "Context",
      description:
        "This provides background information to help the AI generate the best response.",
    },
    {
      name: "task",
      label: "Task",
      description:
        "The task defines what information you need. For example: 'Provide a list of websites...'",
    },
    {
      name: "output",
      label: "Output",
      description:
        "The output defines how you want the AI tool to respond. E.g. 'The tone should be informal...'",
    },
    {
      name: "constraint",
      label: "Constraint",
      description:
        "Constraint provides any boundaries you'd like the AI to honor in the result.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#E9D4C3]">
      {/* Sidebar */}
      <aside
        className={`md:w-1/5 shadow-md p-5 pt-10 flex justify-center bg-[#F3E5D7] ${isMobileMenuOpen
          ? "fixed top-0 left-0 h-full w-full z-50 transform translate-x-0"
          : "transform -translate-x-full md:translate-x-0"
          } transition-transform duration-300 md:static ${isMobileMenuOpen ? "block" : "hidden md:block"
          }`}
      >
        <div className="bg-white w-full flex flex-col justify-between max-w-2xl p-6 rounded-xl shadow">
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
            <div
              onClick={() => navigate("/")} // Navigates to the main page
              className="cursor-pointer"
            >
              <h2 className="font-bold text-lg mb-6">AskIQ</h2>
            </div>            <ul className="space-y-4 overflow-y-auto min-h-[300px] lg:min-h-[80vh] md:min-h-[70vh] sm:min-h-[60vh] min-h-[90vh]">
              {userHistory && userHistory.length > 0 ? (
                userHistory.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="text-gray-700 hover:text-black cursor-pointer flex justify-between items-center"
                  >
                    <span onClick={() => handleHistoryClick(item)}>
                      {item.persona} - {item.task}
                    </span>
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
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
                  </li>


                ))
              ) : (
                <li className="text-gray-400">No history found</li>
              )}
            </ul>

          </div>
          <div className="mt-10 space-y-2 text-center">
            <button className="bg-[#5C2E0C] text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-[#4a250a] transition">
              {username || "Guest"}
            </button>
            <div
              onClick={handleLogout}
              className="text-sm text-[#5C2E0C] font-semibold cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      </aside>
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

      {/* Main Form */}
      <main className="flex-1 p-5 md:p-10 flex justify-center bg-main-bg bg-cover">

        {showResult ? (
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
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-6 shadow"
          >
            {fields.map(({ name, label, description }) => (
              <div key={name}>
                <label className="block font-semibold mb-1">{label}</label>
                <p className="text-sm text-gray-500 mb-2 italic">
                  {description}
                </p>
                <textarea
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            ))}
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