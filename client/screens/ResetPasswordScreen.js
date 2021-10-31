import React from 'react';
import { View, TextInput } from 'react-native';
import { AppTitle } from '../components/ui/AppTitle';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const ResetPasswordScreen = ({ toAuthentication, toRegistration, toPasswordSetting }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <AppTitle>Восстановление пароля</AppTitle>
      <AppTextInput iconName={'envelope-o'}>E-mail</AppTextInput>
      <AppButton fontColor={THEME.BACKGROUND_COLOR} onPress={toPasswordSetting}>
        Восстановить
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toAuthentication}>
        Я помню свой пароль
      </AppButton>
      <AppButton backgroundColor={'transparent'} onPress={toRegistration}>
        Создать новый аккаунт
      </AppButton>
    </View>
  );
};
