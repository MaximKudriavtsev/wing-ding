import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  style?: object;
  round?: boolean;
};

export const Skeleton: React.FC<Props> = ({ style, round }) => {
  const opacity = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(100, withTiming(0.5, { duration: 700 })),
        withTiming(1, { duration: 700 }),
      ),
      -1,
      false,
    );
  }, []);

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Animated.View style={[round ? styles.skeletonRound : styles.skeleton, reanimatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 15,
  },

  skeleton: {
    height: '100%',
    width: '100%',
    backgroundColor: 'gainsboro',
    borderRadius: 10,
  },

  skeletonRound: {
    height: '100%',
    width: '100%',
    backgroundColor: 'gainsboro',
    borderRadius: 100,
  },
});
