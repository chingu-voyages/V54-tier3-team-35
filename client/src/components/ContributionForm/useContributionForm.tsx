import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../consts";

export interface FormState {
  persona: string;
  context: string;
  task: string;
  output: string;
  constraint: string;
}

interface ErrorResponseData {
  message?: string;
  errors?: {
    type: string;
    msg: string;
    path: string;
    location: string;
    value: string;
  }[];
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
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    {
      type: string;
      msg: string;
      path: string;
      location: string;
      value: string;
    }[]
  >([]);
  const [fromEdit, setFromEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setShowResult(true);
    setError(null);
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
    } catch (error) {
      console.error("Submission error:", error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorData = error.response.data as ErrorResponseData;
        if (errorData.errors) {
          setValidationErrors(errorData.errors);
          setShowResult(false);
        } else {
          setError(errorData.message || "An error occurred.");
          setShowResult(false);
        }
      } else if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorData = axiosError.response.data as ErrorResponseData;
          setError(
            `Server error: ${
              errorData.message || axiosError.response.statusText
            }`
          );
        } else if (axiosError.request) {
          setError("Network error: Could not connect to server.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = () => {
    setShowResult(false);
    setError(null);
    setValidationErrors([]);
    setFromEdit(true);
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
    setError(null);
    setValidationErrors([]);
    await fetchHistory();
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
    error,
    validationErrors,
    fromEdit,
    setFormData,
  };
};
