import React, { useState } from 'react';
import { validate } from '../src/utils';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const SetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState(''),
    [confirming, setConfirming] = useState(''),
    [passwordValidations, setPasswordValidations] = useState(null),
    [confirmingValidations, setConfirmingValidations] = useState(null);

  const onSet = () => {
    if (!confirmingValidations || !passwordValidations) return;
    if (confirmingValidations.isValid && passwordValidations.isValid) {
      navigation.navigate('Authentication');
    }
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Установить новый пароль</Title>
      <ValidationHint validations={passwordValidations} />
      <TextInput
        iconName={THEME.ICON_UNLOCK}
        placeholder={'Новый пароль'}
        secureTextEntry={true}
        onChangeText={password => {
          setPassword(password);
          setPasswordValidations(validate(password, { isFilled: true }));
          setConfirmingValidations(validate(confirming, { isFilled: true, isSame: password }));
        }}
      />
      <ValidationHint validations={confirmingValidations} />
      <TextInput
        iconName={THEME.ICON_LOCK}
        placeholder={'Подтвердите пароль'}
        secureTextEntry={true}
        onChangeText={confirming => {
          setConfirming(confirming);
          setConfirmingValidations(validate(confirming, { isFilled: true, isSame: password }));
        }}
      />
      <Button style={{ marginVertical: 25 }} fontColor={THEME.BACKGROUND_COLOR} onPress={onSet}>
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
