import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonType } from '../../components/ui/Button';
import { Event } from '../../src/api/event/types';
import { Text } from '../ui/Text';
import { EVENT_SHEET_STYLE, THEME } from '../theme';
import { dateRu } from '../../src/utils';
import { Icon, IconNames } from '../ui/Icon';

type Props = {
  event: Event;
  toggleMember: () => void;
};

export const EventScreenSheet: React.FC<Props> = ({ event, toggleMember }) => (
  <View style={EVENT_SHEET_STYLE.wrapper}>
    <Text bold={true} style={styles.title}>
      {event.title}
    </Text>
    <Text style={styles.place}>
      <Icon style={EVENT_SHEET_STYLE.icon} name={IconNames.ICON_LOCATION} size={18} />
      {`  ${event.place}`}
    </Text>
    <Text style={styles.date}>
      <Icon style={EVENT_SHEET_STYLE.icon} name={IconNames.ICON_CLOCK} size={16} />
      {`  ${dateRu(event.date).format('DD.MM')} начало в ${dateRu(event.date).format('HH:mm')}`}
    </Text>
    <Button
      type={event.isMember ? ButtonType.Secondary : ButtonType.Primary}
      style={EVENT_SHEET_STYLE.button}
      onPress={toggleMember}
    >
      {event.isMember ? 'Отказаться от участия' : 'Принять участие'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  title: { fontSize: 24, marginBottom: 10 },
  place: {
    color: THEME.FONT_COLOR,
    fontSize: 18,
  },
  date: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 16,
  },
});
