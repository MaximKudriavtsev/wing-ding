import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/HeaderIcon';
import { Column } from '../components/Column';
import { UserIcon } from '../components/ui/UserIcon';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { TopAlert } from '../components/ui/TopAlert';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileEditScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isAlertVisible, setAlertVisible] = useState(false);

  const applyChanges = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 1500);
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
    <View style={SCREEN_STYLE.wrapper}>
      <TopAlert
        message={'Данные успешно сохранены'}
        iconName={THEME.ICON_CHECK}
        isVisible={isAlertVisible}
      />
      <Column style={{ alignItems: 'center' }}>
        <UserIcon userId={user.id} iconSize={105} />
        <Button
          backgroundColor={'transparent'}
          onPress={() => {
            console.log('Load photo');
          }}
        >
          Изменить фото профиля
        </Button>
        <Text style={styles.label}>Имя</Text>
        <TextInput>{user.name}</TextInput>
        <Text style={styles.label}>День рождения</Text>
        <TextInput>{user.birthDate}</TextInput>
        <Text style={styles.label}>О себе</Text>
        <TextInput>Веселый парень, люблю бухать</TextInput>
      </Column>
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
