import React, { useEffect, useState, useContext } from 'react';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { api } from '../src/api';
import { View } from 'react-native';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { Loader } from '../components/ui/Loader';
import { THEME } from '../components/theme';

export const MemberListScreen = ({ route, navigation }) => {
  const { eventId, title } = route.params;
  const { showAlertMessage } = useContext(AlertContext);

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
      api.event
        .getMembers(eventId)
        .then(({ data }) => {
          setUsers(data.members);
          setIsLoading(false);
        })
        .catch(error => {
          showAlertMessage(AlertMessages.unknownError, AlertType.Error);
          console.log(error.response);
          setIsLoading(false);
        });
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
