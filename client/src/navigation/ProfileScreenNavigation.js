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
import { CommentListScreen } from '../../screens/CommentListScreen';

const ProfileStack = createNativeStackNavigator();

export const ProfileScreenNavigation = () => {
  const { authorizedUser } = useContext(UserContext);

  return (
    <ProfileStack.Navigator
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: THEME.BOLD_FONT,
          fontSize: THEME.HEADER_FONT_SIZE,
        },
        headerStyle: { backgroundColor: THEME.BACKGROUND_COLOR },
        headerShadowVisible: false,
        headerTintColor: THEME.FONT_COLOR,
        headerBackTitle: '',
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
      <ProfileStack.Screen
        name='ProfileEditScreen'
        component={ProfileEditScreen}
        options={{ title: 'Редактировать профиль' }}
      />
      <ProfileStack.Screen
        name='EventDetails'
        component={EventScreen}
        options={{ headerShown: false }}
      />
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
      <ProfileStack.Screen
        name={'CommentListScreen'}
        component={CommentListScreen}
        options={{ title: 'Комментарии' }}
      />
    </ProfileStack.Navigator>
  );
};
