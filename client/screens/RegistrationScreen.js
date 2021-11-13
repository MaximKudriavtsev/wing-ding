import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const RegistrationScreen = ({ navigation }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Регистрация</Title>
      <TextInput iconName={THEME.ICON_USER}>Логин</TextInput>
      <TextInput iconName={THEME.ICON_LOCK}>Пароль</TextInput>
      <TextInput iconName={THEME.ICON_ENVELOPE}>E-mail</TextInput>
      <Button
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => {
          console.log('Sign In');
        }}
      >
        Зарегистрироваться
      </Button>
      <Button backgroundColor={'transparent'} onPress={() => navigation.navigate('Authentication')}>
        Уже есть аккаунт? Войти
      </Button>
    </View>
  );
};
