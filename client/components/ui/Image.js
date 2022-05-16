import React from 'react';
import { ImageBackground } from 'react-native';

export const Image = ({ style, source, defaultImage, imageStyle }) => {
  return (
    <ImageBackground
      style={style}
      source={source ? { uri: source } : defaultImage}
      imageStyle={imageStyle}
    />
  );
};
