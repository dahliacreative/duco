import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "../../data/characters";
import Search from "../Search";

const App = () => {
  const [results, updateResults] = useState([]);
  return (
    <Router>
      <Provider data={results}>
        <Route
          path="/"
          render={props => <Search {...props} updateResults={updateResults} />}
        />
        <Route path="/:id" render={() => <h1>Modal!</h1>} />
      </Provider>
    </Router>
  );
};

export default App;
