import React from 'react';
import { View } from 'react-native';
import { AppTitle } from '../components/ui/AppTitle';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { THEME, SCREEN_STYLE } from '../components/theme.js';

export const AuthenticationScreen = ({ toRegistration, toResetting }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <AppTitle>Добро пожаловать!</AppTitle>
      <AppTextInput iconName={THEME.ICON_USER}>Логин</AppTextInput>
      <AppTextInput iconName={THEME.ICON_LOCK}>Пароль</AppTextInput>
      <AppButton
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => {
          console.log('Log In');
        }}
      >
        Войти
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toResetting}>
        Я не помню пароль
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toRegistration}>
        Еще не с нами? Зарегистрируйтесь!
      </AppButton>
    </View>
  );
};
