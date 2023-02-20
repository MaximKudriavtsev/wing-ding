import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
  emptyText?: string;
  style?: object;
  listHeader?: JSX.Element;
  stickyHeader?: boolean;
};

export const List: React.FC<Props> = ({
  style,
  data,
  Component,
  onOpen,
  onShowMembers,
  listHeader,
  emptyText = 'Здесь пока пусто...',
  stickyHeader = false,
}) => {
  return (
    <View style={SCREEN_STYLE.listWrapper}>
      <FlatList
        stickyHeaderIndices={stickyHeader ? [0] : undefined}
        stickyHeaderHiddenOnScroll={stickyHeader}
        style={style}
        ListHeaderComponent={listHeader}
        data={data}
        keyExtractor={item => idToString(item.id)}
        renderItem={({ item }) => (
          <Component item={item} onOpen={onOpen} onShowMembers={onShowMembers} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 100,
  },
});
