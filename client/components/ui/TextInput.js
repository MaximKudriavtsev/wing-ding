import React from 'react';
import { View, TextInput as DefaultTextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from '../theme';

export const TextInput = ({
  style,
  iconName,
  iconColor = THEME.PLACEHOLDER_COLOR,
  iconSize = 20,
  placeholder,
  onChangeText,
  autoCapitalize = 'none',
  numberOfLines = 1,
  secureTextEntry = false,
  multiline = false,
  children,
}) => {
  return (
    <View style={{ ...styles.inputSection, ...style }}>
      <FontAwesome style={styles.inputIcon} name={iconName} size={iconSize} color={iconColor} />
      <DefaultTextInput
        style={styles.input}
        placeholder={placeholder}
        value={children}
        placeholderTextColor={THEME.PLACEHOLDER_COLOR}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputIcon: {
    padding: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: THEME.FONT_COLOR,
    fontFamily: THEME.REGULAR_FONT,
    backgroundColor: 'transparent',
    color: THEME.FONT_COLOR,
  },
});
