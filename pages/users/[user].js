import Layout from "../../components/layout";
import { getPublicAccount } from "../../lib/accounts";
import useToken from "../../components/hooks/useToken";
import { useState } from "react";

export default function UserPage({ userData }) {
  let [ownUserPage, setOwnUserpage] = useState(false);
  let token = useToken().getToken();
  if (token) {
    (async () => {
      if (await useToken().getUsername()) setOwnUserpage(true);
    })();
  }
  f;
  return (
    <Layout>
      <h1>{userData.username}</h1>
      <p>{ownUserPage && "This is your account"}</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return { props: { userData: getPublicAccount(context.params.user) } };
}
