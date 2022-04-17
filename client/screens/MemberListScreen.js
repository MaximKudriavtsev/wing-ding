import React, { useEffect, useState } from 'react';
import { eventApi } from '../src/api/event/apiProduction';
import { View } from 'react-native';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { Loader } from '../components/ui/Loader';
import { camelizeKeys } from '../src/utils';
import { THEME } from '../components/theme';

export const MemberListScreen = ({ route, navigation }) => {
  const { eventId, title } = route.params;

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
        .catch(error => console.error(error.data));
    }
  }, [eventId]);

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
