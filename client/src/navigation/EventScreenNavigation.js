import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventListScreen } from '../../screens/EventListScreen';
import { EventScreen } from '../../screens/EventScreen';
import { FriendListScreen } from '../../screens/FriendListScreen';
import { MemberListScreen } from '../../screens/MemberListScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { THEME } from '../../components/theme';

const EventStack = createNativeStackNavigator();

export const EventScreenNavigation = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: THEME.BOLD_FONT,
          fontSize: THEME.HEADER_FONT_SIZE,
        },
        headerStyle: { backgroundColor: THEME.BACKGROUND_COLOR },
        headerShadowVisible: false,
        headerTintColor: THEME.FONT_COLOR,
      })}
    >
      <EventStack.Screen name='EventList' component={EventListScreen} />
      <EventStack.Screen name='EventDetails' component={EventScreen} options={{ title: '' }} />
      <EventStack.Screen name='FriendListScreen' component={FriendListScreen} />
      <EventStack.Screen name='MemberListScreen' component={MemberListScreen} />
      <EventStack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title: '' }} />
    </EventStack.Navigator>
  );
};
