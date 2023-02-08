import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '../../screens/SearchScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProfileEditScreen } from '../../screens/ProfileEditScreen';
import { FriendListScreen } from '../../screens/FriendListScreen';
import { MemberListScreen } from '../../screens/MemberListScreen';
import { EditEventScreen } from '../../screens/EditEventScreen';
import { EventScreen } from '../../screens/EventScreen';
import { CreateEventScreen } from '../../screens/CreateEventScreen';
import { THEME } from '../../components/theme';

const SearchStack = createNativeStackNavigator();

export const SearchScreenNavigation = () => {
  return (
    <SearchStack.Navigator
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
      <SearchStack.Screen name='SearchScreen' component={SearchScreen} options={{titlele: 'Поиск'}} />
      <SearchStack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title: '' }} />
      <SearchStack.Screen name='FriendListScreen' component={FriendListScreen} />
      <SearchStack.Screen name='MemberListScreen' component={MemberListScreen} />
      <SearchStack.Screen name='ProfileEditScreen' component={ProfileEditScreen} />
      <SearchStack.Screen name='EventDetails' component={EventScreen} options={{ title: '' }} />
      <SearchStack.Screen
        name='EditEventScreen'
        component={EditEventScreen}
        options={{ title: 'Изменить событие' }}
      />
      <SearchStack.Screen
        name='CreateEventScreen'
        component={CreateEventScreen}
        options={{ title: 'Создать событие' }}
      />
    </SearchStack.Navigator>
  );
};
