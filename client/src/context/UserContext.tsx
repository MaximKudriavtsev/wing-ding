import React, { createContext } from 'react';

type UserContextType = { authorizedUser: string | null, setAuthorizedUser: (str: string) => void };

export const UserContext = createContext<UserContextType>({ authorizedUser: null, setAuthorizedUser: () => null });

type Props = {
  children?: React.ReactNode;
  value: UserContextType;
};

export const UserProvider: React.FC<Props> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
