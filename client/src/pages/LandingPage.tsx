import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
import GifAnimation from '../components/gif_animation';  // Adjusted path

const LandingPage: React.FC = () => {
  const { isLoggedIn, username, logout, login } = useAuth(); 
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full bg-[#E9D4C3] flex flex-col">
      <div className="w-full flex flex-col md:flex-row justify-between py-10 px-4 md:px-20">
        <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-xl font-bold mb-4">AskIQ</h1>
          <p className="text-gray-700 mb-6">
            Our vision is to create a streamlined, user-centric platform that simplifies your experience.
          </p>

          {isLoggedIn ? (
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
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-semibold mb-4">{isLogin ? "Login" : "Register"}</h2>
              <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} login={login} />

              <p className="mt-4 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span className="text-[#6D4C41] cursor-pointer underline" onClick={toggleForm}>
                  {isLogin ? "Register here" : "Login here"}
                </span>
              </p>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md w-full mt-6">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              Gemini AI Chat App is an intelligent chatbot platform that allows users to ask questions and receive real-time responses in a conversational format. Designed to enhance productivity and streamline information retrieval...
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="w-full max-w-md">
            <img
              src="https://images.pexels.com/photos/6373865/pexels-photo-6373865.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Mockup"
              className="rounded-lg shadow-lg w-full mb-4"
            />
            <img
              src="https://images.pexels.com/photos/8489961/pexels-photo-8489961.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Mockup"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
        <div className="w-full max-w-md">
          {/* Mobile GIF */}
          <img src="/assets/mobile-gif.gif" alt="Mobile GIF" className="block md:hidden" />
    
          {/* Desktop GIF */}
          <img src="/assets/desktop-gif.gif" alt="Desktop GIF" className="hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;