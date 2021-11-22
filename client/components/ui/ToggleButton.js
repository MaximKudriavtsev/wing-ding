import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export const ToggleButton = ({ children, onPress, style, active, fontSize = 14 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={THEME.ACTIVE_OPACITY}
      style={{
        ...styles.button,
        ...style,
        ...(active
          ? { backgroundColor: THEME.BRIGHTER_COLOR }
          : { backgroundColor: THEME.DARKER_COLOR }),
      }}
    >
      <View>
        <Text
          style={{
            fontSize,
            ...(active ? { color: THEME.FONT_COLOR } : { color: THEME.PLACEHOLDER_COLOR }),
          }}
          bold={true}
        >
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
  },
});
