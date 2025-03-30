import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(null);

  const base64UrlDecode = (input: string): string => {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  };

  if (isLoggedIn && !username) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64Url = token.split(".")[1];
        const payloadJson = base64UrlDecode(payloadBase64Url);
        const payload = JSON.parse(payloadJson);
        setUsername(payload.username || "User");
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUsername(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    }
  }

  const login = (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsLoggedIn(true);

    try {
      const payloadBase64Url = token.split(".")[1];
      const payloadJson = base64UrlDecode(payloadBase64Url);
      const payload = JSON.parse(payloadJson);
      setUsername(payload.username || "User");
      navigate("/");
    } catch (error) {
      console.error("Error decoding token during login:", error);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
      setUsername(null);
      navigate("/");
    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  return { isLoggedIn, username, login, logout };
};