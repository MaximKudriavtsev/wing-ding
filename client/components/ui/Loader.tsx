import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

export const Loader: React.FC = () => (
  <View style={styles.wrapper}>
    <ImageBackground style={styles.spinner} source={require('../../assets/loader.gif')} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
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
