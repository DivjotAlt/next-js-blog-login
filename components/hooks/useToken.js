import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState("");
  const saveToken = (token) => {
    setToken(token);
    try {
      localStorage.setItem("token", token);
      if (token === "") {
        localStorage.removeItem(token);
      }
    } catch (_) {
      return;
    }
  };
  const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (_) {
      return;
    }
  };
  return {
    setToken: saveToken,
    getToken,
    token,
  };
}
