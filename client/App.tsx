import React, { useEffect, useState } from 'react';

import AppLoading from 'expo-app-loading';
import useFont from './components/hooks/useFont';

import { AppNavigation } from './src/navigation/AppNavigation';
import { LoginNavigation } from './src/navigation/LoginNavigation';
import { TopAlert } from './components/ui/TopAlert';
import { createAuthorizationInterceptor, ejectInterceptor } from './src/utils';
import { api } from './src/config';

import {
  AlertProvider,
  AlertType,
  ShowAlertMessage,
  AlertMessages,
} from './src/context/AlertContext';
import { TokenProvider } from './src/context/TokenContext';
import { UserProvider } from './src/context/UserContext';
import { User } from './src/api/user/types';

const LoadFonts = async () => {
  await useFont();
};
let authorizationInterceptor = 0;

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);

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

  useEffect(() => {
    if (!userToken) {
      ejectInterceptor(authorizationInterceptor);
    } else {
      authorizationInterceptor = createAuthorizationInterceptor(userToken);
      api.user
        .getAuthorizedUser()
        .then(response => {
          setAuthorizedUser(response.data.user);
        })
        .catch(error => {
          showAlertMessage(AlertMessages.unknownError, AlertType.Error);
          console.log(error.response);
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

  return (
    <TokenProvider value={{ userToken, setUserToken }}>
      <UserProvider value={{ authorizedUser, setAuthorizedUser }}>
        <AlertProvider value={{ showAlertMessage }}>
          <TopAlert message={alertMessage} type={alertType} isVisible={isAlertVisible} />
          {!!authorizedUser ? <AppNavigation /> : <LoginNavigation />}
        </AlertProvider>
      </UserProvider>
    </TokenProvider>
  );
}
