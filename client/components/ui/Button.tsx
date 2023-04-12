import React, { ElementType, ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';

export enum ButtonType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Link = 'LINK',
  Round = 'ROUND',
}

type Props = {
  children?: string;
  icon?: ReactNode;
  onPress: () => void;
  style?: any;
  type?: ButtonType;
  fontColor?: string;
  fontSize?: number;
};

export const Button: React.FC<Props> = ({
  children,
  icon,
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
      fontColor = THEME.BRIGHTER_COLOR;
      break;
    case ButtonType.Round:
      backgroundColor = THEME.WHITE_TRANSPARENT;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={THEME.ACTIVE_OPACITY}>
      <View style={{ ...styles.button, backgroundColor, ...style }}>
        {icon}
        {children ? (
          <Text style={{ color: fontColor, fontSize }} bold={true}>
            {children}
          </Text>
        ) : null}
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
    margin: 'auto',
  },
});
