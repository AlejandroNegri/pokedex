import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import utilStyles from "../styles/utils.module.css";
import PokemonType from "../components/PokemonType/pokemonType";

function Pokemon() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState({});

  async function getPokemon() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${router.query.id}`
    );
    const data = await res.json();
    setPokemon(data);
  }

  useEffect(() => {
    getPokemon();
  }, [router.query.id]);

  const goToNextPokemon = () => {
    router.push(
      { pathname: "/pokemon", query: { id: pokemon.id + 1 } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const goToPreviousPokemon = () => {
    router.push(
      { pathname: "/pokemon", query: { id: pokemon.id - 1 } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const getPreviousId = () => {
    let previousId = parseInt(router.query.id) - 1;
    return previousId.toLocaleString("en", { minimumIntegerDigits: 3 });
  };

  const getNextId = () => {
    let previousId = parseInt(router.query.id) + 1;
    return previousId.toLocaleString("en", { minimumIntegerDigits: 3 });
  };

  const getPokemonId = () => {
    let pokemonId = parseInt(router.query.id);
    return pokemonId.toLocaleString("en", { minimumIntegerDigits: 3 });
  };

  const getPokemonName = () => {
    let name = pokemon.name;

    return <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>;
  };

  const getPokemonAbility = (ability) => {
    return ability.charAt(0).toUpperCase() + ability.slice(1);
  };

  return pokemon.name ? (
    <div className={utilStyles.content}>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div className={utilStyles.pokemonHeader}>
        <div>
          {pokemon.id !== 1 && (
            <button
              className={utilStyles.navigationButton}
              onClick={() => goToPreviousPokemon()}
            >
              #{getPreviousId()}
            </button>
          )}
        </div>

        <div>
          {pokemon.id !== 151 && (
            <button
              className={utilStyles.navigationButton}
              onClick={() => goToNextPokemon()}
            >
              #{getNextId()}
            </button>
          )}
        </div>
      </div>

      <div className={utilStyles.pokemonCenterArea}>
        <img src={pokemon.sprites.front_default} width="400" height="400" />
        <div className={utilStyles.pokemonDataArea}>
          <div className={utilStyles.pokemonName}>
            {getPokemonName()} #{getPokemonId()}
          </div>
          <div className={utilStyles.pokemonDataRow}>
            <div className={utilStyles.pokemonData}>
              <p className={utilStyles.pokemonText}>Height</p>
              <p className={utilStyles.pokemonText}>{pokemon.height / 10}m</p>
            </div>
            <div className={utilStyles.pokemonData}>
              <p className={utilStyles.pokemonText}>Type</p>
              <p className={utilStyles.pokemonText}>
                {pokemon.types.map((t) => {
                  return <PokemonType type={t.type.name} />;
                })}
              </p>
            </div>
          </div>
          <div className={utilStyles.pokemonDataRow}>
            <div className={utilStyles.pokemonData}>
              <p className={utilStyles.pokemonText}>Weight</p>
              <p className={utilStyles.pokemonText}>
                {Math.round((pokemon.weight / 10) * 2.205 * 100) / 100}lbs (
                {pokemon.weight / 10}Kg)
              </p>
            </div>
            <div className={utilStyles.pokemonData}>
              <p className={utilStyles.pokemonText}>Abilities</p>
              {pokemon.abilities.map((a) => {
                if (!a.isHidden) {
                  return (
                    <p className={utilStyles.pokemonText}>
                      {getPokemonAbility(a.ability.name)}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>

      <h2>
        <Link href="/">
          <button className={utilStyles.navigationButton}>Volver</button>
        </Link>
      </h2>
    </div>
  ) : null;
}

export default Pokemon;
