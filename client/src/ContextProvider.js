import React from 'react';

const AppContext = React.createContext(null);

export const ContextProvider = ({ context, children }) => (
  <AppContext.Provider value={context}>{children}</AppContext.Provider>
);

export const usePageContext = () => React.useContext(AppContext);
