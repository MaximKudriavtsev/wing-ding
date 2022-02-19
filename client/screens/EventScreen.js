import React, { useEffect, useState } from 'react';
import { dateRu, findUserById } from '../src/utils';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { UserIcon } from '../components/ui/UserIcon';
import { MemberTab } from '../components/ui/MemberTab';
import { Row } from '../components/Row';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { THEME } from '../components/theme.js';
import { DATA, USERS, ME } from '../components/data';

export const EventScreen = ({ navigation, route }) => {
  const { eventId } = route.params;
  const event = DATA.find(e => e.id === eventId);
  const date = dateRu(event.date);
  const dateString = date.format('DD.MM') + ' начало в ' + date.format('HH:MM');

  const [members, setMembers] = useState(event.membersIds);
  const amIMember = members.find(user => user === ME.id) ? true : false;

  const showMembersHandler = membersId => {
    const members = membersId.map(findUserById);
    navigation.navigate('UserListScreen', { users: members, title: 'Участники' });
  };

  const enterEvent = () => {
    setMembers([...members, ME.id]);
  };

  const leaveEvent = () => {
    setMembers(members.filter(index => index !== ME.id));
  };

  useEffect(() => {
    navigation.setOptions({
      title: event.title,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.wrapper}>
      <Row style={{ height: 50 }}>
        <UserIcon userId={event.hostId} />
        <Text bold={true} style={{ marginLeft: 10 }}>
          {USERS.find(user => user.id === event.hostId).name}
        </Text>
      </Row>
      <ImageBackground style={styles.image} source={{ uri: event.img }} />
      <MemberTab members={members} onOpen={showMembersHandler} />
      <Text style={styles.place}>{event.place}</Text>
      <Text style={styles.date}>{dateString}</Text>
      <Text style={styles.text}>{event.text}</Text>
      <Text style={styles.text}>{event.text}</Text>
      <Button
        fontColor={amIMember ? THEME.BUTTON_COLOR : THEME.BACKGROUND_COLOR}
        backgroundColor={amIMember ? THEME.BACKGROUND_COLOR : THEME.BUTTON_COLOR}
        style={styles.button}
        onPress={amIMember ? leaveEvent : enterEvent}
      >
        {amIMember ? 'Отказаться от участия' : 'Принять участие'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.BACKGROUND_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  eventHost: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 10,
    marginVertical: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
  },
  place: {
    color: THEME.FONT_COLOR,
    fontSize: 18,
  },
  date: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 16,
  },
  text: {
    color: THEME.FONT_COLOR,
    fontSize: 16,
    marginTop: 30,
  },
  button: {
    marginVertical: 25,
    borderWidth: 2,
    borderColor: THEME.BUTTON_COLOR,
  },
});
