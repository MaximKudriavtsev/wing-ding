import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export const Button = ({
  children,
  onPress,
  backgroundColor = THEME.BUTTON_COLOR,
  fontColor = THEME.FONT_COLOR,
  fontSize = 14,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={THEME.ACTIVE_OPACITY}>
      <View style={{ ...styles.button, backgroundColor }}>
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
    marginTop: 30,
  },
});