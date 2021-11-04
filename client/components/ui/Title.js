import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { THEME } from '../theme';

export const Title = ({
  children,
  fontColor = THEME.FONT_COLOR,
  fontSize = THEME.TITLE_FONT_SIZE,
}) => {
  return <Text style={{ ...styles.default, color: fontColor, fontSize }}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    marginBottom: 30,
  },
});
