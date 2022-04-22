import React from 'react';
import { ImageBackground } from 'react-native';

export const Image = ({ style, source, defaultImage, imageStyle }) => {
  return (
    <ImageBackground
      style={style}
      source={source != null ? { uri: source } : defaultImage}
      imageStyle={imageStyle}
    />
  );
};
