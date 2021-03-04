import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

export default function Pokemon() {
  return (
    <Layout>
      <Head>
        <title>Pokemon</title>
      </Head>
      <h1>Pokemon</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
