import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../components/ui/HeaderIcon';
import { View } from 'react-native';
import { SCREEN_STYLE } from '../components/theme';
import { List } from '../components/ui/List';
import { EventTab } from '../components/event/EventTab';
import { IconNames } from '../components/ui/Icon';

export const EventListScreen = ({ navigation }) => {
  const openEventHandler = event => {
    navigation.push('EventDetails', { eventId: event.id });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Filter'
            iconName={IconNames.ICON_FILTER}
            onPress={() => console.log('filter')}
          />
        </HeaderButtons>
      ),
      title: 'Wing-Ding',
    });
  }, [navigation]);
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <List
        data={[]}
        Component={EventTab}
        onOpen={openEventHandler}
        style={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};
