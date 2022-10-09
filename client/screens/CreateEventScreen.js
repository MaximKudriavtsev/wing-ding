import React, { useContext, useState } from 'react';
import { EventForm } from '../components/ui/EventForm';
import { View, ScrollView } from 'react-native';
import { PhotoPickerSheet } from '../components/ui/PhotoPickerSheet';
import { api } from '../src/config';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE } from '../components/theme.js';

export const CreateEventScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);

  const [isFormValid, setFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('Заполните форму');
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [eventPhotoUri, setEventPhotoUri] = useState('');
  const [eventObject, setEventObject] = useState({});
  let date;

  const openPickerSheet = () => {
    setPickerSheetVisible(true);
  };

  const closePickerSheet = () => {
    setPickerSheetVisible(false);
  };

  // Object creates and validates with Event Form
  const onCreateEvent = () => {
    if (!isFormValid) {
      showAlertMessage(validationMessage, AlertType.Error);
      return;
    }
    setIsLoading(true);
    api.event
      .createEvent(eventObject)
      .then(({ status }) => {
        if (status === 200) {
          showAlertMessage('Событие успешно создано', AlertType.Info);
          setIsLoading(false);
          navigation.navigate('ProfileScreen');
        }
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
        setIsLoading(false);
      });
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <EventForm
              eventPhoto={eventPhotoUri}
              onOpenPhotoPicker={openPickerSheet}
              onValidate={setFormValid}
              onSetValidationMessage={setValidationMessage}
              onSetEventObject={setEventObject}
            />
            <Button onPress={onCreateEvent}>Создать событие</Button>
          </ScrollView>
          <PhotoPickerSheet
            isVisible={isPickerSheetVisible}
            onClose={closePickerSheet}
            onSetPhoto={setEventPhotoUri}
          />
        </>
      )}
    </View>
  );
};
