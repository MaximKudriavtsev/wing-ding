import React from 'react';
import { View } from 'react-native';
import { AppTitle } from '../components/ui/AppTitle';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const RegistrationScreen = ({ toAuthentication }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <AppTitle>Регистрация</AppTitle>
      <AppTextInput iconName={THEME.ICON_USER}>Логин</AppTextInput>
      <AppTextInput iconName={THEME.ICON_LOCK}>Пароль</AppTextInput>
      <AppTextInput iconName={THEME.ICON_ENVELOPE}>E-mail</AppTextInput>
      <AppButton
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => {
          console.log('Sign In');
        }}
      >
        Зарегистрироваться
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toAuthentication}>
        Уже есть аккаунт? Войти
      </AppButton>
    </View>
  );
};
