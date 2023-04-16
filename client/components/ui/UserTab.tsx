import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { UserIcon } from './UserIcon';
import { Row } from './Row';
import { Text } from './Text';
import { THEME, USER_TAB_STYLE } from '../theme';
import { User } from '../../src/api/user/types';

type Props = {
  item: User;
  onOpen: (arg0: string) => void;
};

export const UserTab: React.FC<Props> = ({ item, onOpen }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item.id)}>
      <View style={USER_TAB_STYLE.wrapper}>
        <Row style={USER_TAB_STYLE.row}>
          <UserIcon userPhoto={item.photo} iconSize={THEME.USER_TAB_ICON_SIZE} />
          <Text style={USER_TAB_STYLE.name}>{`${item.firstName} ${item.lastName}`}</Text>
        </Row>
      </View>
    </TouchableOpacity>
  );
};
