import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { THEME } from './theme';

type Props = {
  style?: object;
  children?: React.ReactNode;
  fixedHeight?: string | number;
};
export const KeyboardAvoidingView: React.FC<Props> = ({ style, children, fixedHeight }) => {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', event => {
      keyboardHeight.value = withTiming(
        event.endCoordinates.height - THEME.BOTTOM_NAVIGATION_BAR_HEIGHT,
      );
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', event => {
      keyboardHeight.value = withTiming(0);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const reanimatedStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboardHeight.value,
    height: fixedHeight || 'auto',
  }));

  return (
    <View style={style}>
      <Animated.View style={reanimatedStyle}>{children}</Animated.View>
    </View>
  );
};
