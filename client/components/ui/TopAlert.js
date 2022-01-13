import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';
import { FontAwesome } from '@expo/vector-icons';

export const TopAlert = ({ iconName, message, isVisible }) => {
  return (
    <View style={styles.wrapper}>
      <Modal animationType='fade' transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <FontAwesome name={iconName} color={'#fff'} size={24} />
          <Text>{message}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  modal: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: THEME.BRIGHTER_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
