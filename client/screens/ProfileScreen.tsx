import React, { useState, useContext, useEffect } from 'react';
import { api } from '../src/api';
import { UserContext } from '../src/context/UserContext';
import { AlertContext, AlertType } from '../src/context/AlertContext';
import { dateRu } from '../src/utils';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Row } from '../components/ui/Row';
import { Column } from '../components/ui/Column';
import { List } from '../components/ui/List';
import { EventTab } from '../components/event/EventTab';
import { HeaderIcon } from '../components/ui/HeaderIcon';
import { UserIcon } from '../components/ui/UserIcon';
import { Button, ButtonType } from '../components/ui/Button';
import { ToggleButton } from '../components/ui/ToggleButton';
import { Text } from '../components/ui/Text';
import { SCREEN_STYLE, THEME, PROFILE_STYLE } from '../components/theme';
import { User } from '../src/api/user/types';
import { Event } from '../src/api/event/types';
import { AlertMessages } from '../src/context/AlertContext';
import { IconNames } from '../components/ui/Icon';
import { ProfileHeaderLoader } from '../components/loaders/ProfileHeaderLoader';
import { EventTabLoader } from '../components/loaders/EventTabLoader';

type Props = {
  navigation: any;
  route: any;
};

enum Filter {
  Upcoming = 'UPCOMING',
  Past = 'PAST',
}

export const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userId } = route.params;
  const { authorizedUser } = useContext(UserContext);
  const { showAlertMessage } = useContext(AlertContext);

  const [user, setUser] = useState<User | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.Upcoming);

  const openEventHandler = (event: Event) => {
    if (!user) return;
    navigation.push('EventDetails', { eventId: event.id });
  };

  const showFriendsHandler = () => {
    if (!user) return;
    navigation.push('FriendListScreen', { userId: user.id, title: 'Друзья' });
  };

  const showUpcomingEvents = () => {
    if (!!events) {
      setFilteredEvents(events.filter(event => dateRu(event.date).isAfter(dateRu())));
      setFilter(Filter.Upcoming);
    }
  };

  const showPastEvents = () => {
    if (!!events) {
      setFilteredEvents(events.filter(event => dateRu(event.date).isBefore(dateRu())));
      setFilter(Filter.Past);
    }
  };

  const toggleFriend = () => {
    if (!user) return;
    setIsUserLoading(true);
    api.user[isFriend ? 'deleteFromFriends' : 'addToFriends'](user.id)
      .then(() => {
        setIsFriend(!isFriend);
        setFriendsCount(isFriend ? friendsCount - 1 : friendsCount + 1);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  useEffect(() => {
    setIsUserLoading(true);
    setIsEventLoading(true);
    api.user
      .getUser(userId)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => {
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
      })
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error.response);
      })
      .finally(() => setIsEventLoading(false));
  }, [user]);

  useEffect(() => {
    showUpcomingEvents();
  }, [events]);

  useEffect(() => {
    if (!user || !authorizedUser) return;

    let Header: React.ReactNode;

    if (user.id === authorizedUser.id) {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Edit Profile'
            iconName={IconNames.ICON_EDIT}
            onPress={() => navigation.navigate('ProfileEditScreen')}
          />
          <Item
            title='Create Event'
            iconName={IconNames.ICON_APPEND}
            onPress={() => navigation.navigate('CreateEventScreen')}
          />
        </HeaderButtons>
      );
    } else {
      Header = (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title='Toggle friend'
            iconName={isFriend ? IconNames.ICON_CROSS : IconNames.ICON_CHECK}
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

  const listHeader = (
    <>
      {isUserLoading || !authorizedUser || !user ? (
        <ProfileHeaderLoader />
      ) : (
        <Column style={PROFILE_STYLE.userBar}>
          <Row style={PROFILE_STYLE.userBarRow}>
            <View style={PROFILE_STYLE.userIconWrapper}>
              <UserIcon userPhoto={user.photo} iconSize={THEME.PROFILE_ICON_SIZE} />
            </View>
            <Row style={PROFILE_STYLE.userBarButtons}>
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
      )}
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={filter === Filter.Upcoming}
          style={styles.filterButton}
          onPress={showUpcomingEvents}
        >
          {user && authorizedUser && user.id === authorizedUser.id ? `Мои события` : `События`}
        </ToggleButton>
        <ToggleButton
          isActive={filter === Filter.Past}
          style={styles.filterButton}
          onPress={showPastEvents}
        >
          История событий
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
      <List
        style={styles.listWrapper}
        listHeader={listHeader}
        data={filteredEvents}
        Component={EventTab}
        onOpen={openEventHandler}
        onLoadComponentsCount={5}
        stickyHeader={true}
        isDataLoaded={!isEventLoading}
        OnLoadComponent={EventTabLoader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
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
