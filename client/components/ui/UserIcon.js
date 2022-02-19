import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { THEME } from '../theme';
import { findUserById } from '../../src/utils';

export const UserIcon = ({ userId, style, iconSize = 34 }) => {
  return (
    <ImageBackground
      style={{ ...styles.icon, height: iconSize, width: iconSize, ...style }}
      imageStyle={styles.iconImage}
      source={{ uri: findUserById(userId).photo }}
    />
  );
};

const styles = StyleSheet.create({
  iconImage: {
    borderRadius: 50,
    borderColor: THEME.DARKER_COLOR,
    borderWidth: 2,
  },
});
