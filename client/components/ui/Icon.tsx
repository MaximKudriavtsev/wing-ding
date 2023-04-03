import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from '../theme';

type IconType = {
  name: string;
  size?: number;
  color?: string;
  style?: object;
};

export const Icon: React.FC<IconType> = ({
  name,
  size = 12,
  color = THEME.PLACEHOLDER_COLOR,
  style,
}) => <FontAwesome name={name} size={size} color={color} style={style} />;
