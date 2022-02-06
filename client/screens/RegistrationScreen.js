import React, { useState, useContext } from 'react';
import { AlertContext } from '../src/context/AlertContext';
import { TokenContext } from '../src/context/TokenContext';
import { userApi } from '../src/api/user/apiProduction';
import { validate, decodeError, showAlertMessage } from '../src/utils';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme';
import { TOKEN_PROP } from '../src/config';

export const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginValidations, setLoginValidations] = useState(null);
  const [passwordValidations, setPasswordValidations] = useState(null);
  const [emailValidations, setEmailValidations] = useState(null);
  const { setAlertVisible, setAlertMessage, setAlertIcon } = useContext(AlertContext);
  const { setUserToken } = useContext(TokenContext);

  const onSignUp = () => {
    if (!loginValidations || !passwordValidations || !emailValidations) return;
    if (loginValidations.isValid && passwordValidations.isValid && emailValidations.isValid) {
      userApi
        .registration({ login, email, password })
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
