import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from ".././consts";
import axios, { AxiosError } from "axios";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: (token: string) => void;
}

interface AuthResponse {
  token: string;
  errors?:
    | string[]
    | {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
      }[];
  message?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin, login }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
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
    setRegistrationComplete(false);
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
    setErrorMessage("");
    setRegistrationComplete(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let token: string;
      if (!isLogin) {
        const { data } = await axios.post<AuthResponse>(`${API_URL}/users/register`, formDataRegister);
        token = data.token;
        setFormDataRegister({ username: "", email: "", password: "" });
        setRegistrationComplete(true);
        setIsLogin(true);
      } else {
        const { data } = await axios.post<AuthResponse>(`${API_URL}/users/login`, formDataLogin);
        token = data.token;
        setFormDataLogin({ email: "", password: "" });
      }
      login(token);
      setErrorMessage("");
      if (!isLogin) {
        navigate("/?regSuccess=true");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response?.data) {
          const responseData = axiosError.response.data as AuthResponse;
          if (responseData.errors && Array.isArray(responseData.errors)) {
            if (typeof responseData.errors[0] === "string") {
              setErrorMessage(responseData.errors.join("\n"));
            } else {
              const errorMessages = responseData.errors
                .map((error) => (typeof error === "object" && error.msg) || "")
                .filter(Boolean)
                .join("\n");
              setErrorMessage(errorMessages);
            }
          } else if (responseData.message) {
            setErrorMessage(responseData.message);
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
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

  useEffect(() => {
    setErrorMessage("");
  }, [isLogin]);

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      {errorMessage && (
        <h3
          className="errorMessageRegister"
          style={{ whiteSpace: "pre-line", color: "red", marginBottom: "10px" }}
        >
          {errorMessage}
        </h3>
      )}
      {registrationComplete && (
        <h3 style={{ color: "green", marginBottom: "10px" }}>Registration complete! Please log in.</h3>
      )}
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
    </form>
  );
};

export default AuthForm;