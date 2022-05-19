import React, { createContext } from 'react';
import { User } from '../api/user/types';

type UserContextType = { authorizedUser: User | null, setAuthorizedUser: (str: User) => void };

export const UserContext = createContext<UserContextType>({ authorizedUser: null, setAuthorizedUser: () => null });

type Props = {
  children?: React.ReactNode;
  value: UserContextType;
};

export const UserProvider: React.FC<Props> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
