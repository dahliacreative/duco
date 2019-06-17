import React, { createContext } from "react";

const Context = createContext();
const ContextProvider = Context.Provider;

const Provider = ({ data, children }) => (
  <ContextProvider value={data}>{children}</ContextProvider>
);

export default Context;
export { Provider };
