import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomNavigation } from './BottomNavigation';
import { THEME } from '../../components/theme';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.BACKGROUND_COLOR,
  },
};

export const AppNavigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomNavigation />
    </NavigationContainer>
  );
};
