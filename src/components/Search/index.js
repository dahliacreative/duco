import React from "react";
import Input from "../Input";
import Results from "../Results";

const Search = ({ updateResults }) => {
  return (
    <div>
      <Input updateResults={updateResults} />
      <Results />
    </div>
  );
};

export default Search;
