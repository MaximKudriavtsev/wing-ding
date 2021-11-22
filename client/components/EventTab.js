import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Row } from './Row';
import { Column } from './Column';
import { DateTab } from './ui/DateTab';
import { MemberTab } from './ui/MemberTab';
import { Text } from './ui/Text';
import { THEME } from './theme';

export const EventTab = ({ event, onOpen }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(event)}>
      <View style={styles.event}>
        <Row style={styles.headerRow}>
          <DateTab date={event.date} />
          <Column style={styles.headerColumn}>
            <Text bold={true} style={styles.title}>
              {event.title}
            </Text>
            <Text style={styles.place}>{event.place}</Text>
          </Column>
        </Row>
        <ImageBackground style={styles.image} source={{ uri: event.img }} />
        <Row style={styles.membersWrapper}>
          <MemberTab reverse={true} members={event.membersIds} />
        </Row>
        <Row style={styles.textWrapper}>
          <Text numberOfLines={2} style={styles.text}>
            {event.text}
          </Text>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  event: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 10,
    marginVertical: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  headerRow: {
    padding: 15,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerColumn: {
    marginLeft: 15,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    color: THEME.FONT_COLOR,
    fontSize: 16,
  },
  place: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 14,
  },
  membersWrapper: {
    padding: 10,
    height: 45,
    justifyContent: 'flex-end',
  },
  textWrapper: {
    padding: 10,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: THEME.PLACEHOLDER_COLOR,
  },
});
