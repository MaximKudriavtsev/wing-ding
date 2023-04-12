import React, { useEffect, useState, useContext } from 'react';
import { api } from '../src/api';
import { StyleSheet, View } from 'react-native';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { Loader } from '../components/ui/Loader';
import { EventOptionsSheet } from '../components/ui/EventOptionsSheet';
import { Text } from '../components/ui/Text';
import { THEME } from '../components/theme';
import { Event } from '../src/api/event/types';
import { BottomScrolledTab } from '../components/BottomScrolledTab';
import { EventPages } from '../components/event/EventPages';
import { EventScreenBackground } from '../components/event/EventScreenBackground';
import { EventScreenSheet } from '../components/event/EventScreenSheet';

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

  const openCommentsScreen = () => {
    navigation.push('CommentListScreen', { eventId });
  };

  const goBack = () => {
    navigation.goBack();
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
          <BottomScrolledTab
            backgroundNode={
              <EventScreenBackground
                event={event}
                onShowMembersHandler={showMembersHandler}
                onOpenCommentsScreen={openCommentsScreen}
                onOpenOptionsSheet={openOptionsSheet}
                onGoBack={goBack}
              />
            }
            collapsedNode={<EventScreenSheet event={event} toggleMember={toggleMember} />}
            fullScreenNode={<EventPages navigation={navigation} route={route} event={event} />}
          />
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
    flex: 1,
  },
});
