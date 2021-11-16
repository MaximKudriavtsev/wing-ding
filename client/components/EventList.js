import React from 'react';
import { View, FlatList } from 'react-native';
import { SCREEN_STYLE } from './theme';
import { EventTab } from './EventTab';

export const EventList = ({ data, onOpen }) => {
  return (
    <View style={SCREEN_STYLE.listWrapper}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        kayExtractor={event => event.id.toString()}
        renderItem={({ item }) => <EventTab event={item} onOpen={onOpen} />}
      />
    </View>
  );
};
