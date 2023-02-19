import React, { useState, useContext } from 'react';
import { AlertContext, AlertType } from '../src/context/AlertContext';
import { TokenContext } from '../src/context/TokenContext';
import { validate, decodeError } from '../src/utils';
import { api } from '../src/api';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme.js';
import { TOKEN_PROP } from '../src/config';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView';

export const AuthenticationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidations, setEmailValidations] = useState(null);
  const [passwordValidations, setPasswordValidations] = useState(null);
  const { showAlertMessage } = useContext(AlertContext);
  const { setUserToken } = useContext(TokenContext);

  const onSignIn = () => {
    if (!emailValidations || !passwordValidations) return;
    if (emailValidations.isValid && passwordValidations.isValid) {
      api.user
        .auth({ email, password })
        .then(({ data, status }) => {
          if (status === 200) {
            setUserToken(data[TOKEN_PROP]);
          }
        })
        .catch(error => {
          const errorMessage = decodeError(error.response.data.error);
          showAlertMessage(errorMessage, AlertType.Error);
          console.log(error.response);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={SCREEN_STYLE.wrapper}>
      <Title>Добро пожаловать!</Title>
      <ValidationHint validations={emailValidations} />
      <TextInput
        iconName={THEME.ICON_ENVELOPE}
        placeholder={'E-mail'}
        onChangeText={email => {
          setEmail(email);
          setEmailValidations(validate(email, { isEmail: true, minLength: 3 }));
        }}
      />
      <ValidationHint validations={passwordValidations} />
      <TextInput
        secureTextEntry={true}
        iconName={THEME.ICON_LOCK}
        placeholder={'Пароль'}
        onChangeText={password => {
          setPassword(password);
          setPasswordValidations(validate(password, { isRequired: true }));
        }}
      />
      <Button style={{ marginVertical: 25 }} onPress={onSignIn}>
        Войти
      </Button>
      <Button type={'LINK'} onPress={() => navigation.navigate('RestoringPassword')}>
        Я не помню пароль
      </Button>
      <Button type={'LINK'} transparent={true} onPress={() => navigation.navigate('Registration')}>
        Еще не с нами? Зарегистрируйтесь!
      </Button>
    </KeyboardAvoidingView>
  );
};
