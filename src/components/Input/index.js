import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useThrottle from "./hooks";
import styles from "./styles.module.sass";
import api from "../../api";

const Input = ({ updateResults }) => {
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

Input.propTypes = {
  updateResults: PropTypes.func.isRequired
};

export default Input;
