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
      console.error(_);
    }
  };
  const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (_) {
      console.error(_);
    }
  };
  return {
    setToken: saveToken,
    getToken,
    token,
  };
}
