import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useThrottle from "./hooks";
import styles from "./styles.module.sass";

const Input = ({ updateResults }) => {
  const [term, updateTerm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const throttledTerm = useThrottle(term, 250);

  useEffect(() => {
    if (throttledTerm) {
      setLoading(true);
      fetch(`https://swapi.co/api/people/?search=${throttledTerm}`)
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
        />
        {isLoading && <span className={styles.spinner} />}
      </div>
    </div>
  );
};

Input.propTypes = {
  updateResults: PropTypes.func.isRequired
};

export default Input;
