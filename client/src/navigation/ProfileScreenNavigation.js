import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProfileEditScreen } from '../../screens/ProfileEditScreen';
import { FriendListScreen } from '../../screens/FriendListScreen';
import { MemberListScreen } from '../../screens/MemberListScreen';
import { CreateEventScreen } from '../../screens/CreateEventScreen';
import { EditEventScreen } from '../../screens/EditEventScreen';
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
        headerBackVisible: false,
      })}
    >
      <ProfileStack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        initialParams={{
          userId: authorizedUser.id,
        }}
        options={{ title: '' }}
      />
      <ProfileStack.Screen name='FriendListScreen' component={FriendListScreen} />
      <ProfileStack.Screen name='MemberListScreen' component={MemberListScreen} />
      <ProfileStack.Screen name='ProfileEditScreen' component={ProfileEditScreen} />
      <ProfileStack.Screen name='EventDetails' component={EventScreen} options={{ title: '' }} />
      <ProfileStack.Screen
        name='CreateEventScreen'
        component={CreateEventScreen}
        options={{ title: 'Создать событие' }}
      />
      <ProfileStack.Screen
        name='EditEventScreen'
        component={EditEventScreen}
        options={{ title: 'Изменить событие' }}
      />
    </ProfileStack.Navigator>
  );
};
