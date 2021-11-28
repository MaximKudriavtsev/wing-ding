import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { EventList } from '../components/EventList';
import { HeaderIcon } from '../components/HeaderIcon';
import { UserIcon } from '../components/ui/UserIcon';
import { Button } from '../components/ui/Button';
import { ToggleButton } from '../components/ui/ToggleButton';
import { Text } from '../components/ui/Text';
import { SCREEN_STYLE, THEME } from '../components/theme.js';
import { DATA, ME } from '../components/data';

export const ProfileScreen = ({ navigation }) => {
  const openEventHandler = event => {
    navigation.navigate('EventDetails', { eventId: event.id });
  };

  const myEvents = DATA.filter(event => event.membersIds.includes(ME.id));

  const [events, setEvents] = useState(myEvents);
  const [filter, setFilter] = useState('all');

  const showAllEvents = () => {
    setEvents(myEvents);
    setFilter('all');
  };
  const showUpcomingEvents = () => {
    setEvents(myEvents.filter(event => new Date(event.date).getTime() > new Date().getTime()));
    setFilter('upcoming');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Edit Profile'
            iconName={THEME.ICON_EDIT}
            onPress={() => console.log('Edit')}
          />
          <Item
            title='Create Event'
            iconName={THEME.ICON_APPEND}
            onPress={() => console.log('Create Event')}
          />
        </HeaderButtons>
      ),
      title: ME.name,
    });
  }, [navigation]);

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
            <UserIcon userId={ME.id} iconSize={82} />
          </View>
          <Row style={styles.buttonsRow}>
            <Text>{`Событий: ${myEvents.length}`}</Text>
            <Button
              backgroundColor={'transparent'}
              fontColor={THEME.BUTTON_COLOR}
            >{`Друзей: ${ME.friendsId.length}`}</Button>
          </Row>
        </Row>
        <Text>{ME.status ? ME.status : 'Текст о себе...'}</Text>
      </Column>
      <Row style={styles.filterRow}>
        <ToggleButton active={filter === 'all'} style={styles.filterButton} onPress={showAllEvents}>
          Мои события
        </ToggleButton>
        <ToggleButton
          active={filter === 'upcoming'}
          style={styles.filterButton}
          onPress={showUpcomingEvents}
        >
          Будущие события
        </ToggleButton>
      </Row>
      <EventList events={events} onOpen={openEventHandler} />
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
