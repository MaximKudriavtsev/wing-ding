import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from './ui/Text';
import { SCREEN_STYLE } from './theme';
import { User } from '../src/api/user/types';
import { Event } from '../src/api/event/types';
import { Comment } from '../src/api/event/types';

const idToString = (id: number | string) => id.toString();

type Props = {
  data?: Event[] | User[] | Comment[];
  Component: React.ElementType;
  onOpen?: ((event: Event) => void) | ((userId: string) => void);
  onShowMembers?: () => void;
  emptyText: string;
  style?: object;
};

export const List: React.FC<Props> = ({
  style,
  data,
  Component,
  onOpen,
  onShowMembers,
  emptyText = 'Здесь пока пусто...',
}) => {
  return (
    <View style={{ ...SCREEN_STYLE.listWrapper, ...style }}>
      {data == null || !data || data.length == 0 ? (
        <Text style={{ textAlign: 'center' }}>{emptyText}</Text>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          keyExtractor={item => idToString(item.id)}
          renderItem={({ item }) => (
            <Component item={item} onOpen={onOpen} onShowMembers={onShowMembers} />
          )}
        />
      )}
    </View>
  );
};
