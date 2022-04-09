import React, { useState } from 'react';
import { validate } from '../src/utils';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailValidations, setEmailValidations] = useState(null);

  const onReset = () => {
    if (!emailValidations) return;
    if (emailValidations.isValid) {
      navigation.navigate('SettingPassword');
    }
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Восстановление пароля</Title>
      <ValidationHint validations={emailValidations} />
      <TextInput
        iconName={THEME.ICON_ENVELOPE}
        placeholder={'E-mail'}
        onChangeText={email => {
          setEmail(email);
          setEmailValidations(validate(email, { isEmail: true, minLength: 5 }));
        }}
      />
      <Button style={{ marginVertical: 25 }} onPress={onReset}>
        Восстановить
      </Button>
      <Button type={'link'} onPress={() => navigation.navigate('Authentication')}>
        Я помню свой пароль
      </Button>
      <Button type={'link'} transparent={true} onPress={() => navigation.navigate('Registration')}>
        Создать новый аккаунт
      </Button>
    </View>
  );
};
