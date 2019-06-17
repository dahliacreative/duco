import React, { useState, useEffect } from "react";
import useThrottle from "./hooks";

const Input = ({ updateResults }) => {
  const [term, updateTerm] = useState("");
  const throttledTerm = useThrottle(term, 500);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (throttledTerm.length > 2) {
      setLoading(true);
      fetch(`https://swapi.co/api/people/?search=${throttledTerm}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          updateResults(data.results);
          setLoading(false);
        });
    }
  }, [throttledTerm, updateResults]);

  return (
    <div>
      <input value={term} onChange={e => updateTerm(e.target.value)} />
      {isLoading && <p>...Loading</p>}
    </div>
  );
};

export default Input;
