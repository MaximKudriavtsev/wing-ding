import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { EventList } from './../components/EventList';
import { FilterButton } from '../components/ui/FilterButton';
import { DATA, ME } from './../components/data';
import { THEME } from './../components/theme';
import { Row } from '../components/Row';

export const EventListScreen = ({ navigation }) => {
  const openEventHandler = event => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const [events, setEvents] = useState(DATA);
  const [filter, setFilter] = useState('all');

  const areFriendsThere = event => {
    for (let i = 0; i < event.membersIds.length; i++) {
      if (ME.friendsId.includes(event.membersIds[i])) {
        return event;
      }
    }
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
        <FilterButton
          backgroundColor={filter === 'all' ? THEME.BRIGHTER_COLOR : THEME.DARKER_COLOR}
          fontColor={filter === 'all' ? THEME.FONT_COLOR : THEME.PLACEHOLDER_COLOR}
          style={styles.filterButton}
          onPress={showAllEvents}
        >
          Все события
        </FilterButton>
        <FilterButton
          backgroundColor={filter === 'friends' ? THEME.BRIGHTER_COLOR : THEME.DARKER_COLOR}
          fontColor={filter === 'friends' ? THEME.FONT_COLOR : THEME.PLACEHOLDER_COLOR}
          style={styles.filterButton}
          onPress={showFriendsEvents}
        >
          События друзей
        </FilterButton>
      </Row>
      <EventList events={events} onOpen={openEventHandler} />
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
