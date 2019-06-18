import React, { useState, useEffect } from "react";
import styles from "./styles.module.sass";

const Input = ({ updateResults }) => {
  const [term, updateTerm] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (term.length) {
      setLoading(true);
      fetch(`https://swapi.co/api/people/?search=${term}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          updateResults(data.results);
          setLoading(false);
        });
    } else {
      updateResults([]);
    }
  }, [term, updateResults]);

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
        />
        {isLoading && <span className={styles.spinner} />}
      </div>
    </div>
  );
};

export default Input;
