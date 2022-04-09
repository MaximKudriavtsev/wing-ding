import React, { useEffect, useContext } from 'react';
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
import { dateRu } from '../src/utils';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileEditScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { authorizedUser, setAuthorizedUser } = useContext(UserContext);

  const date = dateRu(authorizedUser.birthDate);

  const applyChanges = () => {
    showAlertMessage('Данные изменены', 'INFO');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item title='Confirm' iconName={THEME.ICON_CHECK} onPress={() => applyChanges()} />
        </HeaderButtons>
      ),
      headerTitleStyle: {
        fontSize: 18,
      },
      title: 'Редактировать профиль',
    });
  }, [navigation]);

  return (
    <View style={SCREEN_STYLE.listWrapper}>
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
          <TextInput>{authorizedUser.firstName}</TextInput>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput>{authorizedUser.lastName}</TextInput>
          <Text style={styles.label}>День рождения</Text>
          <TextInput>{date.format('DD.MM.YYYY')}</TextInput>
          <Text style={styles.label}>О себе</Text>
          <TextInput>{authorizedUser.description}</TextInput>
          <Button type={'link'} onPress={() => setAuthorizedUser(null)}>
            Выйти из аккаунта
          </Button>
        </Column>
      </ScrollView>
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
