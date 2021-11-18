import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserIcon } from './UserIcon';
import { Text } from './Text';

export const MemberTab = ({ members }) => {
  const membersIcons = [];

  for (let i = 0; i < members.length; i++) {
    if (i >= 3) break;
    membersIcons.push(<UserIcon key={i} userId={members[i]} style={{ right: 20 * i }} />);
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
