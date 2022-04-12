import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export const Button = ({
  children,
  onPress,
  style,
  type = 'primary',
  fontColor = THEME.BUTTON_COLOR,
  fontSize = 14,
}) => {
  let backgroundColor;

  switch (type) {
    case 'primary':
      backgroundColor = THEME.BUTTON_COLOR;
      fontColor = THEME.BACKGROUND_COLOR;
      break;
    case 'secondary':
      backgroundColor = THEME.BACKGROUND_COLOR;
      fontColor = THEME.BUTTON_COLOR;
      break;
    case 'link':
      backgroundColor = 'transparent';
      fontColor;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={THEME.ACTIVE_OPACITY}>
      <View style={{ ...styles.button, backgroundColor, ...style }}>
        <Text style={{ color: fontColor, fontSize }} bold={true}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    borderRadius: 50,
  },
});
