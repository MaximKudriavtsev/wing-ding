import { StyleSheet } from 'react-native';

export const THEME = {
  //General
  REGULAR_FONT: 'comfortaa-regular',
  BOLD_FONT: 'comfortaa-bold',
  FONT_COLOR: '#ddd',
  BACKGROUND_COLOR: '#001628',
  DARKER_COLOR: '#00111e',
  BRIGHTER_COLOR: '#68a2b9',
  DANGER_COLOR: '#e9072b',
  TITLE_FONT_SIZE: 28,
  LABEL_FONT_SIZE: 16,
  //Button
  BUTTON_COLOR: '#99d9d9',
  BUTTON_FONT_COLOR: '#1a1523',
  BUTTON_FONT_SIZE: 18,
  ACTIVE_OPACITY: 0.7,
  //Input
  PLACEHOLDER_COLOR: '#666',
  //Icons
  ICON_USER: 'user-o',
  ICON_ENVELOPE: 'envelope-o',
  ICON_LOCK: 'lock',
  ICON_UNLOCK: 'unlock-alt',
  ICON_SEARCH: 'search',
  ICON_EVENTS: 'home',
  ICON_APPEND: 'plus-square-o',
  ICON_EDIT: 'edit',
};

export const SCREEN_STYLE = StyleSheet.create({
  wrapper: {
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
    paddingHorizontal: 15,
  },
});
