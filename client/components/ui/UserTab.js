import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserIcon } from './UserIcon';
import { Row } from './Row';
import { Text } from './Text';

export const UserTab = ({ item, onOpen }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item.id)}>
      <View style={styles.wrapper}>
        <Row style={styles.row}>
          <UserIcon userPhoto={item.photo} iconSize={46} />
          <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    padding: 5,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  name: { marginLeft: 15 },
});
