import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserIcon } from './UserIcon';
import { Text } from './Text';

export const MemberTab = ({ members, reverse }) => {
  const membersIcons = [];
  const membersTab = [];

  for (let i = 0; i < members.length; i++) {
    if (i >= 3) break;
    membersIcons.push(
      <UserIcon
        key={'icon-' + i}
        userId={members[i]}
        style={reverse ? { marginLeft: -10 } : { marginRight: -10 }}
      />,
    );
  }

  membersTab.push(
    <View key={'member_icons'} style={styles.icons}>
      {membersIcons}
    </View>,
  );

  membersTab.push(
    <View style={styles.text} key={'members_count'}>
      <Text key={'count_wrapper'} bold={true} style={styles.counter}>
        <Text key={'count_text'}>{members.length}</Text> участника(ов)
      </Text>
    </View>,
  );

  return (
    <View key={'members_icons'} style={reverse ? styles.reversedWrapper : styles.wrapper}>
      {reverse ? membersTab.reverse() : membersTab}
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
    flexDirection: 'row',
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
