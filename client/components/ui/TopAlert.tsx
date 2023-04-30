import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { AlertType } from '../../src/context/AlertContext';
import { THEME } from '../theme';
import { Text } from './Text';
import { Icon, IconNames } from './Icon';

type Props = {
  type: AlertType;
  message: string;
  isVisible: boolean;
};

export const TopAlert: React.FC<Props> = ({ type, message, isVisible }) => {
  let icon = IconNames.ICON_WARNING;
  switch (type) {
    case AlertType.Error:
      icon = IconNames.ICON_CROSS;
      break;
    case AlertType.Warning:
      icon = IconNames.ICON_WARNING;
      break;
    default:
      icon = IconNames.ICON_CHECK;
  }

  return (
    <View style={styles.wrapper}>
      <Modal animationType='fade' transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <Icon name={icon} color={THEME.FONT_COLOR} size={24} style={{ width: '15%' }} />
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
  },
  modal: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    marginTop: THEME.STATUS_BAR_HEIGHT,
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
