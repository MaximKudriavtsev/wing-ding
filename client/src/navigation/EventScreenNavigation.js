import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventListScreen } from '../../screens/EventListScreen';
import { EventScreen } from '../../screens/EventScreen';
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
        headerStyle: { backgroundColor: THEME.BACKGROUND_COLOR },
        headerTintColor: '#fff',
      })}
    >
      <EventStack.Screen name='EventList' component={EventListScreen} />
      <EventStack.Screen name='EventDetails' component={EventScreen} />
    </EventStack.Navigator>
  );
};
