import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Row = ({ children, style }) => {
  return <View style={{ ...styles.row, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
});
