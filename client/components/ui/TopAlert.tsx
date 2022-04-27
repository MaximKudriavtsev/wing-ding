import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { THEME } from '../theme';
import { Text } from './Text';
import { FontAwesome } from '@expo/vector-icons';

export enum AlertType {
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO',
};

type Props = {
  type: AlertType,
  message: string;
  isVisible: boolean;
};

export const TopAlert: React.FC<Props> = ({ type, message, isVisible }) => {
  let icon = '';
    switch (type) {
      case AlertType.Error:
        icon = THEME.ICON_CROSS;
        break;
      case AlertType.Warning:
        icon = THEME.ICON_WARNING;
        break;
      default:
        icon = THEME.ICON_CHECK;
  }

  return (
    <View style={styles.wrapper}>
      <Modal animationType='fade' transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <FontAwesome name={icon} color={'#fff'} size={24} style={{ width: '15%' }} />
          <Text style={{ width: '85%', textAlign: 'left' }}>{message}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
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
    paddingHorizontal: 25,
    justifyContent: 'space-evenly',
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
