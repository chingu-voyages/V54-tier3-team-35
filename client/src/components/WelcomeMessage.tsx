import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

const WelcomeMessage: React.FC = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Welcome, {username}!</h2>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 bg-[#6D4C41] text-white py-2 px-2 rounded hover:bg-[#5C3B31]"
      >
        Begin Chat
      </button>
      <button
        onClick={logout}
        className="mt-4 bg-[#6D4C41] text-white ml-5 py-2 px-2 rounded hover:bg-[#5C3B31]"
      >
        Logout
      </button>
    </div>
  );
};

export default WelcomeMessage;