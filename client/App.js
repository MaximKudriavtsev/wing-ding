import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import { ContextProvider } from './src/ContextProvider';
import { api } from './src/config';

import { AuthenticationScreen } from './screens/AuthenticationScreen';
import { RegistrationScreen  } from './screens/RegistrationScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';
import { SetPasswordScreen } from './screens/SetPasswordScreen';
import { THEME } from '../../../Products/wing-ding/client/components/theme';

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

  const someCaсhe = '';
  const [currentScreen, setCurrentScreen] = useState(someCaсhe ? authenticationScreen : registrationScreen)

  return (
    <ContextProvider inject={{ api }}>
      <View style={styles.container}>
        {currentScreen}
      </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
