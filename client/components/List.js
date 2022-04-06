import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from './ui/Text';
import { SCREEN_STYLE } from './theme';

export const List = ({ data, Component, onOpen, onShowMembers }) => {
  if (!data.length) {
    return (
      <View style={SCREEN_STYLE.listWrapper}>
        <Text style={{ textAlign: 'center' }}>Здесь пока пусто...</Text>
      </View>
    );
  }
  return (
    <View style={SCREEN_STYLE.listWrapper}>
      <FlatList
        style={{ flex: 1, paddingHorizontal: 15 }}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Component item={item} onOpen={onOpen} onShowMembers={onShowMembers} />
        )}
      />
    </View>
  );
};
