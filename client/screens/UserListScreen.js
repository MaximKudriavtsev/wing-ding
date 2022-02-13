import React, { useEffect } from 'react';
import { View } from 'react-native';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { THEME } from './../components/theme';

export const UserListScreen = ({ route, navigation }) => {
  const { users } = route.params;

  const openProfileHandler = user => {
    navigation.navigate('ProfileScreen', { user: user });
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Wing-Ding',
    });
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: THEME.BACKGROUND_COLOR,
        flex: 1,
      }}
    >
      <List data={users} Component={UserTab} onOpen={openProfileHandler} />
    </View>
  );
};
