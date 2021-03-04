import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import PokemonBox from "../components/PokemonBox/pokemonBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Home({ pokemonListData }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

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

  return (
    <div className={utilStyles.content}>
      <Head>
        <title>{siteTitle}</title>
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
          return <PokemonBox data={p} />;
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
  }));

  return { props: { pokemonListData } };
}

export default Home;
