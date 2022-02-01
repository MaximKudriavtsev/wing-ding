import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const ResetPasswordScreen = ({ navigation }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Восстановление пароля</Title>
      <TextInput iconName={THEME.ICON_ENVELOPE} placeholder={'E-mail'} />
      <Button
        style={{ marginVertical: 25 }}
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => navigation.navigate('SettingPassword')}
      >
        Восстановить
      </Button>
      <Button backgroundColor={'transparent'} onPress={() => navigation.navigate('Authentication')}>
        Я помню свой пароль
      </Button>
      <Button backgroundColor={'transparent'} onPress={() => navigation.navigate('Registration')}>
        Создать новый аккаунт
      </Button>
    </View>
  );
};
