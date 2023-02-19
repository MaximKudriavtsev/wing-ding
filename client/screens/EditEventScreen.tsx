import React, { useContext, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { EventForm } from '../components/ui/EventForm';
import { ScrollView } from 'react-native';
import { PhotoPickerSheet } from '../components/ui/PhotoPickerSheet';
import { api } from '../src/api';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { Column } from '../components/Column';
import { SCREEN_STYLE } from '../components/theme.js';
import { getObjectChanges } from '../src/utils';
import { Event } from '../src/api/event/types';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView';

type Props = {
  navigation: any;
  route: any;
};

export const EditEventScreen: React.FC<Props> = ({ navigation, route }) => {
  const event: Event = { ...route.params.event };

  const { showAlertMessage } = useContext(AlertContext);
  const [isFormValid, setFormValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [eventPhotoUri, setEventPhotoUri] = useState(event.img || '');
  const [eventObject, setEventObject] = useState({});

  const openPickerSheet = () => {
    setPickerSheetVisible(true);
  };

  const closePickerSheet = () => {
    setPickerSheetVisible(false);
  };

  // Object changes and validates with Event Form
  const onChangeEvent = () => {
    if (!isFormValid) {
      showAlertMessage(validationMessage, AlertType.Error);
      return;
    }
    setIsLoading(true);
    const changes = getObjectChanges(eventObject, event);
    api.event
      .updateEvent(changes, +event.id)
      .then(({ status }) => {
        if (status === 200) {
          showAlertMessage('Событие успешно обновлено', AlertType.Info);
          navigation.navigate('EventDetails', { eventId: event.id });
        }
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <KeyboardAvoidingView>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <Column style={{ padding: 15 }}>
              <EventForm
                event={event}
                eventPhoto={eventPhotoUri}
                onOpenPhotoPicker={openPickerSheet}
                onValidate={setFormValid}
                onSetValidationMessage={setValidationMessage}
                onSetEventObject={setEventObject}
              />
              <Button onPress={onChangeEvent}>Изменить событие</Button>
            </Column>
          </ScrollView>
          <PhotoPickerSheet
            isVisible={isPickerSheetVisible}
            onClose={closePickerSheet}
            onSetPhoto={setEventPhotoUri}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};
