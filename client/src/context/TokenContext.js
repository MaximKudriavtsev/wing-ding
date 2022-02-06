import React, { createContext } from 'react';

export const TokenContext = createContext();
export const TokenProvider = ({ children, value }) => {
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};
