import React from 'react';
import { View, ImageSourcePropType, StyleSheet } from 'react-native';
import { THEME } from '../theme';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  style?: object;
  source?: string;
  defaultImage?: string;
  imageStyle?: object;
};

export const Image: React.FC<Props> = ({
  style,
  source,
  defaultImage = THEME.EVENT_IMAGE,
  imageStyle,
}) => {
  const defaultImageOpacity = useSharedValue(0);
  const imageOpacity = useSharedValue(0);

  const handleDefaultImageLoad = () => {
    defaultImageOpacity.value = withTiming(1, { duration: 100 });
  };

  const handleImageLoad = () => {
    imageOpacity.value = withTiming(1, { duration: 300 });
  };

  const reanimatedDefaultImageStyle = useAnimatedStyle(() => ({
    opacity: defaultImageOpacity.value,
  }));
  const reanimatedImageStyle = useAnimatedStyle(() => ({ opacity: imageOpacity.value }));

  return (
    <View style={style}>
      <Animated.Image
        source={defaultImage}
        style={[styles.image, imageStyle, reanimatedDefaultImageStyle]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />
      {source && source.length > 0 ? (
        <Animated.Image
          source={source && source.length > 0 ? { uri: source } : defaultImage}
          style={[styles.image, imageStyle, reanimatedImageStyle, styles.overlay]}
          onLoad={handleImageLoad}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
