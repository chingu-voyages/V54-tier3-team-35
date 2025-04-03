import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Name */}
          <div className="text-xl font-bold mb-4 md:mb-0">
            <span>AskIQ</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a className="text-gray-400 hover:text-white">Terms of Service</a>
            <a className="text-gray-400 hover:text-white">Contact</a>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M23 3a10.1 10.1 0 01-2.9.8A4.9 4.9 0 0022.4 2a9.7 9.7 0 01-3.2 1.3A4.8 4.8 0 0016.3 2c-2.6 0-4.8 2.2-4.8 4.8 0 .4.1.8.2 1.2C8.7 7.9 5 6.2 3.2 3.3c-.3.6-.5 1.3-.5 2 0 1.4.7 2.6 1.7 3.3a4.8 4.8 0 01-2.2-.6v.1c0 2.3 1.6 4.3 3.7 4.7-.4.1-.7.1-1.1.1-.3 0-.6 0-.9-.1.6 1.8 2.3 3.2 4.3 3.3a9.6 9.6 0 01-5.9 2.1c-.4 0-.8 0-1.2-.1 2.2 1.4 4.7 2.1 7.3 2.1 8.8 0 13.6-7.3 13.6-13.6 0-.2 0-.3 0-.5A9.9 9.9 0 0023 3z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 2h-16c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2zm-12 16h-3v-8h3v8zm-1.5-9.5c-.831 0-1.5-.669-1.5-1.5s.669-1.5 1.5-1.5 1.5.669 1.5 1.5-.669 1.5-1.5 1.5zm11.5 9.5h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-8h3v1.134c.875-1.328 3.5-1.328 3.5 2.866v4.866z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; 2025 AskIQ. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
