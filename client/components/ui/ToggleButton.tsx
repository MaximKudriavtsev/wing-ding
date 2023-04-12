import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

type Props = {
  children?: React.ReactNode;
  onPress: () => void;
  style: object;
  isActive?: boolean;
  activeColor?: string;
  fontSize?: number;
};

export const ToggleButton: React.FC<Props> = ({
  children,
  onPress,
  style,
  isActive,
  activeColor = THEME.FONT_COLOR,
  fontSize = 14,
}) => {
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
            ...(isActive ? { color: activeColor } : { color: THEME.PLACEHOLDER_COLOR }),
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
