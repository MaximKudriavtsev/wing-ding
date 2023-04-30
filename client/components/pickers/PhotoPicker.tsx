import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { Image } from '../ui/Image';
import { THEME } from '../theme';

type Props = {
  style?: object;
  source: string;
  photoDiameter: number;
  onPress: () => void;
};

export const PhotoPicker: React.FC<Props> = ({ style, source, onPress, photoDiameter = 150 }) => {
  return (
    <TouchableOpacity style={style} activeOpacity={0.7} onPress={onPress}>
      <Image
        source={source}
        style={{ ...styles.imageWrapper, width: photoDiameter, height: photoDiameter }}
        imageStyle={styles.image}
        defaultImage={THEME.USER_PHOTO}
      />
      <Text style={styles.text}>{source ? 'Изменить фото' : 'Загрузить фото'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    width: '80%',
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
    marginTop: 10,
    color: THEME.BUTTON_COLOR,
  },
});
