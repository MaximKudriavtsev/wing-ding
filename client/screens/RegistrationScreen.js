import React from 'react';
import { View, TextInput } from 'react-native';
import { AppTitle } from '../components/ui/AppTitle';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const RegistrationScreen = ({ toAuthentication }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <AppTitle>Регистрация</AppTitle>
      <AppTextInput iconName={'user-o'}>Логин</AppTextInput>
      <AppTextInput iconName={'lock'}>Пароль</AppTextInput>
      <AppTextInput iconName={'envelope-o'}>E-mail</AppTextInput>
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
