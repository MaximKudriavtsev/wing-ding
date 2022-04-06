import React, { useState, useContext, useEffect } from 'react';
import { userApi } from '../src/api/user/apiProduction';
import { UserContext } from '../src/context/UserContext';
import { dateRu, camelizeKeys } from '../src/utils';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { List } from '../components/List';
import { EventTab } from '../components/EventTab';
import { HeaderIcon } from '../components/HeaderIcon';
import { UserIcon } from '../components/ui/UserIcon';
import { Button } from '../components/ui/Button';
import { ToggleButton } from '../components/ui/ToggleButton';
import { Text } from '../components/ui/Text';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const ProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const { authorizedUser } = useContext(UserContext);

  const [user, setUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  const openEventHandler = event => {
    navigation.push('EventDetails', { eventId: event.id });
  };

  const showFriendsHandler = () => {
    navigation.push('UserListScreen', { userId: user.id, title: 'Друзья' });
  };

  const showAllEvents = () => {
    setEvents(events);
    setFilter('all');
  };

  const showUpcomingEvents = () => {
    setEvents(events.filter(event => dateRu(event.date).isAfter(dateRu())));
    setFilter('upcoming');
  };

  const toggleFriend = () => {
    setIsUserLoading(true);
    if (isFriend) {
      userApi
        .deleteFromFriends(user.id)
        .then(response => {
          setIsFriend(false);
          setFriendsCount(friendsCount - 1);
          setIsUserLoading(false);
        })
        .catch(error => console.log(error));
    } else {
      userApi
        .addToFriends(user.id)
        .then(response => {
          setIsFriend(true);
          setFriendsCount(friendsCount + 1);
          setIsUserLoading(false);
        })
        .catch(error => console.log(error.response));
    }
  };

  useEffect(() => {
    setIsUserLoading(true);
    userApi
      .getUser(userId)
      .then(response => {
        setUser(camelizeKeys(response.data.user));
        setIsUserLoading(false);
      })
      .catch(error => console.log(error.response));
  }, [userId]);

  useEffect(() => {
    setIsEventLoading(true);
    if (!user.id) return;
    setIsFriend(user.isFriend);
    setFriendsCount(+user.friends);
    userApi
      .getUserEvents(userId)
      .then(response => {
        setEvents(response.data.events.map(camelizeKeys));
        setIsEventLoading(false);
      })
      .catch(error => {
        setIsEventLoading(false);
      });
  }, [user.id]);

  useEffect(() => {
    if (!user.id) return;
    let Header;
    if (user.id === authorizedUser.id) {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Edit Profile'
            iconName={THEME.ICON_EDIT}
            onPress={() => navigation.navigate('ProfileEditScreen')}
          />
          <Item
            title='Create Event'
            iconName={THEME.ICON_APPEND}
            onPress={() => console.log('Create Event')}
          />
        </HeaderButtons>
      );
    } else {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Toggle friend'
            iconName={isFriend ? THEME.ICON_CROSS : THEME.ICON_CHECK}
            onPress={() => toggleFriend()}
          />
        </HeaderButtons>
      );
    }

    navigation.setOptions({
      headerRight: () => Header,
      title: `${user.firstName} ${user.lastName}`,
    });
  }, [isUserLoading, isFriend]);

  useEffect(() => {}, [friendsCount]);
  return (
    <View
      style={{
        ...SCREEN_STYLE.wrapper,
        ...styles.wrapper,
      }}
    >
      {isUserLoading ? (
        <View style={styles.userBar}>
          <Loader />
        </View>
      ) : (
        <Column style={styles.userBar}>
          <Row style={{ height: 'auto', marginBottom: 10 }}>
            <View style={{ width: '20%' }}>
              <UserIcon userPhoto={user.photo} iconSize={82} />
            </View>
            <Row style={styles.buttonsRow}>
              <Text>{`Событий: ${user.events}`}</Text>
              <Button
                backgroundColor={'transparent'}
                fontColor={THEME.BUTTON_COLOR}
                onPress={showFriendsHandler}
              >{`Друзей: ${friendsCount}`}</Button>
            </Row>
          </Row>
          <Text>{user.description ? user.description : 'Текст о себе...'}</Text>
        </Column>
      )}
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={filter === 'all'}
          style={styles.filterButton}
          onPress={showAllEvents}
        >
          {user.id === authorizedUser.id ? `Мои события` : `События`}
        </ToggleButton>
        <ToggleButton
          isActive={filter === 'upcoming'}
          style={styles.filterButton}
          onPress={showUpcomingEvents}
        >
          Будущие события
        </ToggleButton>
      </Row>
      {isEventLoading ? (
        <Loader />
      ) : (
        <List data={events} Component={EventTab} onOpen={openEventHandler} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  userBar: {
    height: 130,
    backgroundColor: THEME.DARKER_COLOR,
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  buttonsRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 'auto',
    width: '80%',
  },
  filterRow: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'black',
  },
  filterButton: {
    width: '50%',
    height: '100%',
  },
});
