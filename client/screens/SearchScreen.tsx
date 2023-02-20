import React, { useEffect, useState } from 'react';
import { Row } from '../components/Row';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '../components/ui/TextInput';
import { ToggleButton } from '../components/ui/ToggleButton';
import { List } from '../components/List';
import { UserTab } from '../components/UserTab';
import { EventTab } from '../components/EventTab';
import { Loader } from '../components/ui/Loader';
import { SCREEN_STYLE, THEME } from '../components/theme';
import { api } from '../src/api';
import { Event } from '../src/api/event/types';
import { User } from '../src/api/user/types';

type Props = {
  navigation: any;
};

enum SearchedType {
  Events = 'EVENTS',
  Users = 'USERS',
}

const MIN_SEARCH_STRING_LENGTH = 3;

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [searchedType, setSearchedType] = useState<SearchedType>(SearchedType.Users);
  const [foundItems, setFoundItems] = useState<User[] | Event[]>([]);

  const openEventHandler = (event: Event) => {
    navigation.push('EventDetails', { eventId: event.id });
  };

  const openProfileHandler = (userId: string) => {
    navigation.push('ProfileScreen', { userId });
  };

  const showEvents = () => {
    setFoundItems([]);
    setSearchedType(SearchedType.Events);
  };

  const showUsers = () => {
    setFoundItems([]);
    setSearchedType(SearchedType.Users);
  };

  useEffect(() => {
    if (searchString.length < MIN_SEARCH_STRING_LENGTH) return;
    setIsLoading(true);
    if (searchedType === SearchedType.Events) {
      api.event
        .searchEvent(searchString)
        .then(({ data }) => {
          setFoundItems(data.events);
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => setIsLoading(false));
    } else {
      api.user
        .searchUser(searchString)
        .then(({ data }) => {
          setFoundItems(data.users);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchedType, searchString]);

  const searchBar = (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        iconName={THEME.ICON_SEARCH}
        placeholder={'Поиск...'}
        autoCapitalize={'sentences'}
        onChangeText={setSearchString}
      />
      <Row style={styles.filterRow}>
        <ToggleButton
          isActive={searchedType === SearchedType.Users}
          style={styles.filterButton}
          onPress={showUsers}
        >
          Пользователи
        </ToggleButton>
        <ToggleButton
          isActive={searchedType === SearchedType.Events}
          style={styles.filterButton}
          onPress={showEvents}
        >
          События
        </ToggleButton>
      </Row>
    </View>
  );

  return (
    <View style={{ ...SCREEN_STYLE.wrapper, ...styles.wrapper }}>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          data={foundItems}
          Component={searchedType === SearchedType.Events ? EventTab : UserTab}
          onOpen={searchedType === SearchedType.Events ? openEventHandler : openProfileHandler}
          emptyText={'К сожалению, ничего не найдено'}
          style={
            searchedType === SearchedType.Events
              ? { paddingHorizontal: 15 }
              : { paddingHorizontal: 0 }
          }
          listHeader={searchBar}
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

  searchBar: {
    backgroundColor: THEME.BACKGROUND_COLOR,
    paddingBottom: 0,
    alignItems: 'flex-start',
  },

  searchInput: {
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
