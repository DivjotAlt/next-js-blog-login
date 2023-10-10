import Layout from "../../components/layout";
import { getPublicAccount, getUserNames } from "../../lib/accounts";
import useToken from "../../components/hooks/useToken";
import { queryApi } from "../../lib/queryApi";
import { useState } from "react";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  let userData = getData(router.query.user);
  let [ownUserPage, setOwnUserpage] = useState(false);
  let token = useToken().getToken();
  if (token) {
    (async () => {
      if (await useToken().getUsername()) setOwnUserpage(true);
    })();
  }f
  return (
    <Layout>
      <h1>{userData.username}</h1>
      <p>{ownUserPage && "This is your account"}</p>
    </Layout>
  );
}

function getData(username) {
  return getPublicAccount(username);
}
