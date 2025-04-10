import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
import GifAnimation from "../components/GifAnimation";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  const { isLoggedIn, username, logout, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full bg-[#f1e9d7] flex flex-col min-h-screen overflow-hidden relative">
      {/* Hero Section */}
      
     
      <div className="w-full flex flex-col md:flex-row justify-between py-10 px-4 md:px-20 mb-20 ">
        {/* Left Column - Auth & Info */}
        <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0  xs830:ml-10">
          <h1 className="text-5xl font-bold mb-4">AskIQ</h1>
          <p className="text-gray-700 mb-6">
            Our vision is to create a streamlined, user-centric platform that
            simplifies your experience.
          </p>

          {/* Authentication Card */}
          {isLoggedIn ? (
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Welcome, {username}!
              </h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#6D4C41] text-white py-2 px-2 rounded hover:bg-[#5C3B31]"
                >
                  Begin Chat
                </button>
                <button
                  onClick={logout}
                  className="bg-[#6D4C41] text-white py-2 px-2 rounded hover:bg-[#5C3B31]"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {isLogin ? "Login" : "Register"}
              </h2>
              <AuthForm
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                login={login}
              />

              <p className="mt-4 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                  className="text-[#6D4C41] cursor-pointer underline"
                  onClick={toggleForm}
                >
                  {isLogin ? "Register here" : "Login here"}
                </span>
              </p>
            </div>
          )}

          {/* About Us Card */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full mt-6">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              Gemini AI Chat App is an intelligent chatbot platform that allows
              users to ask questions and receive real-time responses in a
              conversational format. Designed to enhance productivity and
              streamline information retrieval...
            </p>
          </div>

          {/* Learn More Button */}
          <div className="flex justify-center md:justify-center items-center mt-10">
            <h2
              className="text-2xl max-xs830:text-xl font-semibold py-3 px-8 rounded-full bg-[#6D4C41] text-white hover:bg-[#5C3B31] cursor-pointer flex items-center"
              onClick={() =>
                document
                  .getElementById("meet-askiq")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </h2>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex bg-[#e1d3c5] border rounded-lg">
          <div className="w-full max-w-md p-4">
            <img
              src="https://images.pexels.com/photos/8489961/pexels-photo-8489961.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Mockup"
              className="rounded-lg shadow-lg w-full mt-10 mx-auto md:ml-20"
            />
          </div>
        </div>
      </div>

      {/* Meet AskIQ Section */}
      <div className="mt-[22rem] mx-4 sm:mx-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
          <h1 id="meet-askiq" className="text-3xl sm:text-4xl font-bold mb-4">
            Meet AskIQ
          </h1>
          <p className="text-lg sm:text-[1.3rem] max-w-5xl">
            AskIQ enhances prompt precision, helping you unlock AI's full
            potential by refining your input for more accurate, insightful, and
            effective responses.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center space-y-10 pt-10 mb-[10rem] sm:mb-[15rem] ">
          <div className="flex flex-col md:flex-row items-center justify-between space-x-0 md:space-x-10">
            <div className="w-full max-w-2xl p-4 md:mr-10">
              {/* Mobile GIF */}
              <img
                src="/mobile_gif.gif"
                alt="Mobile GIF"
                className="block md:hidden w-full"
              />

              {/* Desktop Animation */}
              <div className="hidden md:block">
                <GifAnimation />
              </div>
            </div>

            <div className="text-center md:text-left mt-6 md:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Precision With AskIQ
              </h1>
              <p className="text-lg sm:text-[1.2rem] max-w-2xl mt-4">
                Unlock the power of Google Gemini by leveraging its advanced AI
                capabilities to refine your prompts, making interactions smarter
                and more efficient for optimal results.
              </p>
            </div>
          </div>
        </div>
      </div>
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
