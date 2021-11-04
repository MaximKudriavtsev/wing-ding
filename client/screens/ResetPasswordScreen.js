import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const ResetPasswordScreen = ({ toAuthentication, toRegistration, toPasswordSetting }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Восстановление пароля</Title>
      <TextInput iconName={THEME.ICON_ENVELOPE}>E-mail</TextInput>
      <Button fontColor={THEME.BACKGROUND_COLOR} onPress={toPasswordSetting}>
        Восстановить
      </Button>
      <Button backgroundColor={'transparent'} onPress={toAuthentication}>
        Я помню свой пароль
      </Button>
      <Button backgroundColor={'transparent'} onPress={toRegistration}>
        Создать новый аккаунт
      </Button>
    </View>
  );
};
