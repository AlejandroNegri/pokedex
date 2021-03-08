import styles from "./pokemonType.module.css";

export default function PokemonType({ type }) {
  return (
    <span className={`${styles[type]} ${styles.typeSpan}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
