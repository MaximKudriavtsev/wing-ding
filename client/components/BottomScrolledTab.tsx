import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import { THEME } from './theme';

type Props = {
  backgroundNode: JSX.Element;
  collapsedNode: JSX.Element;
  fullScreenNode: JSX.Element;
  style?: object;
};

const SCROLL_TAB_HEIGHT = 320;
const SLIDE_DOWN_OFFSET = 120;
const ANCHOR_HEIGHT = 50;
const BACKGROUND_BOTTOM_MARGIN = -50;
const MIN_SCROLL_TRANSLATION = 0;
const MAX_SCROLL_TRANSLATION =
  -THEME.SCREEN_HEIGHT +
  SCROLL_TAB_HEIGHT -
  BACKGROUND_BOTTOM_MARGIN +
  (THEME.STATUS_BAR_HEIGHT || 0);
const ANIMATION_DAMPING = 13;

export const BottomScrolledTab: React.FC<Props> = ({
  backgroundNode,
  collapsedNode,
  fullScreenNode,
  style,
}) => {
  const translateScrolledTab = useSharedValue(0);
  const backgroundOpacity = useSharedValue(1);

  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [currentScrollTranslation, setCurrentScrollTranslation] = useState<number>(0);

  useEffect(() => {
    fullScreen ? pagerRef.current?.setPage(1) : pagerRef.current?.setPage(0);
  }, [fullScreen]);

  const slideUp = () => {
    setCurrentScrollTranslation(MAX_SCROLL_TRANSLATION);
    translateScrolledTab.value = withSpring(MAX_SCROLL_TRANSLATION, { damping: ANIMATION_DAMPING });
    backgroundOpacity.value = withSpring(0);
    setFullScreen(true);
  };

  const slideDown = () => {
    setCurrentScrollTranslation(MIN_SCROLL_TRANSLATION);
    translateScrolledTab.value = withSpring(MIN_SCROLL_TRANSLATION, { damping: ANIMATION_DAMPING });
    backgroundOpacity.value = withSpring(1);
    setFullScreen(false);
  };

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (
        // Prevent move scroll over screen
        (!fullScreen && event.translationY >= 0) ||
        (fullScreen && event.translationY <= 0 && event.translationY > -MAX_SCROLL_TRANSLATION)
      )
        return;

      translateScrolledTab.value = event.translationY + currentScrollTranslation;

      backgroundOpacity.value = fullScreen
        ? -event.translationY / currentScrollTranslation
        : (THEME.SCREEN_HEIGHT - SCROLL_TAB_HEIGHT) /
          (THEME.SCREEN_HEIGHT - SCROLL_TAB_HEIGHT - event.translationY);
    },
    onEnd: event => {
      if (fullScreen) {
        if (event.translationY > SLIDE_DOWN_OFFSET) {
          runOnJS(slideDown)();
          return;
        }
        runOnJS(slideUp)();
      } else {
        if (event.translationY > -THEME.SCREEN_HEIGHT / 4) {
          runOnJS(slideDown)();
          return;
        }
        runOnJS(slideUp)();
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: translateScrolledTab.value,
    };
  });

  const reanimatedBackground = useAnimatedStyle(() => {
    return {
      paddingBottom: -translateScrolledTab.value,
      opacity: backgroundOpacity.value,
    };
  });

  const pagerRef = useRef<PagerView>(null);

  return (
    <>
      <Animated.View style={[styles.backgroundStyle, reanimatedBackground]}>
        {backgroundNode}
      </Animated.View>
      <Animated.View style={[styles.wrapper, reanimatedStyle]}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View>
            <Animated.View style={styles.anchorWrapper}>
              <View style={styles.anchor} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View style={styles.contentWrapper}>
          <PagerView
            style={{ flex: 1 }}
            orientation={'vertical'}
            ref={pagerRef}
            scrollEnabled={false}
          >
            <View key='1'>{collapsedNode}</View>
            <View key='2'>{fullScreenNode}</View>
          </PagerView>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: THEME.SCREEN_HEIGHT - SCROLL_TAB_HEIGHT,
    marginBottom: BACKGROUND_BOTTOM_MARGIN,
  },
  wrapper: {
    with: '100%',
    height:
      THEME.SCREEN_HEIGHT -
      THEME.BOTTOM_NAVIGATION_BAR_HEIGHT -
      THEME.STATUS_BAR_HEIGHT -
      ANCHOR_HEIGHT,
    backgroundColor: THEME.BACKGROUND_COLOR,
    borderRadius: 25,
    paddingHorizontal: 0,
  },
  anchor: {
    position: 'relative',
    width: 75,
    height: 5,
    backgroundColor: THEME.PLACEHOLDER_COLOR,
    alignSelf: 'center',
    borderRadius: 5,
  },
  anchorWrapper: {
    position: 'relative',
    width: '100%',
    height: ANCHOR_HEIGHT,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  collapsedWrapper: {
    width: '100%',
  },
});
