import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventListScreen } from '../../screens/EventListScreen';
import { EventScreen } from '../../screens/EventScreen';
import { UserListScreen } from '../../screens/UserListScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { THEME } from '../../components/theme';

const EventStack = createNativeStackNavigator();

export const EventScreenNavigation = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: THEME.BOLD_FONT,
          fontSize: 22,
        },
        headerStyle: { backgroundColor: THEME.DARKER_COLOR },
        headerShadowVisible: false,
        headerTintColor: '#fff',
      })}
    >
      <EventStack.Screen name='EventList' component={EventListScreen} />
      <EventStack.Screen name='EventDetails' component={EventScreen} />
      <EventStack.Screen name='UserListScreen' component={UserListScreen} />
      <EventStack.Screen name='ProfileScreen' component={ProfileScreen} />
    </EventStack.Navigator>
  );
};
