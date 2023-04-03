import React from 'react';
import { Keyboard, View } from 'react-native';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { THEME } from './theme';
import { OPERATING_SYSTEM, OperatingSystemType } from '../src/config';

type Props = {
  style?: object;
  children?: React.ReactNode;
  fixedHeight?: string | number;
  hasDefaultOffset?: boolean;
};
export const KeyboardAvoidingView: React.FC<Props> = ({
  style,
  children,
  fixedHeight,
  hasDefaultOffset = true, // To avoid Android keyboard behavior
}) => {
  const keyboardHeight = useSharedValue(0);

  Keyboard.addListener(
    OPERATING_SYSTEM === OperatingSystemType.Android ? 'keyboardDidShow' : 'keyboardWillShow',
    event => {
      keyboardHeight.value = withTiming(
        event.endCoordinates.height -
          (OPERATING_SYSTEM === OperatingSystemType.Ios ? THEME.BOTTOM_NAVIGATION_BAR_HEIGHT : 0),
      );
    },
  );
  Keyboard.addListener(
    OPERATING_SYSTEM === OperatingSystemType.Android ? 'keyboardDidHide' : 'keyboardWillHide',
    () => {
      keyboardHeight.value = withTiming(0);
    },
  );

  const reanimatedStyle = useAnimatedStyle(() => ({
    height: fixedHeight || 'auto',
    paddingBottom:
      OPERATING_SYSTEM === OperatingSystemType.Android && hasDefaultOffset
        ? 0
        : keyboardHeight.value,
  }));

  return (
    <View style={style}>
      <Animated.View style={reanimatedStyle}>{children}</Animated.View>
    </View>
  );
};
