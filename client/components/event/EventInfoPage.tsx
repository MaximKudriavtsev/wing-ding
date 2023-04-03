import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Event } from '../../src/api/event/types';
import { Button, ButtonType } from '../ui/Button';
import { Text } from '../ui/Text';
import { THEME } from '../theme';
import { dateRu } from '../../src/utils';
import { Icon } from '../ui/Icon';

type Props = {
  event: Event;
};

export const EventInfoPage: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 24 }} bold={true}>
        {event.title}
      </Text>
      <View>
        <View style={styles.infoRow}>
          <Icon name={THEME.ICON_CLOCK} size={28} style={styles.icon} />
          <View style={styles.infoText}>
            <Text style={styles.infoMajorText}>{dateRu(event.date).format('DD.MM.YYYY')}</Text>
            <Text style={styles.infoMinorText}>{dateRu(event.date).format('HH:mm')}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Icon name={THEME.ICON_LOCATION} size={28} style={styles.icon} />
          <View style={styles.infoText}>
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
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: '100%',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
  },
  icon: {
    width: 40,
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  infoMajorText: { fontSize: 18 },
  infoMinorText: { fontSize: 16, color: THEME.PLACEHOLDER_COLOR },
  infoDescription: {
    fontSize: 18,
  },
});
