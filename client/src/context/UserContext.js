import React, { createContext } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
