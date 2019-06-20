import React from "react";
import PropTypes from "prop-types";
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

Search.propTypes = {
  updateResults: PropTypes.func.isRequired
};

export default Search;
