import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '../components/List';
import { EventTab } from '../components/EventTab';
import { ToggleButton } from '../components/ui/ToggleButton';
import { DATA, ME } from './../components/data';
import { THEME } from './../components/theme';
import { Row } from '../components/Row';
import { findUserById } from '../src/utils';

export const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState(DATA);
  const [filter, setFilter] = useState('all');

  const areFriendsThere = event => {
    for (let i = 0; i < event.membersIds.length; i++) {
      if (ME.friendsId.includes(event.membersIds[i])) {
        return event;
      }
    }
  };

  const openEventHandler = event => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const showMembersHandler = membersId => {
    const members = membersId.map(findUserById);
    navigation.navigate('UserListScreen', { users: members, title: 'Участники' });
  };

  const showAllEvents = () => {
    setEvents(DATA);
    setFilter('all');
  };

  const showFriendsEvents = () => {
    setEvents(DATA.filter(areFriendsThere));
    setFilter('friends');
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Wing-Ding',
    });
  }, [navigation]);

  return (
    <View style={{ backgroundColor: THEME.BACKGROUND_COLOR, flex: 1 }}>
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={filter === 'all'}
          style={styles.filterButton}
          onPress={showAllEvents}
        >
          Все события
        </ToggleButton>
        <ToggleButton
          isActive={filter === 'friends'}
          style={styles.filterButton}
          onPress={showFriendsEvents}
        >
          События друзей
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
