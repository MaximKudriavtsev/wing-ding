import React from 'react';
import { View, FlatList } from 'react-native';
import { SCREEN_STYLE } from './theme';

export const List = ({ data, Component, onOpen }) => {
  return (
    <View style={SCREEN_STYLE.listWrapper}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        kayExtractor={data => data.id.toString()}
        renderItem={({ item }) => <Component item={item} onOpen={onOpen} />}
      />
    </View>
  );
};
