import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from './Image';
import { THEME } from '../theme';

type Props = {
  userPhoto: string | null;
  style?: object;
  iconSize?: number;
};

export const UserIcon: React.FC<Props> = ({ userPhoto, style, iconSize = 34 }) => {
  return (
    <Image
      style={{ ...style, height: iconSize, width: iconSize, ...style }}
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
  },
});
