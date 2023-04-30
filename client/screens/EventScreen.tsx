import React, { useEffect, useState, useContext } from 'react';
import { api } from '../src/api';
import { StyleSheet, View } from 'react-native';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { EventOptionsSheet } from '../components/sheets/EventOptionsSheet';
import { Text } from '../components/ui/Text';
import { THEME } from '../components/theme';
import { Event } from '../src/api/event/types';
import { BottomScrolledTab } from '../components/sheets/BottomScrolledTab';
import { EventPages } from '../components/event/EventPages';
import { EventScreenBackground } from '../components/event/EventScreenBackground';
import { EventScreenSheet } from '../components/event/EventScreenSheet';
import { EventScreenSheetLoader } from '../components/loaders/EventScreenSheetLoader';
import { Button, ButtonType } from '../components/ui/Button';
import { ModalLoader } from '../components/loaders/ModalLoader';

type Props = {
  navigation: any;
  route: any;
};

export const EventScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId } = route.params;
  const { showAlertMessage } = useContext(AlertContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSucceed, setLoadingSucceed] = useState(true);
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
    setIsDeleting(true);
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
      .finally(() => setIsDeleting(false));
  };

  const showMembersHandler = () => {
    navigation.push('MemberListScreen', {
      eventId,
      title: 'Участники',
    });
  };

  const toggleMember = () => {
    if (event === null) return;
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
      });
  };

  useEffect(() => {
    setIsLoading(true);
    api.event
      .getEvent(eventId)
      .then(({ data }) => {
        setEvent(data);
        setLoadingSucceed(true);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        setLoadingSucceed(false);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

  return (
    <View style={styles.wrapper}>
      {!!loadingSucceed ? (
        <View style={styles.eventScreen}>
          <ModalLoader isVisible={isDeleting} />
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
            collapsedNode={
              isLoading || !event ? (
                <EventScreenSheetLoader />
              ) : (
                <EventScreenSheet event={event} toggleMember={toggleMember} />
              )
            }
            fullScreenNode={<EventPages navigation={navigation} route={route} event={event} />}
          />
          <EventOptionsSheet
            onEditEvent={editEvent}
            onDeleteEvent={onDeleteEvent}
            isVisible={isOptionsSheetVisible}
            onClose={closeOptionsSheet}
          />
        </View>
      ) : (
        <>
          <Text>Не удалось загрузить событие</Text>
          <Button type={ButtonType.Link} onPress={navigation.goBack}>
            {'Назад'}
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.BACKGROUND_COLOR,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventScreen: { height: '100%', width: '100%' },
});
