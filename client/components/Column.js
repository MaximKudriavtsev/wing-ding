import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Column = ({ children, style }) => {
  return <View style={{ ...styles.column, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
