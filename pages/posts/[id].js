import Layout from "../../components/layout";
import styles from "../../styles/[id].module.css";
import { queryApi } from "../../lib/queryApi";
import { getPostObject } from "../../lib/posts";
import useToken from "../../components/hooks/useToken";
import Link from "next/link";

export default function Post({ post }) {
  // if (!getToken()) {
  //   return (
  //     <Layout>
  //       <h1>You have to be logged in to view this</h1>
  //       <h2>
  //         <Link href="/authenticate">Go to the authenticate page</Link>
  //       </h2>
  //     </Layout>
  //   );
  // }
  let currentViews;
  (async () => {
    currentViews = await queryApi("post-view", { postId: post.id });
    post.views = currentViews?.views;
  })();
  return (
    <Layout>
      <h1 className={styles.marginZero}>{post.content.heading}</h1>
      <div className={styles.metadataContainer}>
        <div className={styles.metadata}>{post.id}</div>
        <div className={styles.metadata}>{post.views}</div>
        <div className={styles.metadata}>
          <Link href={`/users/${post.author}`}>{post.author}</Link>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <p>{post.content.paragraph}</p>
      </div>
      {JSON.stringify(post)}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return { props: { post: getPostObject(context.params.id) } };
}
