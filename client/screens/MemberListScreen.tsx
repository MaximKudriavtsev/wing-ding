import React, { useEffect, useState, useContext } from 'react';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { api } from '../src/api';
import { View } from 'react-native';
import { List } from '../components/ui/List';
import { UserTab } from '../components/ui/UserTab';
import { THEME } from '../components/theme';
import { User } from '../src/api/user/types';
import { UserTabLoader } from '../components/loaders/UserTabLoader';

type Props = {
  route: any;
  navigation: any;
};

export const MemberListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { eventId, title } = route.params;
  const { showAlertMessage } = useContext(AlertContext);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const openProfileHandler = (userId: string) => {
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
        })
        .catch(error => {
          showAlertMessage(AlertMessages.unknownError, AlertType.Error);
          console.log(error.response);
        })
        .finally(() => setIsLoading(false));
    }
  }, [eventId]);

  return (
    <View
      style={{
        backgroundColor: THEME.BACKGROUND_COLOR,
        flex: 1,
      }}
    >
      <List
        data={users}
        Component={UserTab}
        onOpen={openProfileHandler}
        isDataLoaded={!isLoading}
        OnLoadComponent={UserTabLoader}
      />
    </View>
  );
};
