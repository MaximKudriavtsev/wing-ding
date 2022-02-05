import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from './BottomNavigation';

export const AppNavigation = ({ userToken, onSetToken }) => {
  return (
    <NavigationContainer>
      <BottomNavigation userToken={userToken} onSetToken={onSetToken} />
    </NavigationContainer>
  );
};
