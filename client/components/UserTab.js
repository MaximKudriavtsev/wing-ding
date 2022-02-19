import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserIcon } from './ui/UserIcon';
import { Row } from './Row';
import { Text } from './ui/Text';
import { THEME } from './theme';

export const UserTab = ({ item, onOpen }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item)}>
      <View style={styles.wrapper}>
        <Row style={styles.row}>
          <UserIcon userId={item.id} iconSize={46} />
          <Text style={{ marginLeft: 15 }}>{item.name}</Text>
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
    borderBottomColor: THEME.DARKER_COLOR,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
});
