import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { SCREEN_STYLE } from '../components/theme.js';

export const ProfileScreen = () => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Профиль</Title>
    </View>
  );
};