import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from '../theme';

type FontAwesomeName = React.ComponentProps<typeof FontAwesome>['name'];

export enum IconNames {
  ICON_USER = 'user-o',
  ICON_ENVELOPE = 'envelope-o',
  ICON_LOCK = 'lock',
  ICON_UNLOCK = 'unlock-alt',
  ICON_SEARCH = 'search',
  ICON_EVENTS = 'home',
  ICON_APPEND = 'plus-square-o',
  ICON_EDIT = 'edit',
  ICON_CHECK = 'check',
  ICON_CROSS = 'remove',
  ICON_WARNING = 'warning',
  ICON_LOCATION = 'map-marker',
  ICON_CALENDAR = 'calendar',
  ICON_CLOCK = 'clock-o',
  ICON_PENCIL = 'pencil',
  ICON_CAKE = 'birthday-cake',
  ICON_FILTER = 'filter',
  ICON_IMAGE = 'image',
  ICON_CAMERA = 'camera',
  ICON_OPTION_DOTS = 'ellipsis-h',
  ICON_COMMENTS = 'comments-o',
  ICON_INFO = 'info',
  ICON_ARROW_BACK = 'chevron-left',
}

type IconType = {
  name: IconNames;
  size?: number;
  color?: string;
  style?: object;
};

export const Icon: React.FC<IconType> = ({
  name,
  size = 12,
  color = THEME.PLACEHOLDER_COLOR,
  style,
}) => {
  const iconName: FontAwesomeName = name;

  return <FontAwesome name={iconName} size={size} color={color} style={style} />;
};
