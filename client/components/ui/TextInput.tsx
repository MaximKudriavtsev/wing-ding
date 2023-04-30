import React, { useEffect, useState } from 'react';
import { View, TextInput as DefaultTextInput, StyleSheet } from 'react-native';
import { Text } from './Text';
import { TextInputProps } from 'react-native';
import { THEME } from '../theme';
import { Loader } from '../loaders/Loader';
import { Icon, IconNames } from './Icon';

type Props = TextInputProps & {
  iconName?: IconNames;
  iconColor?: string;
  iconSize?: number;
  style?: object;
  isLoading?: boolean;
};

export const TextInput: React.FC<Props> = ({
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
  value,
  maxLength,
  isLoading = false,
}) => {
  const [valueLength, setValueLength] = useState(0);

  useEffect(() => {
    if (value == undefined) return;
    setValueLength(value.length);
  }, [value]);

  return (
    <View style={{ ...styles.inputSection, ...style }}>
      {iconName ? (
        <Icon style={styles.inputIcon} name={iconName} size={iconSize} color={iconColor} />
      ) : null}
      <DefaultTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={THEME.PLACEHOLDER_COLOR}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
      {isLoading ? <Loader /> : null}
      {maxLength == undefined ? null : (
        <Text style={styles.counter}>{`${valueLength}/${maxLength} `}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  counter: {
    alignSelf: 'flex-end',
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 12,
    padding: 5,
  },
});
