"use client";

import Layout from "../components/layout";
import Modal from "../components/modal";
import useToken from "../components/hooks/useToken";
import { queryApi } from "../lib/queryApi";
import { useState } from "react";

export default function Authenticate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [modalError, setModalError] = useState(false);
  const { setToken, getToken } = useToken();

  function showModalFunc(heading, content, isError) {
    setModalError(isError);
    setModalContent(content);
    setModalHeading(heading);
    setShowModal(!showModal);
  }
  (async () => {
    if (getToken()) {
      let res = await queryApi("username", { token: getToken() });
      setUsername(await res.username);
    }
  })();
  async function signInFormHandler(e) {
    e.preventDefault();
    const request = await queryApi("sign-in", { username, password });
    if (await request.code) {
      showModalFunc(
        await request.code,
        "The above error occured. Click anywhere to dismiss",
        true
      );
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
      showModalFunc(
        await request.code,
        "The above error occured. Click anywhere to dismiss",
        true
      );
    } else {
      if (await request.token) {
        setToken(request.token);
      }
    }
  }
  return (
    <Layout>
      <Modal
        shown={showModal}
        setShown={setShowModal}
        heading={modalHeading}
        content={modalContent}
        isError={modalError}
      />
      <a
        href="/authenticate"
        onClick={() => {
          setToken("");
        }}
      >
        Sign out
      </a>
      {getToken() ? (
        <h1>Logged in as {username} </h1>
      ) : (
        <>
          <form onSubmit={signInFormHandler}>
            <h2 style={{ marginBottom: 0 }}>Sign In</h2>
            Username:{" "}
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={15}
            />{" "}
            <br />
            Password:{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              maxLength={50}
            />{" "}
            <br />
            <button type="submit">Submit</button>
          </form>
          <form onSubmit={signUpFormHandler} style={{ marginTop: "1rem" }}>
            <h2 style={{ marginBottom: 0 }}>Sign Up</h2>
            Username:{" "}
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={15}
            />{" "}
            <br />
            Password:{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              maxLength={50}
            />{" "}
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </Layout>
  );
}
