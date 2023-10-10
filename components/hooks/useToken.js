import { useState } from "react";
import { queryApi } from "../../lib/queryApi";

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
  const getUsername = async () => {
    if (getToken()) {
      return (await queryApi("username", { token: getToken() })).username;
    }
    return undefined;
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
    getUsername,
  };
}
