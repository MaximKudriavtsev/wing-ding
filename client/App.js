import React, { useState } from 'react';

import AppLoading from 'expo-app-loading';
import useFont from './components/hooks/useFont';

import { AppNavigation } from './src/navigation/AppNavigation';
import { LoginNavigation } from './src/navigation/LoginNavigation';
import { TopAlert } from './components/ui/TopAlert';
import { THEME } from './components/theme';

import { AlertProvider } from './src/context/AlertContext';
import { TokenProvider } from './src/context/TokenContext';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [userToken, setUserToken] = useState('');

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState('');

  const showAlertMessage = (text, type) => {
    let icon = '';
    switch (type) {
      case 'ERROR':
        icon = THEME.ICON_CROSS;
        break;
      case 'WARNING':
        icon = THEME.ICON_WARNING;
        break;
      case 'INFO':
        icon = THEME.ICON_CHECK;
        break;
    }
    setAlertMessage(text);
    setAlertIcon(icon);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2500);
  };

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
    return (
      <TokenProvider value={{ userToken, setUserToken }}>
        <AlertProvider value={{ showAlertMessage }}>
          <TopAlert message={alertMessage} iconName={alertIcon} isVisible={isAlertVisible} />
          <LoginNavigation />
        </AlertProvider>
      </TokenProvider>
    );
  }
  return (
    <TokenProvider value={{ userToken, setUserToken }}>
      <AlertProvider value={{ showAlertMessage }}>
        <TopAlert message={alertMessage} iconName={alertIcon} isVisible={isAlertVisible} />
        <AppNavigation />
      </AlertProvider>
    </TokenProvider>
  );
}
