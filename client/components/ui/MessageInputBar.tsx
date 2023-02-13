import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from './TextInput';
import { Button, ButtonType } from './Button';
import { THEME } from '../theme';

type Props = {
  style?: object;
  placeholder?: string;
  message?: string;
  onSetMessage?: (message: string) => void;
  onSend: () => void;
};

export const MessageInputBar: React.FC<Props> = ({
  style,
  placeholder,
  message,
  onSetMessage,
  onSend,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        multiline={true}
        onChangeText={onSetMessage}
      >
        {message}
      </TextInput>
      <Button
        style={{ height: 50 }}
        type={ButtonType.Link}
        fontColor={THEME.BRIGHTER_COLOR}
        onPress={onSend}
      >
        {'Отправить'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopColor: THEME.DARKER_COLOR,
    borderTopWidth: 1,
  },
  textInput: {
    marginBottom: 0,
    width: '70%',
    height: 'auto',
    minHeight: 50,
  },
});
