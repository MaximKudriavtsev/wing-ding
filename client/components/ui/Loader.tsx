import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

export const Loader: React.FC = () => (
  <View style={styles.wrapper}>
    <ImageBackground style={styles.spinner} source={require('../../assets/Spinner-1s-200px.gif')} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spinner: {
    height: 64,
    width: 64,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
