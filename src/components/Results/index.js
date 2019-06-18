import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../data/characters";
import styles from "./styles.module.sass";

const Results = () => {
  const data = useContext(Context);
  return (
    <ul className={styles.list}>
      {data.map(character => {
        const parts = character.url.split("/");
        const id = parts[parts.length - 2];
        return (
          <li key={id} className={styles.item}>
            <Link to={`/${id}`} className={styles.link}>
              {character.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Results;
