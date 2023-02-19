import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from './ui/Image';
import { Row } from './Row';
import { Column } from './Column';
import { DateTab } from './ui/DateTab';
import { MemberTab } from './ui/MemberTab';
import { Text } from './ui/Text';
import { THEME } from './theme';
import { Event } from '../src/api/event/types';

type Props = {
  item: Event;
  onOpen: (event: Event) => void;
  onShowMembers: () => void;
};

export const EventTab: React.FC<Props> = ({ item, onOpen, onShowMembers }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item)}>
      <View style={styles.event}>
        <Row style={styles.headerRow}>
          <DateTab date={item.date} />
          <Column style={styles.headerColumn}>
            <Text bold={true} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.place}>{item.place}</Text>
          </Column>
        </Row>
        <Image style={styles.image} source={item.img} defaultImage={THEME.EVENT_IMAGE} />
        <Row style={styles.activitiesWrapper}>
          <View style={styles.commentsLabel}>
            <FontAwesome name={THEME.ICON_COMMENTS} size={24} color={THEME.FONT_COLOR} />
            <Text style={{ marginLeft: 12 }}>{item.commentsCount}</Text>
          </View>
          <MemberTab
            reverse={true}
            membersPhotos={item.membersPhotos}
            membersCount={item.membersCount}
            onOpen={onShowMembers}
          />
        </Row>
        <Row style={styles.textWrapper}>
          <Text numberOfLines={3} style={styles.text}>
            {item.text}
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
  activitiesWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 55,
    justifyContent: 'space-between',
  },
  commentsLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
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
