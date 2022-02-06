import React, { useState, useContext } from 'react';
import { AlertContext } from '../src/context/AlertContext';
import { TokenContext } from '../src/context/TokenContext';
import { validate, decodeError, showAlertMessage } from '../src/utils';
import { userApi } from '../src/api/user/apiProduction';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme.js';
import { TOKEN_PROP } from '../src/config';

export const AuthenticationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginValidations, setLoginValidations] = useState(null);
  const [passwordValidations, setPasswordValidations] = useState(null);
  const { setAlertVisible, setAlertMessage, setAlertIcon } = useContext(AlertContext);
  const { setUserToken } = useContext(TokenContext);

  const onSignIn = () => {
    if (!loginValidations || !passwordValidations) return;
    if (loginValidations.isValid && passwordValidations.isValid) {
      userApi
        .auth({ login, password })
        .then(response => {
          const { data, status } = response;
          if (status === 200) {
            setUserToken(data[TOKEN_PROP]);
          }
        })
        .catch(error => {
          const errorMessage = decodeError(error.response.data.error);
          showAlertMessage(
            setAlertVisible,
            setAlertMessage,
            errorMessage,
            setAlertIcon,
            THEME.ICON_CROSS,
          );
        });
    }
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
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
