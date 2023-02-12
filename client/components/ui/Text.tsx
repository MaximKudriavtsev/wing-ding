import React from 'react';
import { Text as DefaultText, StyleSheet } from 'react-native';
import { THEME } from '../theme';

type Props = {
  children?: React.ReactNode;
  style?: object;
  bold?: boolean;
  numberOfLines?: number;
};

export const Text: React.FC<Props> = ({ children, style, bold, numberOfLines = 0 }) => {
  const fontWeight = bold ? styles.bold : styles.regular;
  return (
    <DefaultText
      numberOfLines={numberOfLines}
      style={{ ...styles.default, ...fontWeight, ...style }}
    >
      {children}
    </DefaultText>
  );
};

Text.defaultProps = {
  bold: false,
  numberOfLines: 0,
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
