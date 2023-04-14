import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { THEME } from '../theme';
import { Icon, IconNames } from './Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dateRu } from '../../src/utils';
import { DateTimePicker, DateTimePickerType } from '../pickers/DateTimePicker';

type Props = {
  iconColor?: 'string';
  iconSize?: number;
  type: DateTimePickerType;
  dateTime?: Date;
  onChange?: (dateTime: Date) => void;
  style?: object;
  minimumDate?: Date;
  maximumDate?: Date;
};

export const DateTimeInput: React.FC<Props> = ({
  iconColor = THEME.PLACEHOLDER_COLOR,
  iconSize = 20,
  type,
  dateTime = new Date(),
  onChange,
  style,
  minimumDate,
  maximumDate,
}) => {
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [pickedDateTime, setPickedDateTime] = useState(dateTime);

  const onSetDateTime = (dateTime: Date) => {
    setPickedDateTime(dateTime);
    setDateTimePickerVisible(false);
  };

  useEffect(() => {
    onChange ? onChange(pickedDateTime) : null;
  }, [pickedDateTime]);

  let dateTimeString: string;
  let icon: IconNames;

  if (type === DateTimePickerType.Date) {
    icon = IconNames.ICON_CALENDAR;
    dateTimeString = dateRu(pickedDateTime).format('DD/MM/YYYY');
  } else {
    icon = IconNames.ICON_CLOCK;
    dateTimeString = dateRu(pickedDateTime).format('HH:mm');
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ ...style, ...styles.inputSection }}
        onPress={() => setDateTimePickerVisible(true)}
      >
        <Icon style={styles.inputIcon} name={icon} color={iconColor} size={iconSize} />
        <Text style={styles.input}>{dateTimeString}</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        type={type}
        onClose={() => setDateTimePickerVisible(false)}
        onSubmit={onSetDateTime}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        date={pickedDateTime}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputIcon: {
    padding: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: THEME.FONT_COLOR,
    fontFamily: THEME.REGULAR_FONT,
    backgroundColor: 'transparent',
  },
});
