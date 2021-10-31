import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export const AppTitle = ({
  children,
  fontColor = THEME.FONT_COLOR,
  fontSize = THEME.TITLE_FONT_SIZE,
}) => {
  return <Text style={{ ...styles.default, color: fontColor, fontSize }}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    color: THEME.FONT_COLOR,
    fontSize: THEME.TITLE_FONT_SIZE,
    fontFamily: THEME.BOLD_FONT,
    marginBottom: 30,
  },
});
