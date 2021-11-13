import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationScreen } from '../../screens/AuthenticationScreen';
import { RegistrationScreen } from '../../screens/RegistrationScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';
import { SetPasswordScreen } from '../../screens/SetPasswordScreen';

const LoginStack = createNativeStackNavigator();

export const LoginScreenNavigation = () => {
  return (
    <LoginStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <LoginStack.Screen name='Authentication' component={AuthenticationScreen} />
      <LoginStack.Screen name='Registration' component={RegistrationScreen} />
      <LoginStack.Screen name='RestoringPassword' component={ResetPasswordScreen} />
      <LoginStack.Screen name='SettingPassword' component={SetPasswordScreen} />
    </LoginStack.Navigator>
  );
};
