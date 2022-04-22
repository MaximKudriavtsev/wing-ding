import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from './Image';
import { THEME } from '../theme';

export const UserIcon = ({ userPhoto, style, iconSize = 34 }) => {
  return (
    <Image
      style={{ ...styles.icon, height: iconSize, width: iconSize, ...style }}
      imageStyle={styles.iconImage}
      source={userPhoto}
      defaultImage={THEME.USER_PHOTO}
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
