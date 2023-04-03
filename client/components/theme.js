import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export const THEME = {
  //General
  SCREEN_WIDTH: Dimensions.get('screen').width,
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  REGULAR_FONT: 'comfortaa-regular',
  BOLD_FONT: 'comfortaa-bold',
  FONT_COLOR: '#111',
  WHITE_FONT_COLOR: '#fefefe',
  BACKGROUND_COLOR: '#fefefe',
  DARKER_COLOR: '#eeeeee',
  BRIGHTER_COLOR: '#6667ab',
  DANGER_COLOR: '#e9072b',
  WHITE_TRANSPARENT: 'rgba(255,255,255,.6)',
  TITLE_FONT_SIZE: 28,
  LABEL_FONT_SIZE: 16,
  HEADER_FONT_SIZE: 18,
  BOTTOM_NAVIGATION_BAR_HEIGHT: 80,
  STATUS_BAR_HEIGHT: Constants.statusBarHeight,
  //Button
  BUTTON_COLOR: '#6667ab',
  BUTTON_FONT_COLOR: '#1a1523',
  BUTTON_FONT_SIZE: 18,
  ACTIVE_OPACITY: 0.7,
  //Input
  PLACEHOLDER_COLOR: '#999',
  //Default pictures
  USER_PHOTO: require('../assets/user.jpg'),
  EVENT_IMAGE: require('../assets/event.jpg'),
  //Icons
  ICON_USER: 'user-o',
  ICON_ENVELOPE: 'envelope-o',
  ICON_LOCK: 'lock',
  ICON_UNLOCK: 'unlock-alt',
  ICON_SEARCH: 'search',
  ICON_EVENTS: 'home',
  ICON_APPEND: 'plus-square-o',
  ICON_EDIT: 'edit',
  ICON_CHECK: 'check',
  ICON_CROSS: 'remove',
  ICON_WARNING: 'warning',
  ICON_LOCATION: 'map-marker',
  ICON_CALENDAR: 'calendar',
  ICON_CLOCK: 'clock-o',
  ICON_PENCIL: 'pencil',
  ICON_CAKE: 'birthday-cake',
  ICON_FILTER: 'filter',
  ICON_IMAGE: 'image',
  ICON_CAMERA: 'camera',
  ICON_OPTION_DOTS: 'ellipsis-h',
  ICON_COMMENTS: 'comments-o',
  ICON_INFO: 'info',
  ICON_ARROW_BACK: 'chevron-left',
};

export const SCREEN_STYLE = StyleSheet.create({
  wrapper: {
    display: 'flex',
    position: 'relative',
    backgroundColor: THEME.BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  listWrapper: {
    position: 'relative',
    backgroundColor: THEME.BACKGROUND_COLOR,
    width: '100%',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  bottomSheetWrapper: {
    position: 'absolute',
    width: THEME.SCREEN_WIDTH,
    height: 0,
    top: 0,
    left: 0,
  },
});
