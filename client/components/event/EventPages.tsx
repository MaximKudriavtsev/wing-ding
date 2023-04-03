import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { MemberListScreen } from '../../screens/MemberListScreen';
import { CommentListScreen } from '../../screens/CommentListScreen';
import { THEME } from '../theme';
import { EventInfoPage } from './EventInfoPage';
import { Event } from '../../src/api/event/types';
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view';
import { Icon } from '../ui/Icon';

type Props = {
  navigation: any;
  route: any;
  event: Event;
};

export const EventPages: React.FC<Props> = ({ navigation, route, event }) => {
  const componentRoute = route;
  const [index, setIndex] = useState<number>(0);

  const routes = [
    { key: 'info', icon: THEME.ICON_INFO },
    { key: 'members', icon: THEME.ICON_USER },
    { key: 'comments', icon: THEME.ICON_COMMENTS },
    { key: 'gallery', icon: THEME.ICON_IMAGE },
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'info':
        return <EventInfoPage event={event} />;
      case 'members':
        return <MemberListScreen route={componentRoute} navigation={navigation} />;
      case 'comments':
        return (
          <CommentListScreen
            route={componentRoute}
            navigation={navigation}
            hasDefaultOffset={false}
          />
        );
      case 'gallery':
        return <Text>Gallery</Text>;
    }
  };

  const renderTabBar = (props: TabBarProps) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: THEME.BRIGHTER_COLOR }}
      style={{ backgroundColor: THEME.BACKGROUND_COLOR }}
      renderIcon={({ route, focused }) => (
        <Icon
          name={route.icon}
          size={26}
          color={focused ? THEME.BRIGHTER_COLOR : THEME.PLACEHOLDER_COLOR}
        />
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};
