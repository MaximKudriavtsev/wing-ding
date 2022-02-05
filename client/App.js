import React, { useState } from 'react';

import AppLoading from 'expo-app-loading';
import useFont from './components/hooks/useFont';

import { AppNavigation } from './src/navigation/AppNavigation';
import { LoginNavigation } from './src/navigation/LoginNavigation';

export default function App() {
  const [isReady, setIsReady] = useState(false),
    [userToken, setUserToken] = useState('');

  const LoadFonts = async () => {
    await useFont();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  if (!userToken) {
    return <LoginNavigation onSetToken={setUserToken} />;
  }
  return <AppNavigation userToken={userToken} onSetToken={setUserToken} />;
}
