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
import { CommentListScreen } from '../../screens/CommentListScreen';
import { THEME } from '../../components/theme';

const SearchStack = createNativeStackNavigator();

const setScreenOptions = () => ({
  headerTitleStyle: {
    fontFamily: THEME.BOLD_FONT,
    fontSize: THEME.HEADER_FONT_SIZE,
  },
  headerStyle: { backgroundColor: THEME.BACKGROUND_COLOR },
  headerShadowVisible: false,
  headerTintColor: THEME.FONT_COLOR,
  headerBackVisible: false,
});

export const SearchScreenNavigation = () => {
  return (
    <SearchStack.Navigator screenOptions={setScreenOptions}>
      <SearchStack.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{ title: 'Wing-Ding' }}
      />
      <SearchStack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title: '' }} />
      <SearchStack.Screen name='FriendListScreen' component={FriendListScreen} />
      <SearchStack.Screen name='MemberListScreen' component={MemberListScreen} />
      <SearchStack.Screen
        name='ProfileEditScreen'
        component={ProfileEditScreen}
        options={{ title: 'Редактировать профиль' }}
      />
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
      <SearchStack.Screen
        name='CommentListScreen'
        component={CommentListScreen}
        options={{ title: 'Комментарии' }}
      />
    </SearchStack.Navigator>
  );
};
