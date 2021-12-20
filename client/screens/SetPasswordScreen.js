import React from 'react';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const SetPasswordScreen = ({ navigation }) => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Установить новый пароль</Title>
      <TextInput iconName={THEME.ICON_UNLOCK}>Новый пароль</TextInput>
      <TextInput iconName={THEME.ICON_LOCK}>Подтвердите пароль</TextInput>
      <Button
        style={{ marginVertical: 25 }}
        fontColor={THEME.BACKGROUND_COLOR}
        onPress={() => navigation.navigate('Authentication')}
      >
        Установить
      </Button>
      <Button
        backgroundColor={'transparent'}
        onPress={() => navigation.navigate('RestoringPassword')}
      >
        Я не получил сообщение
      </Button>
    </View>
  );
};
