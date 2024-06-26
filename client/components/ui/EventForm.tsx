import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PhotoPicker } from '../pickers/PhotoPicker';
import { Event } from '../../src/api/event/types';
import { Column } from './Column';
import { Row } from './Row';
import { Text } from './Text';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { dateRu, validate } from '../../src/utils';
import { IconNames } from './Icon';
import { DateTimeInput } from './DateTimeInput';
import { DateTimePickerType } from '../pickers/DateTimePicker';

type Props = {
  event?: Event;
  /**
   *  Required photo from photo picker
   */
  eventPhoto: string;
  onOpenPhotoPicker: () => void;
  onValidate: (b: boolean) => void;
  onSetValidationMessage: (s: string) => void;
  onSetEventObject: (event: {
    title: string;
    date: string;
    place: string;
    text: string;
    img: string;
  }) => void;
};

export const EventForm: React.FC<Props> = ({
  event,
  eventPhoto,
  onOpenPhotoPicker,
  onValidate,
  onSetValidationMessage,
  onSetEventObject,
}) => {
  const [eventPhotoUri, setEventPhotoUri] = useState(event ? event.img : eventPhoto);
  const [title, setTitle] = useState(event ? event.title : ''); // Set event props if they exist
  const [timeString, setTimeString] = useState(event ? dateRu(event.date).format('HH:mm') : '');
  const [dateString, setDateString] = useState(
    event ? dateRu(event.date).format('DD/MM/YYYY') : '',
  );
  const [place, setPlace] = useState(event ? event.place : '');
  const [description, setDescription] = useState(event ? event.text : '');
  const [titleValidations, setTitleValidations] = useState({ isValid: event || false }); // If we got event - its props valid
  const [placeValidations, setPlaceValidations] = useState({ isValid: event || false });
  const [descriptionValidations, setDescriptionValidations] = useState({
    isValid: event || false,
  });

  const today = new Date();
  let date;

  const onChangeDate = (dateTime: Date) => {
    setDateString(dateRu(dateTime).format('DD/MM/YYYY'));
  };

  const onChangeTime = (dateTime: Date) => {
    setTimeString(dateRu(dateTime).format('HH:mm'));
  };

  useEffect(() => {
    setEventPhotoUri(eventPhoto); // Update image by photo picker
  }, [eventPhoto]);

  useEffect(() => {
    //Validation and setting event
    if (!titleValidations.isValid) {
      onValidate(false);
      onSetValidationMessage('Введите название события');
      return;
    }
    if (!placeValidations.isValid) {
      onValidate(false);
      onSetValidationMessage('Введите место проведения события');
      return;
    }
    if (!descriptionValidations.isValid) {
      onValidate(false);
      onSetValidationMessage('Добавьте описание события');
      return;
    }
    date = dateRu(`${dateString} ${timeString}`, 'DD/MM/YYYY HH:mm');
    if (dateRu(date).isBefore(dateRu())) {
      onValidate(false);
      onSetValidationMessage('Время события уже прошло');
      return;
    }
    onValidate(true);
    onSetEventObject({ title, date: date.toJSON(), place, text: description, img: eventPhotoUri });
  }, [title, dateString, timeString, place, description, eventPhotoUri]);

  return (
    <>
      <View>
        <Text style={styles.label}>Название</Text>
        <TextInput
          placeholder={'Введите название'}
          onChangeText={title => {
            setTitle(title);
            setTitleValidations(validate(title, { isRequired: true }));
          }}
          value={title}
        />
        <Row style={styles.row}>
          <PhotoPicker
            style={styles.photoPicker}
            source={eventPhotoUri}
            onPress={onOpenPhotoPicker}
            photoDiameter={130}
          />
          <Column style={{ width: '50%' }}>
            <Text style={styles.label}>Дата</Text>
            <DateTimeInput
              type={DateTimePickerType.Date}
              onChange={onChangeDate}
              dateTime={event ? new Date(event.date) : today}
              minimumDate={today}
            />
            <Text style={styles.label}>Время:</Text>
            <DateTimeInput
              type={DateTimePickerType.Time}
              onChange={onChangeTime}
              dateTime={event ? new Date(event.date) : today}
              minimumDate={today}
            />
          </Column>
        </Row>
        <Text style={styles.label}>Место</Text>
        <TextInput
          iconName={IconNames.ICON_LOCATION}
          placeholder={'Место'}
          onChangeText={place => {
            setPlace(place);
            setPlaceValidations(validate(place, { isRequired: true }));
          }}
        >
          {place}
        </TextInput>
        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={{ height: 100, marginBottom: 30 }}
          iconName={IconNames.ICON_PENCIL}
          multiline={true}
          numberOfLines={4}
          placeholder={'Добавьте описание'}
          onChangeText={description => {
            setDescription(description);
            setDescriptionValidations(validate(description, { isRequired: true }));
          }}
        >
          {description}
        </TextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    height: 170,
    marginVertical: 20,
  },

  photoPicker: {
    display: 'flex',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },

  coverWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },

  image: {
    width: '100%',
    height: 170,
    borderRadius: 30,
  },

  label: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
