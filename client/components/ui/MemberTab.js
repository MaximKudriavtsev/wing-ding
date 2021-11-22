import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserIcon } from './UserIcon';
import { Text } from './Text';

export const MemberTab = ({ members, reverse }) => {
  const membersIcons = members
    .slice(0, 3)
    .map(member => (
      <UserIcon
        key={member}
        userId={member}
        style={reverse ? { marginLeft: -10 } : { marginRight: -10 }}
      />
    ));

  return (
    <View style={reverse ? styles.reversedWrapper : styles.wrapper}>
      <View style={styles.icons}>{membersIcons}</View>
      <View style={styles.text} key={'members_count'}>
        <Text bold={true} style={styles.counter}>
          <Text>{members.length}</Text> участника(ов)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-start',
    width: 220,
  },
  reversedWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    width: 220,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
