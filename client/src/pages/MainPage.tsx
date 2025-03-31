import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from ".././consts";

export default function ContributionForm() {
  const initialFormState = {
    persona: "",
    context: "",
    task: "",
    output: "",
    constraint: "",
  };

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("11111");
  const [isResultFocused, setIsResultFocused] = useState(false);
  const navigate = useNavigate();

  interface HistoryItem {
    title: string;
    result: string;
  }

  const historyMock = [{
    title: "Frontend Developer Prompt1",
    result: "You are a junior frontend developer eager to build your first portfolio.",
  },
  {
    title: "Frontend Developer Prompt2",
    result: "You are a junior frontend developer eager to build your first portfolio.",
  },
  {
    title: "Frontend Developer Prompt3",
    result: "You are a junior frontend developer eager to build your first portfolio.",
  },
  {
    title: "Frontend Developer Prompt4",
    result: "You are a junior frontend developer eager to build your first portfolio.",
  }];

  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [resultTitle, setResultTitle] = useState("Result");
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/history`);
        setUserHistory(response?.data?.history || [...historyMock]); // temporal while not querying the query history
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch user history:", error.message);
        } else {
          console.error("Failed to fetch user history:", error);
        }
      }
    };

    fetchHistory();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    try {
      const response = await axios.post(`${API_URL}/contribute`, formData);
      console.log("Response:", response.data);
      setResult(response.data.result); 
      setResultTitle("Result");
      setShowResult(true);
    } catch (error) {
      console.error("Submission error:", error);
     
    }
  };
  const handleEdit = () => {
    setShowResult(false);
  };

  const handleHistoryClick = (item: any) => {
    setResult(item.result || "No content");
    setResultTitle(item.title || "Untitled History");
    setShowResult(true);
    setViewingHistory(true);
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
    setResult("11111");
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
    <div className="flex min-h-screen bg-[#E9D4C3]">
      {/* Sidebar */}
      <aside className="w-1/5  shadow-md  p-5 pt-10 flex justify-center  bg-[#F3E5D7]">
      <div className="bg-white w-full flex flex-col justify-between max-w-2xl p-6 rounded-xl  shadow">
        <div className="w-full">
        <h2 className="font-bold text-lg mb-6">App Name</h2>
        <ul className="space-y-4">
        {userHistory.length > 0 ? (
              userHistory.map((item: any, i: number) => (
                <li key={i} className="text-gray-700 hover:text-black cursor-pointer" 
                    onClick={() => handleHistoryClick(item)}>
                    {item.title}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No history found</li>
            )}
        </ul>
        </div>
        <div className="mt-10 space-y-2 text-center">
            <button
              className="bg-[#5C2E0C] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#4a250a] transition"
            >
              usernameOne
            </button>
            <div
            onClick={handleLogout} className="text-sm text-[#5C2E0C] font-semibold cursor-pointer">Logout</div>
          </div>
        </div>
      </aside>

      {/* Main Form */}
      <main className="flex-1 p-10 flex justify-center bg-main-bg bg-cover" >
      {showResult ? (
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow text-center">
            <h2 className="font-bold text-xl mb-4">{resultTitle}</h2>
            <div
              tabIndex={0}
              onFocus={() => setIsResultFocused(true)}
              onBlur={() => setIsResultFocused(false)}
              className={`h-[80%] w-full p-4 border rounded-xl resize-none h-24 whitespace-pre-line mb-6 transition-all duration-200 ${
                isResultFocused ? "border-orange-400 ring-2 ring-orange-300" : "border-gray-200"
              }`}
            >
              "{result}"
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
               className="text-sm text-[#5C2E0C] font-semibold cursor-pointer">New Prompt</div>
            </div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-6 shadow">
        {fields.map(({ name, label, description }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <p className="text-sm text-gray-500 mb-2 italic">{description}</p>
              <textarea
                name={name}
                value={(formData as any)[name]}
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
              submit
            </button>
          </div>
        </form>
        )}
      </main>
    </div>
  );
}
