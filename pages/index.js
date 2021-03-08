import React, { useState, useEffect } from "react";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import PokemonBox from "../components/PokemonBox/pokemonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Home({ pokemonListData }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const router = useRouter();

  useEffect(() => {}, [filteredPokemonList]);

  useEffect(() => {
    setPokemonList(pokemonListData);
    setFilteredPokemonList(pokemonListData);
  }, []);

  const onSearch = (e) => {
    setFilteredPokemonList(pokemonList);

    const filterTable = pokemonList.filter((o) => {
      return o.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredPokemonList(filterTable);
  };

  const onPokemonClick = (p) => {
    router.push({ pathname: "/pokemon", query: { id: p.id } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={utilStyles.content}>
      <Head>
        <title>Pokedex</title>
      </Head>

      <div className={utilStyles.topArea}>
        <div className={utilStyles.searchArea}>
          <input
            className={utilStyles.searchInput}
            placeholder="Buscar Pokémon"
            onChange={(e) => onSearch(e)}
          ></input>
          <FontAwesomeIcon className={utilStyles.searchIcon} icon={faSearch} />
        </div>
      </div>

      <div className={utilStyles.pokemonArea}>
        {filteredPokemonList.map((p) => {
          return <PokemonBox data={p} onClick={() => onPokemonClick(p)} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const data = await res.json();
  const pokemonListData = data.results.map((data, index) => ({
    name: data.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
    data: data,
  }));
  return { props: { pokemonListData } };
}

export default Home;
