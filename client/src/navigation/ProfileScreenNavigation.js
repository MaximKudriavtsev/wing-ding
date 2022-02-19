import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProfileEditScreen } from '../../screens/ProfileEditScreen';
import { UserListScreen } from '../../screens/UserListScreen';
import { EventScreen } from '../../screens/EventScreen';
import { THEME } from '../../components/theme';
import { ME } from '../../components/data';

const ProfileStack = createNativeStackNavigator();

export const ProfileScreenNavigation = () => {
  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        initialParams={{
          user: ME,
        }}
      />
      <ProfileStack.Screen name='UserListScreen' component={UserListScreen} />
      <ProfileStack.Screen name='ProfileEditScreen' component={ProfileEditScreen} />
      <ProfileStack.Screen name='EventDetails' component={EventScreen} />
    </ProfileStack.Navigator>
  );
};
