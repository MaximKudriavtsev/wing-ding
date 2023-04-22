import React, { useState } from 'react';
import { Text } from '../ui/Text';
import { MemberListScreen } from '../../screens/MemberListScreen';
import { CommentListScreen } from '../../screens/CommentListScreen';
import { THEME } from '../theme';
import { EventInfoPage } from './EventInfoPage';
import { Event } from '../../src/api/event/types';
import { TabView, TabBar, TabBarProps, Route } from 'react-native-tab-view';
import { Icon, IconNames } from '../ui/Icon';
import { EventInfoPageLoader } from '../loaders/EventInfoPageLoader';

type Props = {
  navigation: any;
  route: any;
  event: Event | null;
};

interface RouteType extends Route {
  icon: IconNames;
}

type RenderSceneProps = {
  route: RouteType;
};

export const EventPages: React.FC<Props> = ({ navigation, route, event }) => {
  const componentRoute = route;
  const [index, setIndex] = useState<number>(0);

  const routes: RouteType[] = [
    { key: 'info', icon: IconNames.ICON_INFO },
    { key: 'members', icon: IconNames.ICON_USER },
    { key: 'comments', icon: IconNames.ICON_COMMENTS },
    { key: 'gallery', icon: IconNames.ICON_IMAGE },
  ];

  const renderScene = (props: RenderSceneProps) => {
    switch (props.route.key) {
      case 'info':
        return event ? <EventInfoPage event={event} /> : <EventInfoPageLoader />;
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

  const renderTabBar = (props: TabBarProps<RouteType>) => (
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
