import React, { createContext } from "react";

const Context = createContext();
const ContextProvider = Context.Provider;

const Provider = ({ data, updateResults, children }) => (
  <ContextProvider value={{ data, updateResults }}>{children}</ContextProvider>
);

export default Context;
export { Provider };
