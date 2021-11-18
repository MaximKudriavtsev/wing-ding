import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { LoginScreenNavigation } from './LoginScreenNavigation';
import { EventScreenNavigation } from './EventScreenNavigation';
import { FriendListScreen } from '../../screens/FriendListScreen';
import { THEME } from '../../components/theme';

const BottomTab = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: '8%',
          paddingBottom: '3%',
          paddingTop: '2%',
          backgroundColor: THEME.DARKER_COLOR,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: THEME.FONT_COLOR,
        tabBarInactiveTintColor: THEME.PLACEHOLDER_COLOR,
      })}
    >
      <BottomTab.Screen
        name='Profile'
        component={LoginScreenNavigation}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={THEME.ICON_USER} size={25} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name='Events'
        component={EventScreenNavigation}
        options={{
          tabBarLabel: 'События',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={THEME.ICON_SEARCH} size={25} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name='Friends'
        component={FriendListScreen}
        options={{
          tabBarLabel: 'Друзья',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name={THEME.ICON_FRIENDS} size={25} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
