"use client";

import Layout from "../components/layout";
import useToken from "../components/hooks/useToken";
import { queryApi } from "../lib/queryApi";
import { useState } from "react";

export default function Authenticate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, getToken } = useToken();

  if (getToken()) {
    return (
      <Layout>
        <h1>Logged in</h1>
      </Layout>
    );
  }
  async function signInFormHandler(e) {
    e.preventDefault();
    const request = await queryApi("sign-in", { username, password });
    if (await request.code) {
      console.log("Error: " + request.code);
    } else {
      if (await request.token) {
        setToken(request.token);
      }
    }
  }
  async function signUpFormHandler(e) {
    e.preventDefault();
    const request = await queryApi("sign-up", { username, password });
    if (await request.code) {
      console.log("Error: " + request.code);
    } else {
      if (await request.token) {
        setToken(request.token);
      }
    }
  }
  return (
    <Layout>
      <h1>Welcome to Auth :)</h1>
      <form onSubmit={signInFormHandler}>
        <h2 style={{ marginBottom: 0 }}>Sign In</h2>
        Username:{" "}
        <input type="text" onChange={(e) => setUsername(e.target.value)} />{" "}
        <br />
        Password:{" "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={signUpFormHandler} style={{ marginTop: "1rem" }}>
        <h2 style={{ marginBottom: 0 }}>Sign Up</h2>
        Username:{" "}
        <input type="text" onChange={(e) => setUsername(e.target.value)} />{" "}
        <br />
        Password:{" "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
