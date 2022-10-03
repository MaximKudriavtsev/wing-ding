import React, { useContext } from 'react';
import { cutPhoto } from '../../src/utils';
import { View } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { BottomSheetOption } from './BottomSheetOption';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { AlertContext, AlertType } from '../../src/context/AlertContext';
import { THEME, SCREEN_STYLE } from './../theme';

type Props = {
  isVisible: boolean;
  onSetPhoto: (uri: string) => void;
  onClose: () => void;
};

export const PhotoPickerSheet: React.FC<Props> = ({ isVisible, onSetPhoto, onClose }) => {
  const { showAlertMessage } = useContext(AlertContext);

  const compressPhoto = async (uri: string, height: number, width: number) => {
    const compressedSize = cutPhoto({ h: height, w: width });
    const compressedPhoto = await manipulateAsync(
      uri,
      [{ resize: { height: compressedSize.h, width: compressedSize.w } }],
      {
        compress: 0.5,
        format: SaveFormat.JPEG,
      },
    );
    return compressedPhoto.uri;
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      showAlertMessage('Необходимо разрешение для доступа к камере', AlertType.Error);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    onClose();

    if (result.cancelled) return;

    const photoUri = await compressPhoto(result.uri, result.height, result.width);

    onSetPhoto(photoUri);
  };

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      showAlertMessage('Необходимо разрешение для загрузки фото', AlertType.Error);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    onClose();
    if (result.cancelled) return;

    const photoUri = await compressPhoto(result.uri, result.height, result.width);

    onSetPhoto(photoUri);
  };

  return (
    <View style={SCREEN_STYLE.bottomSheetWrapper}>
      <BottomSheet isVisible={isVisible} onClose={onClose}>
        <BottomSheetOption
          icon={THEME.ICON_IMAGE}
          text={'Загрузить из галереи'}
          onPress={openImagePicker}
        />
        <BottomSheetOption icon={THEME.ICON_CAMERA} text={'Сделать фото'} onPress={openCamera} />
      </BottomSheet>
    </View>
  );
};
