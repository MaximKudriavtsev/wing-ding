import React from 'react';
import { Text as DefaultText, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export const Text = ({ children, style, bold = false }) => {
  const fontWeight = bold ? styles.bold : styles.regular;
  return (
    <DefaultText style={{ ...styles.default, ...fontWeight, ...style }}>{children}</DefaultText>
  );
};

const styles = StyleSheet.create({
  default: {
    color: THEME.FONT_COLOR,
    fontSize: 14,
  },

  regular: {
    fontFamily: THEME.REGULAR_FONT,
  },

  bold: {
    fontFamily: THEME.BOLD_FONT,
  },
});
