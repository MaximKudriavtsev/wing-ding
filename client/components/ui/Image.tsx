import React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';

type Props = {
  style?: object;
  source?: string | null;
  defaultImage?: ImageSourcePropType;
  imageStyle?: object;
};

export const Image: React.FC<Props> = ({ style, source, defaultImage, imageStyle }) => {
  return (
    <ImageBackground
      style={style}
      source={!source || source === null ? defaultImage : { uri: source }}
      imageStyle={imageStyle}
    />
  );
};
