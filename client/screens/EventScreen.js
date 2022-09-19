import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../src/config';
import { dateRu } from '../src/utils';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from '../components/ui/Image';
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

  const showMembersHandler = () => {
    navigation.push('MemberListScreen', {
      eventId,
      title: 'Участники',
    });
  };

  const toggleMember = () => {
    setIsLoading(true);
    api.event[event.isMember ? 'leaveEvent' : 'joinEvent'](eventId)
      .then(response => {
        api.event //Until I use useQuery
          .getEvent(eventId)
          .then(response => {
            setEvent(response.data);
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
    api.event
      .getEvent(eventId)
      .then(response => {
        setEvent(response.data);
        navigation.setOptions({
          title: response.data.title,
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
          <Image style={styles.image} source={event.img} defaultImage={THEME.EVENT_IMAGE} />
          <MemberTab
            membersPhotos={event.membersPhotos}
            membersCount={event.membersCount}
            onOpen={showMembersHandler}
          />
          <Text style={styles.place}>
            <FontAwesome name={THEME.ICON_LOCATION} size={18} />
            {`  ${event.place}`}
          </Text>

          <Text style={styles.date}>
            <FontAwesome name={THEME.ICON_CLOCK} size={16} />
            {`  ${dateRu(event.date).format('DD.MM')} начало в ${dateRu(event.date).format(
              'HH:mm',
            )}`}
          </Text>
          <Text style={styles.text}>{event.text}</Text>
          <Button
            type={event.isMember ? 'SECONDARY' : 'PRIMARY'}
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
