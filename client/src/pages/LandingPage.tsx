import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from ".././consts";

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username || "User");
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    navigate("/");
  };

  const initialFormDataRegister = {
    username: "",
    email: "",
    password: "",
  };
  const [formDataRegister, setFormDataRegister] = useState(initialFormDataRegister);

  const initialFormDataLogin = {
    email: "",
    password: "",
  };

  const [formDataLogin, setFormDataLogin] = useState(initialFormDataLogin);

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataRegister({ ...formDataRegister, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isLogin) {
        const { data } = await axios.post(`${API_URL}/users/register`, formDataRegister);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setFormDataRegister(initialFormDataRegister);
        setErrorMessage("");
        setIsLoggedIn(true);
        try {
          const payload = JSON.parse(atob(data.token.split(".")[1]));
          setUsername(payload.username || "User");
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
      if (isLogin) {
        const { data } = await axios.post(`${API_URL}/users/login`, formDataLogin);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setFormDataLogin(initialFormDataLogin);
        setErrorMessage("");
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.errors) {
          setErrorMessage(err.response?.data.errors[0].msg);
        } else if (err.response?.data.message) {
          setErrorMessage(err.response?.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  const inputFieldsRegister = [
    { placeholder: "username", name: "username", type: "string" },
    { placeholder: "email", name: "email", type: "email" },
    { placeholder: "password", type: "password", name: "password" },
  ];

  const inputFieldsLogin = [
    { placeholder: "email", name: "email", type: "email" },
    { placeholder: "password", type: "password", name: "password" },
  ];

  return (
    <div className="w-full bg-[#E9D4C3] flex flex-col">
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
                  Begin Chat                </button>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-[#6D4C41] text-white ml-5 py-2 px-2 rounded hover:bg-[#5C3B31]"
                >
                  Logout
                </button>
              </div>

            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-4">{isLogin ? "Login" : "Register"}</h2>

                <form className="flex flex-col" onSubmit={onSubmit}>
                  {!isLogin ? (
                    <>
                      {inputFieldsRegister.map((input) => (
                        <input
                          key={input.name}
                          className="bg-white text-black py-2 rounded mb-2"
                          id={input.placeholder}
                          placeholder={input.placeholder}
                          name={input.name}
                          type={input.type}
                          value={formDataRegister[input.name as keyof typeof formDataRegister]}
                          onChange={onChangeRegister}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {inputFieldsLogin.map((input) => (
                        <input
                          key={input.name}
                          className="bg-white text-black py-2 rounded mb-2"
                          id={input.placeholder}
                          placeholder={input.placeholder}
                          name={input.name}
                          type={input.type}
                          value={formDataLogin[input.name as keyof typeof formDataLogin]}
                          onChange={onChangeLogin}
                        />
                      ))}
                    </>
                  )}
                  <button type="submit" className="bg-[#6D4C41] text-white py-2 rounded hover:bg-[#5C3B31]">
                    {isLogin ? "Sign In" : "Register"}
                  </button>
                  <div id="container-password">
                    {errorMessage && <h3 className='errorMessageRegister'>{errorMessage}</h3>}
                  </div>
                </form>

                <p className="mt-4 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <span className="text-[#6D4C41] cursor-pointer underline" onClick={toggleForm}>
                    {isLogin ? "Register here" : "Login here"}
                  </span>
                </p>
              </div>
            )}
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
        <div className="w-full flex flex-col md:flex-row justify-between py-10 px-4 md:px-20">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/5478213/pexels-photo-5478213.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="About" className="rounded-lg shadow-lg w-full max-w-xs" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              "Gemini AI Chat App is an intelligent chatbot platform that allows users t
              o ask questions and receive real-time responses in a conversational format.
              Designed to enhance productivity and streamline information retrieval..."
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#F3E5D7] w-full py-6 text-center text-xl font-bold">Footer</div>
    </div>
  );
};

export default LandingPage;