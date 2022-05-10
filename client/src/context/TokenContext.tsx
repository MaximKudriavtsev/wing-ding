import React, { createContext } from 'react';

type TokenContextType = { userToken: string | null, setUserToken: (str: string) => void };

export const TokenContext = createContext<TokenContextType>({ userToken: null, setUserToken: () => null });

type Props = {
  children?: React.ReactNode;
  value: TokenContextType;
};

export const TokenProvider: React.FC<Props> = ({ children, value }) => {
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};
