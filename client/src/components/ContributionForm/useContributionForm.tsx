import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../consts";

interface FormState {
  persona: string;
  context: string;
  task: string;
  output: string;
  constraint: string;
}

export const useContributionForm = (fetchHistory: () => void) => {
  const [formData, setFormData] = useState<FormState>({
    persona: "",
    context: "",
    task: "",
    output: "",
    constraint: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [resultTitle, setResultTitle] = useState("Result");
  const [viewingHistory, setViewingHistory] = useState(false);

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
      await fetchHistory();
      //console.log("handleSubmit: fetchHistory called");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEdit = () => {
    setShowResult(false);
  };

  const handleNewPrompt = async () => {
    setFormData({
      persona: "",
      context: "",
      task: "",
      output: "",
      constraint: "",
    });
    setShowResult(false);
    setViewingHistory(false);
    setResult("");
    setResultTitle("Result");
    await fetchHistory();
    //console.log("handleNewPrompt: fetchHistory called");
  };

  return {
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
  };
};