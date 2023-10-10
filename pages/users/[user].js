import Layout from "../../components/layout";
import { getPublicAccount, getUserNames } from "../../lib/accounts";
import useToken from "../../components/hooks/useToken";
import { queryApi } from "../../lib/queryApi";
import { useState } from "react";

export default function UserPage({ userData }) {
  let [ownUserPage, setOwnUserpage] = useState(false);
  let token = useToken().getToken();
  if (token) {
    console.log("token detected");
    (async () => {
      let res = await queryApi("username", { token });
      console.log(await res);
      if ((await res.username) === userData.username) {
        console.log("setting as own user page");
        setOwnUserpage(true);
      }
    })();
  }
  return (
    <Layout>
      <h1>{userData.username}</h1>
      <p>{ownUserPage && "This is your account"}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  const userNames = getUserNames();
  return {
    paths: [
      ...userNames.map((userName) => {
        return {
          params: {
            user: userName,
          },
        };
      }),
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const userData = getPublicAccount(params.user);
  return {
    props: {
      userData,
    },
  };
}
