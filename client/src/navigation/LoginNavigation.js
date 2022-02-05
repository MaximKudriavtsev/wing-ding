import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreenNavigation } from './LoginScreenNavigation';

export const LoginNavigation = ({ onSetToken }) => {
  return (
    <NavigationContainer>
      <LoginScreenNavigation onSetToken={onSetToken} />
    </NavigationContainer>
  );
};
