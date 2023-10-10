import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostNames } from "../lib/posts";

export async function getServerSideProps() {
  let postNames = getPostNames();
  return {
    props: {
      postNames,
    },
  };
}

export default function Home({ postNames }) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <span
          style={{
            transform: "rotate(90deg)",
            display: "inline-block",
            width: "fit-content",
          }}
        >
          &gt;:(
        </span>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={`${utilStyles.headingLg}`}>Polls</h1>
        <ul>
          {postNames?.map((postName) => (
            <li key={postName}>
              <Link href={`/posts/${postName}`}>{postName}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Link href="/authenticate">Go to authenticate page</Link> <br />
        <Link href="/modal">Go to modal page</Link> <br />
        <Link href="/create-post">Create a post</Link>
      </section>
    </Layout>
  );
}
