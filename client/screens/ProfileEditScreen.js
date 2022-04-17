import React, { useEffect, useContext, useState } from 'react';
import { userApi } from '../src/api/user/apiProduction';
import { AlertContext } from '../src/context/AlertContext';
import { UserContext } from '../src/context/UserContext';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/HeaderIcon';
import { Column } from '../components/Column';
import { UserIcon } from '../components/ui/UserIcon';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { Loader } from '../components/ui/Loader';
import { dateRu, validate } from '../src/utils';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileEditScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { authorizedUser, setAuthorizedUser } = useContext(UserContext);
  const date = dateRu(authorizedUser.birthDate);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(authorizedUser.firstName);
  const [lastName, setLastName] = useState(authorizedUser.lastName);
  const [birthDateString, setBirthDateString] = useState(date.format('DD.MM.YYYY'));
  const [description, setDescription] = useState(authorizedUser.description);
  const [firstNameValidations, setFirstNameValidations] = useState({ isValid: true });
  const [lastNameValidations, setLastNameValidations] = useState({ isValid: true });
  const [birthDateValidations, setBirthDateValidations] = useState({ isValid: true });

  const onApplyChanges = () => {
    if (!firstNameValidations.isValid || !lastNameValidations.isValid) {
      showAlertMessage('Введите настоящие имя и фамилию', 'ERROR');
      return;
    }
    if (!birthDateValidations.isValid) {
      showAlertMessage('Дата должна быть в формате DD.MM.YYYY', 'ERROR');
      return;
    }
    setIsLoading(true);
    const birthDate = dateRu(birthDateString, 'DD.MM.YYYY');
    userApi
      .changeProfile({
        firstName,
        lastName,
        birthDate,
        description,
        photo: authorizedUser.photo,
      })
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          showAlertMessage('Данные успешно обновлены', 'INFO');
          setAuthorizedUser({ ...authorizedUser, birthDate, description, firstName, lastName });
        } else {
          showAlertMessage('Что-то пошло не так..', 'ERROR');
        }
        setIsLoading(false);
      })
      .catch(error => {
        const errorMessage = decodeError(error.response.data.error);
        showAlertMessage(errorMessage, 'ERROR');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item title='Confirm' iconName={THEME.ICON_CHECK} onPress={onApplyChanges} />
        </HeaderButtons>
      ),
      headerTitleStyle: {
        fontSize: 18,
      },
      title: 'Редактировать профиль',
    });
  }, [navigation, firstName, lastName, birthDateString, description]);

  return (
    <View style={SCREEN_STYLE.listWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <Column style={{ alignItems: 'center', padding: 15 }}>
            <UserIcon userPhoto={authorizedUser.photo} iconSize={105} />
            <Button
              type={'link'}
              onPress={() => {
                console.log('Load photo');
              }}
            >
              Изменить фото профиля
            </Button>
            <Text style={styles.label}>Имя</Text>
            <TextInput
              iconName={THEME.ICON_USER}
              autoCapitalize={'words'}
              onChangeText={firstName => {
                setFirstName(firstName);
                setFirstNameValidations(validate(firstName, { isFilled: true, isName: true }));
              }}
            >
              {firstName}
            </TextInput>
            <Text style={styles.label}>Фамилия</Text>
            <TextInput
              iconName={THEME.ICON_USER}
              autoCapitalize={'words'}
              onChangeText={lastName => {
                setLastName(lastName);
                setLastNameValidations(validate(lastName, { isFilled: true, isName: true }));
              }}
            >
              {lastName}
            </TextInput>
            <Text style={styles.label}>День рождения</Text>
            <TextInput
              iconName={THEME.ICON_CAKE}
              onChangeText={birthDateString => {
                setBirthDateString(birthDateString);
                setBirthDateValidations(validate(birthDateString, { isDateString: true }));
              }}
            >
              {birthDateString}
            </TextInput>
            <Text style={styles.label}>О себе</Text>
            <TextInput maxLength={250} onChangeText={setDescription} iconName={THEME.ICON_PENCIL}>
              {description}
            </TextInput>
            <Button
              type={'link'}
              fontColor={THEME.DANGER_COLOR}
              onPress={() => setAuthorizedUser(null)}
            >
              Выйти из аккаунта
            </Button>
          </Column>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
