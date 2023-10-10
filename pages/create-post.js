import Link from "next/link";
import useToken from "../components/hooks/useToken";
import Layout from "../components/layout";
import { useState } from "react";
import { queryApi } from "../lib/queryApi";

export default function CreatePost() {
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [head, setHead] = useState("");
  const [para, setPara] = useState("");
  const { getToken, getUsername } = useToken();
  if (!getToken()) {
    return (
      <Layout>
        <h1>
          You need to authenticate yourself first. <br /> Do it{" "}
          <Link href="/authenticate">here</Link>
        </h1>
      </Layout>
    );
  }

  (async () => {
    setUsername(await getUsername());
  })();

  async function handleFormSubmit(e) {
    e.preventDefault();
    let queryObject = {
      id,
      description: desc,
      heading: head,
      paragraph: para,
      token: getToken(),
    };
    console.log(await queryApi("create-post", queryObject));
  }
  return (
    <Layout>
      {username && (
        <>
          <h1>Create a post {username && `as ${username}`}</h1>
          <form onSubmit={handleFormSubmit}>
            <p>Description</p>
            <input
              required
              type="text"
              maxLength={50}
              onChange={(e) => setDesc(e.target.value)}
            />
            <p>ID</p>
            <input
              required
              type="text"
              minLength={3}
              maxLength={20}
              onChange={(e) => setId(e.target.value)}
            />
            <h2>Content</h2>
            <p>Heading</p>
            <input
              required
              type="text"
              minLength={3}
              maxLength={50}
              onChange={(e) => setHead(e.target.value)}
            />
            <p>Paragraph</p>
            <textarea
              type="text"
              maxLength={400}
              onChange={(e) => setPara(e.target.value)}
            />
            <br />
            <button type="submit">Create a post</button>
          </form>
        </>
      )}
    </Layout>
  );
}
