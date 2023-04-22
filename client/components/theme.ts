import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';

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
  USER_PHOTO: require('../assets/user.png'),
  EVENT_IMAGE: require('../assets/image.png'),
  //Sizes
  PROFILE_ICON_SIZE: 80,
  USER_TAB_ICON_SIZE: 46,
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

export const PROFILE_STYLE = StyleSheet.create({
  userBar: {
    height: 150,
    backgroundColor: THEME.BACKGROUND_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  userIconWrapper: {
    width: '20%',
  },
  userBarRow: {
    height: 'auto',
    marginBottom: 10,
  },
  userBarButtons: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 'auto',
    width: '80%',
  },
});

export const EVENT_TAB_STYLE = StyleSheet.create({
  linearGradient: { position: 'absolute', width: '100%', height: '100%' },
  event: {
    position: 'relative',
    width: '100%',
    height: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 15,
    marginVertical: 12,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: 250,
  },
  tabContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  footerRow: {
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 'auto',
  },
  headerColumn: {
    marginLeft: 15,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    color: THEME.WHITE_FONT_COLOR,
    fontSize: 18,
  },
  place: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 16,
  },
  activitiesWrapper: {
    position: 'relative',
    paddingVertical: 10,
    height: 65,
    justifyContent: 'space-between',
  },
  commentsLabel: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  textWrapper: {
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: THEME.PLACEHOLDER_COLOR,
  },
  memberTab: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export const USER_TAB_STYLE = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    padding: 5,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginLeft: 15,
  },
});

export const COMMENT_TAB_STYLE = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 5,
    height: 'auto',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
    width: '100%',
  },
  column: {
    paddingHorizontal: 15,
    borderBottomColor: THEME.DARKER_COLOR,
    borderBottomWidth: 1,
    marginVertical: 5,
    width: '85%',
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    color: THEME.PLACEHOLDER_COLOR,
    marginTop: 5,
  },
});

export const EVENT_SHEET_STYLE = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    height: 250,
  },
  icon: {
    width: 15,
  },
  button: {
    marginVertical: 25,
    borderWidth: 2,
    borderColor: THEME.BUTTON_COLOR,
  },
});

export const EVENT_INFO_PAGE_STYLE = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: '100%',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
  },
  icon: {
    width: 40,
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
  },
});
