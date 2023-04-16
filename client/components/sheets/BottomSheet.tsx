import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { THEME } from '../theme';

type Props = {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
};

export const BottomSheet: React.FC<Props> = ({ children, isVisible, onClose }) => {
  const translateSheet = useSharedValue(0);
  const translateBackground = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateSheet.value = withTiming(0);
      translateBackground.value = 0;
      opacity.value = withTiming(0.5);
    } else {
      translateSheet.value = withSpring(THEME.SCREEN_HEIGHT);
      translateBackground.value = withDelay(300, withTiming(THEME.SCREEN_HEIGHT * 3));
      opacity.value = withTiming(0);
    }
  }, [isVisible]);

  const panGestureBackgroundEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      runOnJS(onClose)();
    },
  });

  const panGestureAnchorEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (translateSheet.value < 0) return;
      translateSheet.value = event.translationY;
    },
    onEnd: () => {
      if (translateSheet.value < THEME.SCREEN_HEIGHT / 12) {
        translateSheet.value = withSpring(0);
        return;
      }
      runOnJS(onClose)();
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateSheet.value }],
    };
  });

  const reanimatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateBackground.value * 10 }],
    };
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={panGestureBackgroundEvent}>
        <Animated.View style={[styles.background, reanimatedBackgroundStyle]} />
      </PanGestureHandler>
      <Animated.View style={[styles.wrapper, reanimatedStyle]}>
        <PanGestureHandler onGestureEvent={panGestureAnchorEvent}>
          <Animated.View style={styles.anchorWrapper}>
            <View style={styles.anchor} />
          </Animated.View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: THEME.SCREEN_HEIGHT,
    width: THEME.SCREEN_WIDTH,
    top: 0,
    backgroundColor: 'black',
  },
  wrapper: {
    zIndex: 101,
    position: 'absolute',
    opacity: 1,
    borderRadius: 25,
    height: THEME.SCREEN_HEIGHT,
    width: THEME.SCREEN_WIDTH,
    top: THEME.SCREEN_HEIGHT - 370,
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
  anchor: {
    position: 'relative',
    width: 75,
    height: 5,
    backgroundColor: THEME.PLACEHOLDER_COLOR,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 5,
  },
  anchorWrapper: {
    position: 'relative',
    width: '100%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
});
