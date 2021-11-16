import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export const FilterButton = ({
  children,
  onPress,
  style,
  backgroundColor = THEME.DARKER_COLOR,
  fontColor = THEME.PLACEHOLDER_COLOR,
  fontSize = 14,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={THEME.ACTIVE_OPACITY}
      style={{ ...styles.button, backgroundColor, ...style }}
    >
      <View>
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
  },
});
