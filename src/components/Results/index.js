import React from "react";
import { Link } from "react-router-dom";

const Results = ({ data }) => (
  <ul>
    {data.map(character => {
      const parts = character.url.split("/");
      const id = parts[parts.length - 2];
      return (
        <li key={id}>
          <Link to={`/${id}`}>{character.name}</Link>
        </li>
      );
    })}
  </ul>
);

export default Results;
