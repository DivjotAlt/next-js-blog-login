"use client";
import styles from "../styles/authenticate.module.css";
import { useState } from "react";
import Layout from "./layout";
import { queryApi } from "../lib/queryApi";
// import useToken from "./hooks/useToken";

export default async function Authenticate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({
    token: "",
    verified: "",
    code: "",
  });
  if (response.token) {
    let verified = await queryApi("verify-token", { token: response.token });
    if (verified)
      return (
        <Layout>
          <h1>Logged in</h1>
        </Layout>
      );
  }

  function clearUAndP() {
    setPassword("");
    setUsername("");
  }

  async function handleSignUpFormSubmit(e) {
    e.preventDefault();
    const reply = await queryApi("sign-up", { username, password });
    setResponse(reply);
    if (response.token && !localStorage.getItem("token")) {
      localStorage.setItem("token", response.token);
    }
    clearUAndP();
  }

  async function handleSignInFormSubmit(e) {
    e.preventDefault();
    setResponse(await queryApi("sign-in", { username, password }));
    clearUAndP();
  }

  return (
    <Layout>
      <h1 className={styles.formHeading}>Sign-Up</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        Username: {"  "}
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        Password: {"          "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1 className={styles.formHeading}>Sign in</h1>
      <form onSubmit={handleSignInFormSubmit}>
        Username: {"  "}
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        Password: {"          "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="overflow">
        {response.code}
        {response.token}
        {response.verified}
        {(() => {
          console.log(response.token);
          if (response.token && !localStorage.getItem("token"))
            localStorage.setItem("token", response.token);
          return "YES";
        })()}
      </div>
    </Layout>
  );
}
