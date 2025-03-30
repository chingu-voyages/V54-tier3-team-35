import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from ".././consts";
import axios from "axios";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin, login }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formDataRegister, setFormDataRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

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
      let token: string;
      if (!isLogin) {
        const { data } = await axios.post(`${API_URL}/users/register`, formDataRegister);
        token = data.token;
        setFormDataRegister({ username: "", email: "", password: "" });
      } else {
        const { data } = await axios.post(`${API_URL}/users/login`, formDataLogin);
        token = data.token;
        setFormDataLogin({ email: "", password: "" });
      }
      login(token);
      setErrorMessage("");
      if (!isLogin){
          navigate("/dashboard");
      } else {
          navigate("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.errors) {
          setErrorMessage(err.response?.data.errors[0].msg);
        } else if (err.response?.data.message) {
          setErrorMessage(err.response?.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
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
        {errorMessage && <h3 className="errorMessageRegister">{errorMessage}</h3>}
      </div>
    </form>
  );
};

export default AuthForm;