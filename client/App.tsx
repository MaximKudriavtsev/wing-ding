import React, { useEffect, useState } from 'react';

import AppLoading from 'expo-app-loading';
import useFont from './components/hooks/useFont';

import { AppNavigation } from './src/navigation/AppNavigation';
import { LoginNavigation } from './src/navigation/LoginNavigation';
import { TopAlert } from './components/ui/TopAlert';
import { createAuthorizationInterceptor, ejectInterceptor } from './src/utils';
import { userApi } from './src/api/user/apiProduction';

import { AlertProvider, AlertType, ShowAlertMessage } from './src/context/AlertContext';
import { TokenProvider } from './src/context/TokenContext';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [authorizationInterceptor, setAuthorizationInterceptor] = useState(0);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>(AlertType.Info);

  const showAlertMessage: ShowAlertMessage = (text, type) => {
    setAlertMessage(text);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2500);
  };

  const LoadFonts = async () => {
    await useFont();
  };

  useEffect(() => {
    if (!userToken) {
      ejectInterceptor(authorizationInterceptor);
    } else {
      setAuthorizationInterceptor(createAuthorizationInterceptor(userToken));
      userApi
        .getAuthorizedUser()
        .then(response => setAuthorizedUser(response.data.user))
        .catch(error => {
          console.error(error.response);
        });
    }
  }, [userToken]);

  useEffect(() => {
    if (authorizedUser) return;
    setUserToken('');
  }, [authorizedUser]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onError={err => console.error(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  if (!authorizedUser) {
    return (
      <TokenProvider value={{ userToken, setUserToken }}>
        <AlertProvider value={{ showAlertMessage }}>
          <TopAlert message={alertMessage} type={alertType} isVisible={isAlertVisible} />
          <LoginNavigation />
        </AlertProvider>
      </TokenProvider>
    );
  }

  return (
    <UserProvider value={{ authorizedUser, setAuthorizedUser }}>
      <AlertProvider value={{ showAlertMessage }}>
        <TopAlert message={alertMessage} type={alertType} isVisible={isAlertVisible} />
        <AppNavigation />
      </AlertProvider>
    </UserProvider>
  );
}
