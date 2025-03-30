import React from "react";

const LandingContent: React.FC = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between py-10 px-4 md:px-20">
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
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700">
          "Gemini AI Chat App is an intelligent chatbot platform that allows users to ask questions and receive real-time responses in a conversational format. Designed to enhance productivity and streamline information retrieval..."
        </p>
      </div>
    </div>
  );
};

export default LandingContent;