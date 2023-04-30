import React, { useContext, useState } from 'react';
import { EventForm } from '../components/ui/EventForm';
import { ScrollView, StyleSheet } from 'react-native';
import { PhotoPickerSheet } from '../components/sheets/PhotoPickerSheet';
import { api } from '../src/api';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { Button } from '../components/ui/Button';
import { KeyboardAvoidingView } from '../components/ui/KeyboardAvoidingView';
import { ModalLoader } from '../components/loaders/ModalLoader';

export const CreateEventScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);

  const [isFormValid, setFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('Заполните форму');
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [eventPhotoUri, setEventPhotoUri] = useState('');
  const [eventObject, setEventObject] = useState({});

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
          navigation.navigate('ProfileScreen');
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
      <ModalLoader isVisible={isLoading} />
      <ScrollView style={styles.scrollWrapper}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 15,
  },
});
