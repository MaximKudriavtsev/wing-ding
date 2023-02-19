import React, { useEffect, useState, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../src/api';
import { dateRu } from '../src/utils';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { Image } from '../components/ui/Image';
import { Loader } from '../components/ui/Loader';
import { EventOptionsSheet } from '../components/ui/EventOptionsSheet';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/HeaderIcon';
import { UserIcon } from '../components/ui/UserIcon';
import { MemberTab } from '../components/ui/MemberTab';
import { Row } from '../components/Row';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { TouchableOpacity } from 'react-native';
import { THEME } from '../components/theme.js';
import { Event } from '../src/api/event/types';
import { ButtonType } from '../components/ui/Button';

type Props = {
  navigation: any;
  route: any;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId } = route.params;
  const { showAlertMessage } = useContext(AlertContext);

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [isOptionsSheetVisible, setOptionsSheetVisible] = useState(false);

  const onOpenCommentsScreen = () => {
    navigation.push('CommentListScreen', { eventId });
  };

  const openOptionsSheet = () => {
    setOptionsSheetVisible(true);
  };

  const closeOptionsSheet = () => {
    setOptionsSheetVisible(false);
  };

  const editEvent = () => {
    navigation.push('EditEventScreen', { event });
    closeOptionsSheet();
  };

  const onDeleteEvent = () => {
    setIsLoading(true);
    api.event
      .deleteEvent(eventId)
      .then(({ status }) => {
        if (status === 200) {
          showAlertMessage('Событие успешно удалено', AlertType.Info);
          navigation.goBack();
        }
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  };

  const showMembersHandler = () => {
    navigation.push('MemberListScreen', {
      eventId,
      title: 'Участники',
    });
  };

  const toggleMember = () => {
    if (event === null) return;
    setIsLoading(true);
    api.event[event.isMember ? 'leaveEvent' : 'joinEvent'](eventId)
      .then(() => {
        api.event //Until I use useQuery
          .getEvent(eventId)
          .then(({ data }) => {
            setEvent(data);
          });
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    api.event
      .getEvent(eventId)
      .then(({ data }) => {
        setEvent(data);
        navigation.setOptions({
          headerRight: () => {
            if (!data.isHost) return;
            return (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item title='Filter' iconName={THEME.ICON_OPTION_DOTS} onPress={openOptionsSheet} />
              </HeaderButtons>
            );
          },
          title: data.title,
        });
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : event != null ? (
        <>
          <ScrollView>
            <Row style={{ height: 50, alignItems: 'center' }}>
              <UserIcon userPhoto={event.host.photo} />
              <Text bold={true} style={{ marginLeft: 10 }}>
                {`${event.host.firstName} ${event.host.lastName}`}
              </Text>
            </Row>
            <Image style={styles.image} source={event.img} defaultImage={THEME.EVENT_IMAGE} />
            <Row style={styles.activitiesWrapper}>
              <MemberTab
                membersPhotos={event.membersPhotos}
                membersCount={event.membersCount}
                onOpen={showMembersHandler}
                style={styles.memberTab}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.commentsButton}
                onPress={onOpenCommentsScreen}
              >
                <FontAwesome name={THEME.ICON_COMMENTS} size={24} color={THEME.FONT_COLOR} />
                <Text style={{ marginLeft: 12 }}>{event.commentsCount}</Text>
              </TouchableOpacity>
            </Row>
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
              type={event.isMember ? ButtonType.Secondary : ButtonType.Primary}
              style={styles.button}
              onPress={toggleMember}
            >
              {event.isMember ? 'Отказаться от участия' : 'Принять участие'}
            </Button>
          </ScrollView>
          <EventOptionsSheet
            onEditEvent={editEvent}
            onDeleteEvent={onDeleteEvent}
            isVisible={isOptionsSheetVisible}
            onClose={closeOptionsSheet}
          />
        </>
      ) : (
        <Text>Не удалось загрузить соьытие</Text>
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
  activitiesWrapper: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  memberTab: {
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  commentsButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 20,
    height: '100%',
    paddingHorizontal: 12,
  },
});
