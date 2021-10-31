import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export const AppText = ({ children, fontColor = THEME.FONT_COLOR, fontSize = 14 }) => {
  return <Text style={{ ...styles.default, color: fontColor, fontSize }}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: THEME.REGULAR_FONT,
  },
});
