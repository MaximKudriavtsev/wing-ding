import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthenticationForm } from './src/AuthenticationForm';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthenticationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1523',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
