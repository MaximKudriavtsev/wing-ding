import { StyleSheet } from 'react-native';

export const THEME = {
  //General
  REGULAR_FONT: 'comfortaa-regular',
  BOLD_FONT: 'comfortaa-bold',
  FONT_COLOR: '#ddd',
  BACKGROUND_COLOR: '#1b162a',
  DARKER_COLOR: '#181327',
  TITLE_FONT_SIZE: 28,
  LABEL_FONT_SIZE: 16,
  //Button
  BUTTON_COLOR: '#0df5e3',
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
};

export const SCREEN_STYLE = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
