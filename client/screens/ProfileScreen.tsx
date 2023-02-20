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
import { Button, ButtonType } from '../components/ui/Button';
import { ToggleButton } from '../components/ui/ToggleButton';
import { Text } from '../components/ui/Text';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE, THEME } from '../components/theme.js';
import { User } from '../src/api/user/types';
import { Event } from '../src/api/event/types';
import { AlertMessages } from '../src/context/AlertContext';

type Props = {
  navigation: any;
  route: any;
};

export const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userId } = route.params;
  const { authorizedUser } = useContext(UserContext);
  const { showAlertMessage } = useContext(AlertContext);

  const [user, setUser] = useState<User | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [isEventLoading, setIsEventLoading] = useState<boolean>(false);
  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');

  const openEventHandler = (event: Event) => {
    if (!user) return;
    navigation.push('EventDetails', { eventId: event.id });
  };

  const showFriendsHandler = () => {
    if (!user) return;
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
    if (!user) return;
    setIsUserLoading(true);
    api.user[isFriend ? 'deleteFromFriends' : 'addToFriends'](user.id)
      .then(() => {
        setIsFriend(!isFriend);
        setFriendsCount(isFriend ? friendsCount - 1 : friendsCount + 1);
        setIsUserLoading(false);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
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
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
        setIsUserLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!user) return;
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
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
        setIsEventLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user || !authorizedUser) return;

    let Header: React.ReactNode;

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

  const listHeader =
    !authorizedUser || !user || isUserLoading ? (
      <View style={styles.userBar}>
        <Loader />
      </View>
    ) : (
      <>
        <Column style={styles.userBar}>
          <Row style={styles.userBarRow}>
            <View style={{ width: '20%' }}>
              <UserIcon userPhoto={user.photo} iconSize={82} />
            </View>
            <Row style={styles.buttonsRow}>
              <Text>{`Событий: ${user.events}`}</Text>
              <Button
                type={ButtonType.Link}
                fontColor={THEME.BUTTON_COLOR}
                onPress={showFriendsHandler}
              >{`Друзей: ${friendsCount}`}</Button>
            </Row>
          </Row>
          <Text>{user.description ? user.description : 'Текст о себе...'}</Text>
        </Column>
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
      </>
    );

  return (
    <View
      style={{
        ...SCREEN_STYLE.wrapper,
        ...styles.wrapper,
      }}
    >
      {isEventLoading ? (
        <Loader />
      ) : (
        <List
          style={styles.listWrapper}
          listHeader={listHeader}
          data={events}
          Component={EventTab}
          onOpen={openEventHandler}
          stickyHeader={true}
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
    height: 150,
    backgroundColor: THEME.BACKGROUND_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  userBarRow: {
    height: 'auto',
    marginBottom: 10,
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
  listWrapper: {
    paddingHorizontal: 15,
  },
});
