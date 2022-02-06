import React, { useState } from 'react';
import { validate, decodeError, blinkView } from '../src/utils';
import { userApi } from '../src/api/user/apiProduction';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { TopAlert } from '../components/ui/TopAlert';
import { THEME, SCREEN_STYLE } from '../components/theme.js';

export const AuthenticationScreen = ({ route, navigation }) => {
  const { onSetToken } = route.params;
  const [isAlertVisible, setAlertVisible] = useState(false),
    [alertMessage, setAlertMessage] = useState(''),
    [login, setLogin] = useState(''),
    [password, setPassword] = useState(''),
    [loginValidations, setLoginValidations] = useState(null),
    [passwordValidations, setPasswordValidations] = useState(null);

  const onSignIn = () => {
    if (!loginValidations || !passwordValidations) return;
    if (loginValidations.isValid && passwordValidations.isValid) {
      userApi
        .auth({ login, password })
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
      <Title>Добро пожаловать!</Title>
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
        secureTextEntry={true}
        iconName={THEME.ICON_LOCK}
        placeholder={'Пароль'}
        onChangeText={password => {
          setPassword(password);
          setPasswordValidations(validate(password, { isFilled: true }));
        }}
      />
      <Button style={{ marginVertical: 25 }} fontColor={THEME.BACKGROUND_COLOR} onPress={onSignIn}>
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
