import React, { useState, useContext } from 'react';
import { AlertContext } from '../src/context/AlertContext';
import { TokenContext } from '../src/context/TokenContext';
import { api } from '../src/config';
import { validate, decodeError } from '../src/utils';
import { View } from 'react-native';
import { Title } from '../components/ui/Title';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { ValidationHint } from '../components/ui/ValidationHint';
import { THEME, SCREEN_STYLE } from '../components/theme';
import { TOKEN_PROP } from '../src/config';

export const RegistrationScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordValidations, setPasswordValidations] = useState(null);
  const [emailValidations, setEmailValidations] = useState(null);
  const [firstNameValidations, setFirstNameValidations] = useState(null);
  const [lastNameValidations, setLastNameValidations] = useState(null);
  const { showAlertMessage } = useContext(AlertContext);
  const { setUserToken } = useContext(TokenContext);

  const onSignUp = () => {
    if (!emailValidations || !passwordValidations || !firstNameValidations || !lastNameValidations)
      return;
    if (
      emailValidations.isValid &&
      passwordValidations.isValid &&
      firstNameValidations.isValid &&
      lastNameValidations.isValid
    ) {
      api.user
        .registration({ email, password, firstName, lastName })
        .then(response => {
          const { data, status } = response;
          if (status === 200) {
            setUserToken(data[TOKEN_PROP]);
          }
        })
        .catch(error => {
          const errorMessage = decodeError(error.response.data.error);
          showAlertMessage(errorMessage, 'ERROR');
        });
    }
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      <Title>Регистрация</Title>
      <ValidationHint validations={emailValidations} />
      <TextInput
        iconName={THEME.ICON_ENVELOPE}
        placeholder={'E-mail'}
        onChangeText={email => {
          setEmail(email);
          setEmailValidations(validate(email, { isEmail: true, minLength: 5 }));
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
      <ValidationHint validations={firstNameValidations} />
      <TextInput
        iconName={THEME.ICON_USER}
        placeholder={'Имя'}
        autoCapitalize={'words'}
        onChangeText={firstName => {
          setFirstName(firstName);
          setFirstNameValidations(validate(firstName, { isFilled: true, isName: true }));
        }}
      />
      <ValidationHint validations={lastNameValidations} />
      <TextInput
        iconName={THEME.ICON_USER}
        placeholder={'Фамилия'}
        autoCapitalize={'words'}
        onChangeText={lastName => {
          setLastName(lastName);
          setLastNameValidations(validate(lastName, { isFilled: true, isName: true }));
        }}
      />
      <Button style={{ marginVertical: 25 }} onPress={onSignUp}>
        Зарегистрироваться
      </Button>
      <Button type={'LINK'} onPress={() => navigation.navigate('Authentication')}>
        Уже есть аккаунт? Войти
      </Button>
    </View>
  );
};
