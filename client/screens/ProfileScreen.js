import React, { useState, useEffect } from 'react';
import { dateRu, findUserById } from '../src/utils';
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
import { SCREEN_STYLE, THEME } from '../components/theme.js';
import { DATA, ME } from '../components/data';

export const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params;

  const userEvents = DATA.filter(event => event.membersIds.includes(user.id));

  const [events, setEvents] = useState(userEvents);
  const [filter, setFilter] = useState('all');

  const openEventHandler = event => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const showMembersHandler = membersId => {
    const members = membersId.map(findUserById);
    navigation.navigate('UserListScreen', { users: members, title: 'Участники' });
  };

  const editProfileHandler = () => {
    navigation.navigate('ProfileEditScreen', { user });
  };

  const showFriendsHandler = () => {
    const friends = user.friendsId.map(findUserById);
    navigation.navigate('UserListScreen', { users: friends, title: 'Друзья' });
  };

  const showAllEvents = () => {
    setEvents(userEvents);
    setFilter('all');
  };
  const showUpcomingEvents = () => {
    setEvents(userEvents.filter(event => dateRu(event.date).isAfter(dateRu())));
    setFilter('upcoming');
  };

  useEffect(() => {
    setEvents(userEvents);
    let Header;
    if (user.id === ME.id) {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item title='Edit Profile' iconName={THEME.ICON_EDIT} onPress={editProfileHandler} />
          <Item
            title='Create Event'
            iconName={THEME.ICON_APPEND}
            onPress={() => console.log('Create Event')}
          />
        </HeaderButtons>
      );
    } else {
      const isFriend = ME.friendsId.includes(user.id);
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
      title: user.name,
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
            <UserIcon userId={user.id} iconSize={82} />
          </View>
          <Row style={styles.buttonsRow}>
            <Text>{`Событий: ${userEvents.length}`}</Text>
            <Button
              backgroundColor={'transparent'}
              fontColor={THEME.BUTTON_COLOR}
              onPress={showFriendsHandler}
            >{`Друзей: ${user.friendsId.length}`}</Button>
          </Row>
        </Row>
        <Text>{user.status ? user.status : 'Текст о себе...'}</Text>
      </Column>
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={filter === 'all'}
          style={styles.filterButton}
          onPress={showAllEvents}
        >
          {user.id === ME.id ? `Мои события` : `События`}
        </ToggleButton>
        <ToggleButton
          isActive={filter === 'upcoming'}
          style={styles.filterButton}
          onPress={showUpcomingEvents}
        >
          Будущие события
        </ToggleButton>
      </Row>
      <List
        data={events}
        Component={EventTab}
        onOpen={openEventHandler}
        onShowMembers={showMembersHandler}
      />
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
