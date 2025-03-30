import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../consts";
import { useAuth } from "../../hooks/useAuth";

interface HistoryItem {
  title: string;
  result: string;
  id: number;
}

export const useUserHistory = () => {
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const { isLoggedIn } = useAuth();

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

  useEffect(() => {
    if (isLoggedIn) {
      fetchHistory();
    } else {
      setUserHistory([]);
    }
  }, [isLoggedIn]);

  return { userHistory, fetchHistory, handleDeleteHistory };
};