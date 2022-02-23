import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProfileEditScreen } from '../../screens/ProfileEditScreen';
import { UserListScreen } from '../../screens/UserListScreen';
import { EventScreen } from '../../screens/EventScreen';
import { THEME } from '../../components/theme';

const ProfileStack = createNativeStackNavigator();

export const ProfileScreenNavigation = () => {
  const { authorizedUser } = useContext(UserContext);

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
          user: authorizedUser,
        }}
      />
      <ProfileStack.Screen name='UserListScreen' component={UserListScreen} />
      <ProfileStack.Screen name='ProfileEditScreen' component={ProfileEditScreen} />
      <ProfileStack.Screen name='EventDetails' component={EventScreen} />
    </ProfileStack.Navigator>
  );
};
