import React, { useEffect, useState, useContext } from 'react';
import { eventApi } from '../src/api/event/apiProduction';
import { dateRu, camelizeKeys } from '../src/utils';
import { ScrollView, ImageBackground, StyleSheet, View } from 'react-native';
import { Loader } from '../components/ui/Loader';
import { UserIcon } from '../components/ui/UserIcon';
import { MemberTab } from '../components/ui/MemberTab';
import { Row } from '../components/Row';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { THEME } from '../components/theme.js';

export const EventScreen = ({ navigation, route }) => {
  const { eventId } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [dateString, setDateString] = useState('');
  const [amIMember, setMeMember] = useState(false);

  const showMembersHandler = () => {
    navigation.push('MemberListScreen', {
      eventId,
      title: 'Участники',
    });
  };

  const toggleMember = () => {
    setIsLoading(true);
    eventApi[event.isMember ? 'leaveEvent' : 'joinEvent'](eventId)
      .then(response => {
        eventApi //Until I use useQuery
          .getEvent(eventId)
          .then(response => {
            setEvent(camelizeKeys(response.data));
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error.response.data);
            setIsLoading(true);
          });
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    setIsLoading(true);
    eventApi
      .getEvent(eventId)
      .then(response => {
        setEvent(camelizeKeys(response.data));
        navigation.setOptions({
          title: camelizeKeys(response.data).title,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error.response.data);
        setIsLoading(true);
      });
  }, [eventId]);

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <Row style={{ height: 50 }}>
            <UserIcon userPhoto={event.host.photo} />
            <Text bold={true} style={{ marginLeft: 10 }}>
              {`${event.host.firstName} ${event.host.lastName}`}
            </Text>
          </Row>
          <ImageBackground style={styles.image} source={{ uri: event.img }} />
          <MemberTab
            membersPhotos={event.membersPhotos}
            membersCount={event.membersCount}
            onOpen={showMembersHandler}
          />
          <Text style={styles.place}>{event.place}</Text>
          <Text style={styles.date}>
            {`${dateRu(event.date).format('DDMM')} начало в ${dateRu(event.date).format('HH:mm')}`}
          </Text>
          <Text style={styles.text}>{event.text}</Text>
          <Button
            type={amIMember ? 'secondary' : 'primary'}
            style={styles.button}
            onPress={toggleMember}
          >
            {event.isMember ? 'Отказаться от участия' : 'Принять участие'}
          </Button>
        </ScrollView>
      )}
    </View>
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
