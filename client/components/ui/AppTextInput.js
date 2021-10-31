import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from '../theme';

export const AppTextInput = ({
  iconName,
  iconColor = THEME.PLACEHOLDER_COLOR,
  iconSize = 20,
  children,
}) => {
  return (
    <View style={styles.inputSection}>
      <FontAwesome style={styles.inputIcon} name={iconName} size={iconSize} color={iconColor} />
      <TextInput
        style={styles.input}
        placeholder={children}
        placeholderTextColor={THEME.PLACEHOLDER_COLOR}
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
