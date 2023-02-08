import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from './ui/Text';
import { SCREEN_STYLE } from './theme';
import { User } from '../src/api/user/types';
import { Event } from '../src/api/event/types';

const idToString = (id: number | string) => id.toString();

type Props = {
  data?: Event[] | User[];
  Component: React.ElementType;
  onOpen: ((event: Event) => void) | ((userId: string) => void);
  onShowMembers?: () => void;
  emptyText: string;
};

export const List: React.FC<Props> = ({
  data,
  Component,
  onOpen,
  onShowMembers,
  emptyText = 'Здесь пока пусто...',
}) => {
  if (!data || data.length == 0) {
    return (
      <View style={SCREEN_STYLE.listWrapper}>
        <Text style={{ textAlign: 'center' }}>{emptyText}</Text>
      </View>
    );
  }
  return (
    <View style={SCREEN_STYLE.listWrapper}>
      <FlatList
        style={{ flex: 1, paddingHorizontal: 15 }}
        data={data}
        keyExtractor={item => idToString(item.id)}
        renderItem={({ item }) => (
          <Component item={item} onOpen={onOpen} onShowMembers={onShowMembers} />
        )}
      />
    </View>
  );
};
