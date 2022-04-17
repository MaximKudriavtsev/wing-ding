import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { eventApi } from '../src/api/event/apiProduction';
import { AlertContext } from '../src/context/AlertContext';
import { Column } from '../components/Column';
import { Row } from '../components/Row';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { Loader } from '../components/ui/Loader';
import { dateRu, validate } from '../src/utils';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const CreateEventScreen = ({ navigation }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('https://vibirai.ru/image/1245358.w640.jpg');
  const [title, setTitle] = useState('');
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [titleValidations, setTitleValidations] = useState({ isValid: false });
  const [timeValidations, setTimeValidations] = useState({ isValid: false });
  const [dateValidations, setDateValidations] = useState({ isValid: false });
  const [placeValidations, setPlaceValidations] = useState({ isValid: false });
  const [descriptionValidations, setDescriptionValidations] = useState({
    isValid: false,
  });

  const validateForms = () => {
    if (!titleValidations.isValid) {
      showAlertMessage('Введите название события', 'ERROR');
      return false;
    }
    if (!dateValidations.isValid) {
      showAlertMessage('Введите дату события в формате DD.MM.YYYY', 'ERROR');
      return false;
    }
    if (!timeValidations.isValid) {
      showAlertMessage('Введите время события в формате HH:MM', 'ERROR');
      return false;
    }
    if (!placeValidations.isValid) {
      showAlertMessage('Введите место проведения события', 'ERROR');
      return false;
    }
    if (!descriptionValidations.isValid) {
      showAlertMessage('Добавьте описание события', 'ERROR');
      return false;
    }
    return true;
  };

  const onCreateEvent = () => {
    if (!validateForms()) return;
    const date = dateRu(`${dateString} ${timeString}`, 'DD.MM.YYYY HH:mm');
    if (dateRu(date).isBefore(dateRu())) {
      showAlertMessage('Время события уже прошло', 'ERROR');
      return;
    }
    setIsLoading(true);
    console.log('ok');
    eventApi
      .createEvent({ title, date, place, description, photo })
      .then(({ data, status }) => {
        if (status === 200) {
          showAlertMessage('Событие создано', 'INFO');
          navigation.navigate('ProfileScreen');
          return;
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={SCREEN_STYLE.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          <Text style={styles.label}>Название</Text>
          <TextInput
            placeholder={'Введите название'}
            onChangeText={title => {
              setTitle(title);
              setTitleValidations(validate(title, { isFilled: true }));
            }}
          />
          <Row style={styles.row}>
            <TouchableOpacity
              style={styles.coverWrapper}
              activeOpacity={0.7}
              onPress={() => console.log('Load photo')}
            >
              <View style={styles.coverWrapper}>
                <ImageBackground
                  style={styles.image}
                  imageStyle={{ borderRadius: 10 }}
                  source={{ uri: photo }}
                />
              </View>
            </TouchableOpacity>

            <Column>
              <Text style={styles.label}>Дата</Text>
              <TextInput
                style={styles.smallInput}
                iconName={THEME.ICON_CALENDAR}
                placeholder={'Дата'}
                onChangeText={dateString => {
                  setDateString(dateString);
                  setDateValidations(validate(dateString, { isDateString: true }));
                }}
              />
              <Text style={styles.label}>Время:</Text>
              <TextInput
                style={styles.smallInput}
                iconName={THEME.ICON_CLOCK}
                placeholder={'Время'}
                onChangeText={timeString => {
                  setTimeString(timeString);
                  setTimeValidations(validate(timeString, { isTimeString: true }));
                }}
              />
            </Column>
          </Row>
          <Text style={styles.label}>Место</Text>
          <TextInput
            iconName={THEME.ICON_LOCATION}
            placeholder={'Место'}
            onChangeText={place => {
              setPlace(place);
              setPlaceValidations(validate(place, { isFilled: true }));
            }}
          />
          <Text style={styles.label}>Описание</Text>
          <TextInput
            style={{ height: 100, marginBottom: 30 }}
            iconName={THEME.ICON_PENCIL}
            multiline={true}
            numberOfLines={4}
            placeholder={'Добавьте описание'}
            onChangeText={description => {
              setDescription(description);
              setDescriptionValidations(validate(description, { isFilled: true }));
            }}
          />
          <Button type={'primary'} onPress={onCreateEvent}>
            Создать событие
          </Button>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '50%',
    height: 170,
    marginBottom: 10,
  },

  coverWrapper: {
    display: 'flex',
    width: '110%',
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

  smallInput: {
    width: '90%',
  },

  label: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
