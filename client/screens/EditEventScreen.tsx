import React, { useContext, useState, useEffect } from 'react';
import { EventForm } from '../components/ui/EventForm';
import { View, ScrollView } from 'react-native';
import { PhotoPickerSheet } from '../components/ui/PhotoPickerSheet';
import { api } from '../src/config';
import { AlertContext } from '../src/context/AlertContext';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE } from '../components/theme.js';
import { AlertType } from '../src/context/AlertContext';
import { getObjectChanges } from '../src/utils';

type Props = {
  // Does TS useful here?
  navigation: any;
  route: any;
};

export const EditEventScreen: React.FC<Props> = ({ navigation, route }) => {
  const event = { ...route.params.event };

  const { showAlertMessage } = useContext(AlertContext);
  const [isFormValid, setFormValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPickerSheetVisible, setPickerSheetVisible] = useState(false);
  const [eventPhotoUri, setEventPhotoUri] = useState(event.img || '');
  const [eventObject, setEventObject] = useState({});
  let date;

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
    //setIsLoading(true);
    console.log(getObjectChanges(eventObject, event));
    // api.event
    //   .createEvent(eventObject)
    //   .then(({ data, status }) => {
    //     if (status === 200) {
    //       showAlertMessage('Событие успешно создано', AlertType.Info);
    //       navigation.navigate('ProfileScreen');
    //       return;
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <EventForm
              event={event}
              eventPhoto={eventPhotoUri}
              onOpenPhotoPicker={openPickerSheet}
              onValidate={setFormValid}
              onSetValidationMessage={setValidationMessage}
              onSetEventObject={setEventObject}
            />
            <Button onPress={onChangeEvent}>Изменить событие</Button>
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
