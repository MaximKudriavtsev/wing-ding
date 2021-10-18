import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import { ContextProvider } from './src/ContextProvider';
import { api } from './src/config';

import { AuthenticationScreen } from './screens/AuthenticationScreen';
import { RegistrationScreen  } from './screens/RegistrationScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';
import { SetPasswordScreen } from './screens/SetPasswodScreen';

export default function App() {

  const registrationScreen = (
    <RegistrationScreen
      toAuthentication={() => setCurrentScreen(authenticationScreen)}
    />
  );
  const authenticationScreen = (
    <AuthenticationScreen
      toRegistration={() => setCurrentScreen(registrationScreen)}
      toResetting={() => setCurrentScreen(resetPasswordScreen)}
    />
  )
  const resetPasswordScreen = (
    <ResetPasswordScreen 
      toAuthentication={() => setCurrentScreen(authenticationScreen)}
      toRegistration={() => setCurrentScreen(registrationScreen)}
      toPasswordSetting={() => setCurrentScreen(setNewPasswordScreen)}
    />
  )

  const setNewPasswordScreen = (
    <SetPasswordScreen
      toAuthentication={() => setCurrentScreen(authenticationScreen)}
      toResetting={() => setCurrentScreen(resetPasswordScreen)}
    />
  )

  const someCaсhe = '12'; 
  const [currentScreen, setCurrentScreen] = useState(someCaсhe ? authenticationScreen : registrationScreen)

  return (
    <>
      <ContextProvider inject={{ api }}>
        <View style={styles.container}>
          {currentScreen}
        </View>
      </ContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b162a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
