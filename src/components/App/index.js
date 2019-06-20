import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "../../data/characters";
import Search from "../Search";
import Character from "../Character";
import "./styles.sass";

const App = () => {
  const [results, updateResults] = useState([]);
  return (
    <Router>
      <Provider data={results} updateResults={updateResults}>
        <h1 className="logo">
          <span>SW</span>API
        </h1>
        <Route path="/" component={Search} />
        <Route path="/:id" component={Character} />
      </Provider>
    </Router>
  );
};

export default App;
