import React, { useEffect, useContext, useState } from 'react';
import { api } from '../src/api';
import { PhotoPicker } from '../components/pickers/PhotoPicker';
import { PhotoPickerSheet } from '../components/sheets/PhotoPickerSheet';
import { AlertContext, AlertType } from '../src/context/AlertContext';
import { UserContext } from '../src/context/UserContext';
import { StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/ui/HeaderIcon';
import { Column } from '../components/ui/Column';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { Loader } from '../components/loaders/Loader';
import { dateRu, validate, getObjectChanges } from '../src/utils';
import { THEME } from '../components/theme';
import { KeyboardAvoidingView } from '../components/ui/KeyboardAvoidingView';
import { IconNames } from '../components/ui/Icon';
import { DateTimeInput } from '../components/ui/DateTimeInput';
import { DateTimePickerType } from '../components/pickers/DateTimePicker';
import { ModalLoader } from '../components/loaders/ModalLoader';

export const ProfileEditScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { authorizedUser, setAuthorizedUser } = useContext(UserContext);
  const [date, setDate] = useState(authorizedUser.birthDate || new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState(authorizedUser.photo);
  const [firstName, setFirstName] = useState(authorizedUser.firstName);
  const [lastName, setLastName] = useState(authorizedUser.lastName);
  const [description, setDescription] = useState(authorizedUser.description);
  const [firstNameValidations, setFirstNameValidations] = useState({ isValid: true });
  const [lastNameValidations, setLastNameValidations] = useState({ isValid: true });

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

    const newData = {
      firstName,
      lastName,
      birthDate: dateRu(date).toJSON(),
      description,
      photo: userPhoto,
    };

    const changes = getObjectChanges(newData, authorizedUser);

    setIsLoading(true);
    api.user
      .changeProfile(changes)
      .then(({ status }) => {
        if (status === 200) {
          showAlertMessage('Данные успешно обновлены', AlertType.Info);
          setAuthorizedUser({
            ...authorizedUser,
            date,
            description,
            firstName,
            lastName,
            userPhoto,
          });
        }
      })
      .catch(error => {
        const errorMessage = decodeError(error.response.data.error);
        showAlertMessage(errorMessage, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item title='Confirm' iconName={IconNames.ICON_CHECK} onPress={onApplyChanges} />
        </HeaderButtons>
      ),
    });
  }, [navigation, firstName, lastName, date, description, userPhoto]);

  return (
    <KeyboardAvoidingView>
      <ModalLoader isVisible={isLoading} />
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
            iconName={IconNames.ICON_USER}
            autoCapitalize={'words'}
            onChangeText={firstName => {
              setFirstName(firstName);
              setFirstNameValidations(validate(firstName, { isRequired: true, isName: true }));
            }}
            value={firstName}
          />
          <Text style={styles.label}>Фамилия</Text>
          <TextInput
            iconName={IconNames.ICON_USER}
            autoCapitalize={'words'}
            onChangeText={lastName => {
              setLastName(lastName);
              setLastNameValidations(validate(lastName, { isRequired: true, isName: true }));
            }}
            value={lastName}
          />
          <Text style={styles.label}>День рождения</Text>
          <DateTimeInput
            type={DateTimePickerType.Date}
            onChange={setDate}
            style={{ width: '100%' }}
            dateTime={new Date(date)}
            maximumDate={new Date()}
          />
          <Text style={styles.label}>О себе</Text>
          <TextInput
            maxLength={250}
            onChangeText={setDescription}
            iconName={IconNames.ICON_PENCIL}
            value={description}
          />
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
    </KeyboardAvoidingView>
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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
