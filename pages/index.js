import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostNames } from "../lib/posts";

export async function getStaticProps() {
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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi! I am Billi. I love to hunt mice and drinking milk. I am an angry
          Billi as shown in my picture{" "}
          <span
            style={{
              transform: "rotate(90deg)",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            &gt;:(
          </span>
        </p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
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
        <Link href="/modal">Go to modal page</Link>
      </section>
    </Layout>
  );
}
