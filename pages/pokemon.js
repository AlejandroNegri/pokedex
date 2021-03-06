import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

function Pokemon({pokemonListData}) {
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

export async function getServerSideProps({ query }) {
console.log("pokeset");
  console.log("id", query.id);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const data = await res.json();
  const pokemonListData = data.results.map((data, index) => (
    {
      name: data.name,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
        }.png`,
      data: data
    }
  ));
  return { props: { pokemonListData } };
}

export default Pokemon;
