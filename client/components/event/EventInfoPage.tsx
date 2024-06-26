import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Event } from '../../src/api/event/types';
import { Button, ButtonType } from '../ui/Button';
import { Text } from '../ui/Text';
import { THEME, EVENT_INFO_PAGE_STYLE } from '../theme';
import { dateRu } from '../../src/utils';
import { Icon, IconNames } from '../ui/Icon';

type Props = {
  event: Event;
};

export const EventInfoPage: React.FC<Props> = ({ event }) => {
  return (
    <View style={EVENT_INFO_PAGE_STYLE.wrapper}>
      <Text style={{ fontSize: 24 }} bold={true}>
        {event.title}
      </Text>
      <View>
        <View style={EVENT_INFO_PAGE_STYLE.infoRow}>
          <Icon name={IconNames.ICON_CLOCK} size={28} style={EVENT_INFO_PAGE_STYLE.icon} />
          <View style={EVENT_INFO_PAGE_STYLE.infoText}>
            <Text style={styles.infoMajorText}>{dateRu(event.date).format('DD.MM.YYYY')}</Text>
            <Text style={styles.infoMinorText}>{dateRu(event.date).format('HH:mm')}</Text>
          </View>
        </View>
        <View style={EVENT_INFO_PAGE_STYLE.infoRow}>
          <Icon name={IconNames.ICON_LOCATION} size={28} style={EVENT_INFO_PAGE_STYLE.icon} />
          <View style={EVENT_INFO_PAGE_STYLE.infoText}>
            <Text style={styles.infoMajorText}>{event.place}</Text>
            <Text style={styles.infoMinorText}>Тула</Text>
          </View>
        </View>
      </View>
      <Text style={styles.infoDescription}>{event.text}</Text>

      <Button onPress={() => console.log('Invite')} type={ButtonType.Primary}>
        Пригласить друзей
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  infoMajorText: { fontSize: 18 },
  infoMinorText: { fontSize: 16, color: THEME.PLACEHOLDER_COLOR },
  infoDescription: {
    fontSize: 18,
  },
});
