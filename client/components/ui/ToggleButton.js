import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export const ToggleButton = ({ children, onPress, style, isActive, fontSize = 14 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={THEME.ACTIVE_OPACITY}
      style={{
        ...styles.button,
        ...style,
        ...(isActive ? { borderBottomWidth: 3, borderBottomColor: THEME.BRIGHTER_COLOR } : null),
      }}
    >
      <View>
        <Text
          style={{
            fontSize,
            ...(isActive ? { color: THEME.FONT_COLOR } : { color: THEME.PLACEHOLDER_COLOR }),
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
    backgroundColor: THEME.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
  },
});
