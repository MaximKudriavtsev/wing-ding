import React, { useEffect, useState } from 'react';
import { userApi } from '../src/api/user/apiProduction';
import { eventApi } from '../src/api/event/apiProduction';
import { View } from 'react-native';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { Loader } from '../components/ui/Loader';
import { camelizeKeys } from '../src/utils';
import { THEME } from './../components/theme';

export const UserListScreen = ({ route, navigation }) => {
  const { eventId, userId, title } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const openProfileHandler = userId => {
    navigation.push('ProfileScreen', { userId });
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation]);

  useEffect(() => {
    if (eventId) {
      setIsLoading(true);
      eventApi
        .getMembers(eventId)
        .then(response => {
          setUsers(response.data.members.map(item => camelizeKeys(item)));
          setIsLoading(false);
        })
        .catch(error => console.log(error.data));
    }
  }, [eventId]);

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      userApi
        .getFriendsList(userId)
        .then(response => {
          setUsers(response.data.friends.map(item => camelizeKeys(item)));
          setIsLoading(false);
        })
        .catch(error => console.log(error.data));
    }
  }, [userId]);

  return (
    <View
      style={{
        backgroundColor: THEME.BACKGROUND_COLOR,
        flex: 1,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <List data={users} Component={UserTab} onOpen={openProfileHandler} />
      )}
    </View>
  );
};
