import React from 'react';
import { View, TextInput } from 'react-native';
import { AppTitle } from '../components/ui/AppTitle';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const SetPasswordScreen = ({ toAuthentication, toResetting }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <AppTitle>Установить новый пароль</AppTitle>
      <AppTextInput iconName={'unlock-alt'}>Новый пароль</AppTextInput>
      <AppTextInput iconName={'lock'}>Подтвердите пароль</AppTextInput>
      <AppButton fontColor={THEME.BACKGROUND_COLOR} onPress={toAuthentication}>
        Установить
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toResetting}>
        Я не получил сообщение
      </AppButton>
    </View>
  );
};
