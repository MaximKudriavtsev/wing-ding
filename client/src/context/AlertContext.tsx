import React, { createContext } from 'react';

export enum AlertType {
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO',
}

export const AlertMessages = {
  unknown: 'Что-то пошло не так... Попробуйте позже',
};

export type ShowAlertMessage = (text: string, type: AlertType) => void;

type AlertContextType = { showAlertMessage: ShowAlertMessage };

export const AlertContext = createContext<AlertContextType>({ showAlertMessage: () => null });

type Props = {
  children?: React.ReactNode;
  value: AlertContextType;
};

export const AlertProvider: React.FC<Props> = ({ children, value }) => (
  <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
);
