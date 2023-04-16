import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import {
  DateTimePickerEvent,
  default as DefaultDateTimePicker,
} from '@react-native-community/datetimepicker';
import { THEME } from '../theme';
import { Button, ButtonType } from '../ui/Button';
import { OperatingSystemType, OPERATING_SYSTEM } from '../../src/config';

export enum DateTimePickerType {
  Date = 'date',
  Time = 'time',
}

type Props = {
  date?: Date;
  isVisible?: boolean;
  type: DateTimePickerType;
  onClose: () => void;
  onSubmit: (dateTime: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

export const DateTimePicker: React.FC<Props> = ({
  date,
  isVisible,
  type,
  onClose,
  onSubmit,
  minimumDate,
  maximumDate,
}) => {
  const today = new Date();
  const [pickedDateTime, setPickedDateTime] = useState(date || today);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    setPickedDateTime(date || today);
    if (OPERATING_SYSTEM === OperatingSystemType.Android) {
      if (event.type === 'set') {
        onClose();
        onSubmit(date || today);
      } else {
        onClose();
      }
    }
  };

  return OPERATING_SYSTEM === OperatingSystemType.Ios ? (
    <>
      <Modal visible={isVisible} transparent={true} animationType='slide'>
        <View style={styles.picker}>
          <DefaultDateTimePicker
            value={pickedDateTime}
            mode={type}
            display='spinner'
            locale='ru-RU'
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={onChange}
          />
          <View style={styles.buttonsRow}>
            <Button
              style={styles.rejectButton}
              type={ButtonType.Secondary}
              fontColor='red'
              onPress={onClose}
            >
              {'Отменить'}
            </Button>
            <Button
              style={styles.confirmButton}
              type={ButtonType.Primary}
              onPress={() => onSubmit(pickedDateTime)}
            >
              {'Принять'}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  ) : (
    <>
      {isVisible && (
        <DefaultDateTimePicker
          value={pickedDateTime}
          mode={type}
          locale='ru-RU'
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    bottom: 100,
    marginHorizontal: 15,
    display: 'flex',
    padding: 20,
    borderRadius: 15,
    backgroundColor: THEME.BACKGROUND_COLOR,
    shadowColor: THEME.BRIGHTER_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonsRow: {
    position: 'relative',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    width: 120,
  },
  rejectButton: {
    width: 100,
    color: 'red',
  },
});
