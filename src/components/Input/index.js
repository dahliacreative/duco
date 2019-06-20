import React, { useState, useEffect, useContext } from "react";
import useThrottle from "./hooks";
import styles from "./styles.module.sass";
import api from "../../api";
import Context from "../../data/characters";

const Input = () => {
  const { updateResults } = useContext(Context);
  const [term, updateTerm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const throttledTerm = useThrottle(term, 250);

  useEffect(() => {
    if (throttledTerm) {
      setLoading(true);
      api.get(`people/?search=${throttledTerm}`).then(res => {
        updateResults(res.data.results);
        setLoading(false);
      });
    } else {
      updateResults([]);
    }
  }, [throttledTerm, updateResults]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <label htmlFor="search" className={styles.label}>
          Search for a character
        </label>
        <input
          id="search"
          value={term}
          onChange={e => updateTerm(e.target.value)}
          className={styles.input}
          autoComplete="off"
        />
        {isLoading && <span className={styles.spinner} />}
      </div>
    </div>
  );
};

export default Input;
