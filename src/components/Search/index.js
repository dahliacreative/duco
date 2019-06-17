import React, { useContext } from "react";
import Context from "../../data/characters";
import Input from "../Input";
import Results from "../Results";

const Search = ({ updateResults }) => {
  const results = useContext(Context);
  console.log(results);
  return (
    <div>
      <Input updateResults={updateResults} />
      <Results data={results} />
    </div>
  );
};

export default Search;
