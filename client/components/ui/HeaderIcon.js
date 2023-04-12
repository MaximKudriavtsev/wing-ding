import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';
import { THEME } from '../theme';

export const HeaderIcon = props => (
  <HeaderButton {...props} iconSize={28} IconComponent={FontAwesome} color={THEME.FONT_COLOR} />
);
