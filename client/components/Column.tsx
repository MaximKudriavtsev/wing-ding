import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: object;
};

export const Column: React.FC<Props> = ({ children, style }) => {
  return <View style={{ ...styles.column, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
