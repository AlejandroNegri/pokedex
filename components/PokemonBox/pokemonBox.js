import styles from "./pokemonBox.module.css";

export default function PokemonBox({ data }) {
  //console.log("data from box", data);
  return (
    <div className={styles.pokemonBox}>
      <img className={styles.pokemonImage} src={data.image} />
      <div className={styles.pokemonInfo}>
        <p className={styles.pokemonName}>
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </p>
        <p className={styles.pokemonNumber}>
          #{data.id.toLocaleString("en", { minimumIntegerDigits: 3 })}
        </p>
      </div>
    </div>
  );
}
