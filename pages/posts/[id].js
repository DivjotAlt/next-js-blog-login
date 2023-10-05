import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div>{postData.contentHtml}</div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const ids = getAllPostIds();
  return {
    paths: [
      ...ids.map((id) => {
        return {
          params: {
            id,
          },
        };
      }),
    ],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
