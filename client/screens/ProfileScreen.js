import React, { useState, useContext, useEffect } from 'react';
import { userApi } from '../src/api/user/apiProduction';
import { UserContext } from '../src/context/UserContext';
import { dateRu, findUserById, camelizeKeys } from '../src/utils';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { List } from '../components/List';
import { EventTab } from '../components/EventTab';
import { HeaderIcon } from '../components/HeaderIcon';
import { UserIcon } from '../components/ui/UserIcon';
import { Button } from '../components/ui/Button';
import { ToggleButton } from '../components/ui/ToggleButton';
import { Text } from '../components/ui/Text';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const { authorizedUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  const openEventHandler = event => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const showMembersHandler = membersId => {
    const members = membersId.map(findUserById);
    navigation.navigate('UserListScreen', { users: members, title: 'Участники' });
  };

  const showFriendsHandler = () => {
    // const friends = user.friendsId.map(findUserById);
    navigation.navigate('UserListScreen', { users: [], title: 'Друзья' });
  };

  const showAllEvents = () => {
    setEvents(events);
    setFilter('all');
  };
  const showUpcomingEvents = () => {
    setEvents(events.filter(event => dateRu(event.date).isAfter(dateRu())));
    setFilter('upcoming');
  };

  useEffect(() => {
    setIsLoading(true);
    userApi
      .getUserEvents()
      .then(response => {
        setEvents(response.data.map(camelizeKeys));
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response);
        setIsLoading(false);
      });
  }, [user.id]);

  useEffect(() => {
    let Header;
    if (user.id === authorizedUser.id) {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Edit Profile'
            iconName={THEME.ICON_EDIT}
            onPress={() => navigation.navigate('ProfileEditScreen')}
          />
          <Item
            title='Create Event'
            iconName={THEME.ICON_APPEND}
            onPress={() => console.log('Create Event')}
          />
        </HeaderButtons>
      );
    } else {
      const isFriend = authorizedUser.friendsId.includes(user.id);
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Toggle friend'
            iconName={isFriend ? THEME.ICON_CROSS : THEME.ICON_CHECK}
            onPress={() => console.log('Toggle friend')}
          />
        </HeaderButtons>
      );
    }
    navigation.setOptions({
      headerRight: () => Header,
      title: `${user.firstName} ${user.lastName}`,
    });
  }, [navigation, user]);

  return (
    <View
      style={{
        ...SCREEN_STYLE.wrapper,
        ...styles.wrapper,
      }}
    >
      <Column style={styles.userBar}>
        <Row style={{ height: 'auto', marginBottom: 10 }}>
          <View style={{ width: '20%' }}>
            <UserIcon userPhoto={user.photo} iconSize={82} />
          </View>
          <Row style={styles.buttonsRow}>
            <Text>{`Событий: ${user.events}`}</Text>
            <Button
              backgroundColor={'transparent'}
              fontColor={THEME.BUTTON_COLOR}
              onPress={showFriendsHandler}
            >{`Друзей: ${user.friends}`}</Button>
          </Row>
        </Row>
        <Text>{user.description ? user.description : 'Текст о себе...'}</Text>
      </Column>
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={filter === 'all'}
          style={styles.filterButton}
          onPress={showAllEvents}
        >
          {user.id === authorizedUser.id ? `Мои события` : `События`}
        </ToggleButton>
        <ToggleButton
          isActive={filter === 'upcoming'}
          style={styles.filterButton}
          onPress={showUpcomingEvents}
        >
          Будущие события
        </ToggleButton>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          data={events}
          Component={EventTab}
          onOpen={openEventHandler}
          onShowMembers={showMembersHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  userBar: {
    height: 'auto',
    backgroundColor: THEME.DARKER_COLOR,
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  buttonsRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 'auto',
    width: '80%',
  },
  filterRow: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'black',
  },
  filterButton: {
    width: '50%',
    height: '100%',
  },
});
