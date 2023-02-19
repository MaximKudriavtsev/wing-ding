import React, { useState, useContext, useEffect } from 'react';
import { api } from '../src/api';
import { UserContext } from '../src/context/UserContext';
import { AlertContext, AlertType } from '../src/context/AlertContext';
import { dateRu } from '../src/utils';
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
  const { showAlertMessage } = useContext(AlertContext);

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
    navigation.push('FriendListScreen', { userId: user.id, title: 'Друзья' });
  };

  const showAllEvents = () => {
    if (!!events) {
      setEvents(events);
      setFilter('all');
    }
  };

  const showUpcomingEvents = () => {
    if (!!events) {
      setEvents(events.filter(event => dateRu(event.date).isAfter(dateRu())));
      setFilter('upcoming');
    }
  };

  const toggleFriend = () => {
    setIsUserLoading(true);
    api.user[isFriend ? 'deleteFromFriends' : 'addToFriends'](user.id)
      .then(() => {
        setIsFriend(!isFriend);
        setFriendsCount(isFriend ? friendsCount - 1 : friendsCount + 1);
        setIsUserLoading(false);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownErrorError, AlertType.Error);
        console.log(error.response);
        setIsUserLoading(false);
      });
  };

  useEffect(() => {
    setIsUserLoading(true);
    api.user
      .getUser(userId)
      .then(({ data }) => {
        setUser(data.user);
        setIsUserLoading(false);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownErrorError, AlertType.Error);
        console.log(error.response);
        setIsUserLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!user.id) return;
    setIsEventLoading(true);
    setIsFriend(user.isFriend);
    setFriendsCount(+user.friends);
    api.user
      .getUserEvents(userId)
      .then(({ data }) => {
        setEvents(data.events);
        setIsEventLoading(false);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownErrorError, AlertType.Error);
        console.log(error.response);
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
            onPress={() => navigation.navigate('CreateEventScreen')}
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
                type={'link'}
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
        <List
          data={events}
          Component={EventTab}
          onOpen={openEventHandler}
          style={{ paddingHorizontal: 15 }}
        />
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
