import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { EventScreenNavigation } from './EventScreenNavigation';
import { ProfileScreenNavigation } from './ProfileScreenNavigation';
import { THEME } from '../../components/theme';
import { SearchScreenNavigation } from './SearchScreenNavigation';
import { IconNames } from '../../components/ui/Icon';

const BottomTab = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Events'
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: THEME.BOTTOM_NAVIGATION_BAR_HEIGHT,
          paddingBottom: 20,
          paddingTop: '2%',
          backgroundColor: THEME.BACKGROUND_COLOR,
          borderTopWidth: 1,
          borderTopColor: THEME.DARKER_COLOR,
        },
        tabBarActiveTintColor: THEME.BRIGHTER_COLOR,
        tabBarInactiveTintColor: THEME.PLACEHOLDER_COLOR,
      })}
    >
      <BottomTab.Screen
        name='Search'
        component={SearchScreenNavigation}
        options={{
          tabBarLabel: 'Поиск',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={IconNames.ICON_SEARCH} size={25} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name='Events'
        component={EventScreenNavigation}
        options={{
          tabBarLabel: 'События',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={IconNames.ICON_EVENTS} size={25} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreenNavigation}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={IconNames.ICON_USER} size={25} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
