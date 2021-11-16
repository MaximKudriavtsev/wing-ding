import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';
import { USERS } from '../data';

export const MemberTab = ({ members }) => {
  const membersIcons = [];
  const findUserById = id => {
    return USERS.find(user => user.id == id);
  };
  for (let i = 0; i < members.length; i++) {
    if (i >= 3) break;
    membersIcons.push(
      <ImageBackground
        key={i}
        style={{ ...styles.icon, right: 20 * i }}
        imageStyle={styles.iconImage}
        source={{ uri: findUserById(members[i]).photo }}
      />,
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.text}>
        <Text bold={true} style={styles.counter}>
          <Text>{members.length}</Text> участника(ов)
        </Text>
      </View>
      <View style={styles.icons}>{membersIcons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
    width: 220,
  },
  icons: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '35%',
  },
  icon: {
    position: 'absolute',
    width: 34,
    height: 34,
  },
  iconImage: {
    borderRadius: 50,
    borderColor: THEME.DARKER_COLOR,
    borderWidth: 2,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: '65%',
    height: 34,
  },
  counter: {
    fontSize: 12,
  },
});
