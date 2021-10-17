import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthenticationForm } from './src/AuthenticationForm';
import { ContextProvider } from './src/ContextProvider';
import { api } from './src/config';

export default function App() {
  return (
    <ContextProvider inject={{ api }}>
      <View style={styles.container}>
        <AuthenticationForm />
      </View>
    </ContextProvider>
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
