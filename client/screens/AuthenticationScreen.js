import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme.js';

export const AuthenticationScreen = ({ navigation }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Добро пожаловать!</Title>
      <TextInput iconName={THEME.ICON_USER} placeholder={'Логин'} />
      <TextInput iconName={THEME.ICON_LOCK} placeholder={'Пароль'} />
      <Button
        style={{ marginVertical: 25 }}
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => {
          console.log('Log In');
        }}
      >
        Войти
      </Button>
      <Button
        backgroundColor={'transparent'}
        onPress={() => navigation.navigate('RestoringPassword')}
      >
        Я не помню пароль
      </Button>
      <Button backgroundColor={'transparent'} onPress={() => navigation.navigate('Registration')}>
        Еще не с нами? Зарегистрируйтесь!
      </Button>
    </View>
  );
};
