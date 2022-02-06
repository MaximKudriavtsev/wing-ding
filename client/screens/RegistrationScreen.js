import React, { useState } from 'react';
import { userApi } from '../src/api/user/apiProduction';
import { validate, decodeError, blinkView } from '../src/utils';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { TopAlert } from '../components/ui/TopAlert';
import { THEME, SCREEN_STYLE } from '../components/theme';

export const RegistrationScreen = ({ route, navigation }) => {
  const { onSetToken } = route.params;
  const [isAlertVisible, setAlertVisible] = useState(false),
    [alertMessage, setAlertMessage] = useState(''),
    [login, setLogin] = useState(''),
    [password, setPassword] = useState(''),
    [email, setEmail] = useState(''),
    [loginValidations, setLoginValidations] = useState(null),
    [passwordValidations, setPasswordValidations] = useState(null),
    [emailValidations, setEmailValidations] = useState(null);

  const onSignUp = () => {
    if (!loginValidations || !passwordValidations || !emailValidations) return;
    if (loginValidations.isValid && passwordValidations.isValid && emailValidations.isValid) {
      userApi
        .registration({ login, email, password })
        .then(response => response.json())
        .then(json => {
          if (json.status == 'ok') {
            onSetToken(json['access_token']);
          }
          if (json.status == 'error') {
            setAlertMessage(decodeError(json.error));
            blinkView(setAlertVisible);
          }
        })
        .catch(error => {
          setAlertMessage('Ошибка сервера. Пожалуйста, попробуйте позже');
          blinkView(setAlertVisible);
        });
    }
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      <TopAlert message={alertMessage} iconName={THEME.ICON_CROSS} isVisible={isAlertVisible} />
      <Title>Регистрация</Title>
      <ValidationHint validations={loginValidations} />
      <TextInput
        iconName={THEME.ICON_USER}
        placeholder={'Логин'}
        onChangeText={login => {
          setLogin(login);
          setLoginValidations(validate(login, { isFilled: true, minLength: 3 }));
        }}
      />
      <ValidationHint validations={passwordValidations} />
      <TextInput
        iconName={THEME.ICON_LOCK}
        placeholder={'Пароль'}
        secureTextEntry={true}
        onChangeText={password => {
          setPassword(password);
          setPasswordValidations(validate(password, { isFilled: true }));
        }}
      />
      <ValidationHint validations={emailValidations} />
      <TextInput
        iconName={THEME.ICON_ENVELOPE}
        placeholder={'E-mail'}
        onChangeText={email => {
          setEmail(email);
          setEmailValidations(validate(email, { isEmail: true, minLength: 5 }));
        }}
      />
      <Button style={{ marginVertical: 25 }} fontColor={THEME.BACKGROUND_COLOR} onPress={onSignUp}>
        Зарегистрироваться
      </Button>
      <Button backgroundColor={'transparent'} onPress={() => navigation.navigate('Authentication')}>
        Уже есть аккаунт? Войти
      </Button>
    </View>
  );
};
