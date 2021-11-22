import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { USERS } from '../data';
import { THEME } from '../theme';

const findUserById = id => USERS.find(user => user.id == id);

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
