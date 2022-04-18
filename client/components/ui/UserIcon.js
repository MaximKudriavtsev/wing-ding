import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { THEME } from '../theme';

export const UserIcon = ({ userPhoto, style, iconSize = 34 }) => {
  return (
    <ImageBackground
      style={{ ...styles.icon, height: iconSize, width: iconSize, ...style }}
      imageStyle={styles.iconImage}
      source={userPhoto != null ? { uri: userPhoto } : THEME.USER_PHOTO}
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
