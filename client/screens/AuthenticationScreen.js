import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme.js';

export const AuthenticationScreen = ({ toRegistration, toResetting }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Добро пожаловать!</Title>
      <TextInput iconName={THEME.ICON_USER}>Логин</TextInput>
      <TextInput iconName={THEME.ICON_LOCK}>Пароль</TextInput>
      <Button
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => {
          console.log('Log In');
        }}
      >
        Войти
      </Button>
      <Button backgroundColor={'transparent'} onPress={toResetting}>
        Я не помню пароль
      </Button>
      <Button backgroundColor={'transparent'} onPress={toRegistration}>
        Еще не с нами? Зарегистрируйтесь!
      </Button>
    </View>
  );
};
