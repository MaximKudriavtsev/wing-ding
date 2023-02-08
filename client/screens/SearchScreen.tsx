import React, { useEffect, useState } from 'react';
import { Row } from '../components/Row';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '../components/ui/TextInput';
import { ToggleButton } from '../components/ui/ToggleButton';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { EventTab } from '../components/EventTab';
import { SCREEN_STYLE, THEME } from '../components/theme';
import { api } from '../src/api';
import { Event } from '../src/api/event/types';
import { User } from '../src/api/user/types';

type Props = {
  navigation: any;
};

enum Filter {
  Events = 'EVENTS',
  Users = 'USERS',
}

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [searchString, setSearchString] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.Users);
  const [finds, setFinds] = useState<User[] | Event[]>([]);

  const MIN_SEARCH_STRING_LENGTH = 3;

  const openEventHandler = (event: Event) => {
    navigation.push('EventDetails', { eventId: event.id });
  };

  const openProfileHandler = (userId: string) => {
    navigation.push('ProfileScreen', { userId });
  };

  const showEvents = () => {
    setFinds([]);
    setFilter(Filter.Events);
  };

  const showUsers = () => {
    setFinds([]);
    setFilter(Filter.Users);
  };

  useEffect(() => {
    if (searchString.length < MIN_SEARCH_STRING_LENGTH) return;
    if (filter === Filter.Events) {
      api.event
        .searchEvent(searchString)
        .then(({ data }) => {
          setFinds(data.events);
        })
        .catch(error => {
          console.log(error.response);
        });
    } else {
      api.user
        .searchUser(searchString)
        .then(({ data }) => {
          setFinds(data.users);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [filter, searchString]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Wing-Ding',
    });
  }, [navigation]);

  return (
    <View style={{ ...SCREEN_STYLE.wrapper, ...styles.wrapper }}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          iconName={THEME.ICON_SEARCH}
          placeholder={'Поиск...'}
          autoCapitalize={'sentences'}
          onChangeText={(name: string) => {
            setSearchString(name);
          }}
        />
        <Row style={styles.filterRow}>
          <ToggleButton
            isActive={filter === Filter.Users}
            style={styles.filterButton}
            onPress={showUsers}
          >
            Пользователи
          </ToggleButton>
          <ToggleButton
            isActive={filter === Filter.Events}
            style={styles.filterButton}
            onPress={showEvents}
          >
            События
          </ToggleButton>
        </Row>
      </View>
      <List
        data={finds}
        Component={filter === Filter.Events ? EventTab : UserTab}
        onOpen={filter === Filter.Events ? openEventHandler : openProfileHandler}
        emptyText={'К сожалению, ничего не найдено'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingTop: 0,
  },

  searchBar: {
    backgroundColor: THEME.DARKER_COLOR,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },

  searchInput: {
    backgroundColor: THEME.BACKGROUND_COLOR,
    margin: 15,
    marginBottom: 30,
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
