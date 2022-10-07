import React, { useEffect, useContext, useState } from 'react';
import { api } from '../src/config';
import { PhotoPicker } from '../components/ui/PhotoPicker';
import { PhotoPickerSheet } from '../components/ui/PhotoPickerSheet';
import { AlertContext, AlertType } from '../src/context/AlertContext';
import { UserContext } from '../src/context/UserContext';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/HeaderIcon';
import { Column } from '../components/Column';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { Loader } from '../components/ui/Loader';
import { dateRu, validate, getObjectChanges } from '../src/utils';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileEditScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { authorizedUser, setAuthorizedUser } = useContext(UserContext);
  const date = dateRu(authorizedUser.birthDate);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState(authorizedUser.photo);
  const [firstName, setFirstName] = useState(authorizedUser.firstName);
  const [lastName, setLastName] = useState(authorizedUser.lastName);
  const [birthDateString, setBirthDateString] = useState(date.format('DD.MM.YYYY'));
  const [description, setDescription] = useState(authorizedUser.description);
  const [firstNameValidations, setFirstNameValidations] = useState({ isValid: true });
  const [lastNameValidations, setLastNameValidations] = useState({ isValid: true });
  const [birthDateValidations, setBirthDateValidations] = useState({ isValid: true });

  const openPickerSheet = () => {
    setPickerSheetVisible(true);
  };

  const closePickerSheet = () => {
    setPickerSheetVisible(false);
  };

  const onApplyChanges = () => {
    if (!firstNameValidations.isValid || !lastNameValidations.isValid) {
      showAlertMessage('Введите настоящие имя и фамилию', AlertType.Error);
      return;
    }
    if (!birthDateValidations.isValid) {
      showAlertMessage('Дата должна быть в формате DD.MM.YYYY', AlertType.Error);
      return;
    }

    const newData = {
      firstName,
      lastName,
      birthDate: dateRu(birthDateString, 'DD.MM.YYYY').toJSON(),
      description,
      photo: userPhoto,
    };

    const changes = getObjectChanges(newData, authorizedUser);

    setIsLoading(true);
    const birthDate = dateRu(birthDateString, 'DD.MM.YYYY');
    api.user
      .changeProfile(changes)
      .then(({ status }) => {
        if (status === 200) {
          showAlertMessage('Данные успешно обновлены', AlertType.Info);
          setAuthorizedUser({
            ...authorizedUser,
            birthDate,
            description,
            firstName,
            lastName,
            userPhoto,
          });
          setIsLoading(false);
        }
      })
      .catch(error => {
        const errorMessage = decodeError(error.response.data.error);
        showAlertMessage(errorMessage, AlertType.Error);
        console.log(error.response);
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
  }, [navigation, firstName, lastName, birthDateString, description, userPhoto]);

  return (
    <View style={SCREEN_STYLE.listWrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <Column style={{ alignItems: 'center', padding: 15 }}>
              <PhotoPicker
                style={styles.photoPicker}
                onPress={openPickerSheet}
                photoDiameter={110}
                source={userPhoto}
              />
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
          <PhotoPickerSheet
            isVisible={isPickerSheetVisible}
            onClose={closePickerSheet}
            onSetPhoto={setUserPhoto}
          />
        </>
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

  photoPicker: {
    display: 'flex',
    width: '50%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
