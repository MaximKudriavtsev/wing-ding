import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonType } from '../../components/ui/Button';
import { Event } from '../../src/api/event/types';
import { Text } from '../ui/Text';
import { THEME } from '../theme';
import { dateRu } from '../../src/utils';
import { Icon, IconNames } from '../ui/Icon';

type Props = {
  event: Event;
  toggleMember: () => void;
};

export const EventScreenSheet: React.FC<Props> = ({ event, toggleMember }) => (
  <View style={styles.wrapper}>
    <Text bold={true} style={styles.title}>
      {event.title}
    </Text>
    <Text style={styles.place}>
      <Icon name={IconNames.ICON_LOCATION} size={18} />
      {`  ${event.place}`}
    </Text>
    <Text style={styles.date}>
      <Icon name={IconNames.ICON_CLOCK} size={16} />
      {`  ${dateRu(event.date).format('DD.MM')} начало в ${dateRu(event.date).format('HH:mm')}`}
    </Text>
    <Button
      type={event.isMember ? ButtonType.Secondary : ButtonType.Primary}
      style={styles.button}
      onPress={toggleMember}
    >
      {event.isMember ? 'Отказаться от участия' : 'Принять участие'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    height: 250,
  },
  title: { fontSize: 24, marginBottom: 10 },
  place: {
    color: THEME.FONT_COLOR,
    fontSize: 18,
  },
  date: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 16,
  },
  button: {
    marginVertical: 25,
    borderWidth: 2,
    borderColor: THEME.BUTTON_COLOR,
  },
});
