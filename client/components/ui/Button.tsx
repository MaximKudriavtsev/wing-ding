import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

enum ButtonType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Link = 'LINK',
}

type Props = {
  children: string;
  onPress: () => void;
  style?: any;
  type?: ButtonType;
  fontColor?: string;
  fontSize?: number;
};

export const Button: React.FC<Props> = ({
  children,
  onPress,
  style,
  type,
  fontColor,
  fontSize,
}) => {
  let backgroundColor;

  switch (type) {
    case ButtonType.Primary:
      backgroundColor = THEME.BUTTON_COLOR;
      fontColor = THEME.BACKGROUND_COLOR;
      break;
    case ButtonType.Secondary:
      backgroundColor = THEME.BACKGROUND_COLOR;
      fontColor = THEME.BUTTON_COLOR;
      break;
    case ButtonType.Link:
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

Button.defaultProps = {
  type: ButtonType.Primary,
  fontColor: THEME.FONT_COLOR,
  fontSize: 14,
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
