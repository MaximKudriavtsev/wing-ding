import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AlertContext, AlertType } from '../../src/context/AlertContext';
import { Text } from './Text';
import { Image } from './Image';
import { THEME } from '../theme';

type Props = {
  style: object;
  source: string;
  photoDiameter: number;
};

export const PhotoPicker: React.FC<Props> = ({ style, source, photoDiameter = 150 }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const [photoUri, setPhotoUri] = useState(source);

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      showAlertMessage('Необходимо разрешение для загрузки фото', AlertType.Error);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    if (result.cancelled) return;

    setPhotoUri(result.uri);
  };

  return (
    <TouchableOpacity style={style} activeOpacity={0.7} onPress={openImagePicker}>
      <Image
        source={photoUri}
        style={styles.imageWrapper}
        imageStyle={{ ...styles.image, width: photoDiameter, height: photoDiameter }}
        defaultImage={THEME.USER_PHOTO}
      />
      <Text style={styles.text}>{photoUri ? 'Изменить фото' : 'Загрузить фото'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    position: 'relative',
    borderRadius: 100,
  },

  text: {
    position: 'relative',
    justifyContent: 'center',
    height: '20%',
    color: THEME.BUTTON_COLOR,
  },
});
