import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from '../ui/Image';
import { Row } from '../ui/Row';
import { Column } from '../ui/Column';
import { DateTab } from '../ui/DateTab';
import { MemberTab } from '../ui/MemberTab';
import { Text } from '../ui/Text';
import { THEME } from '../theme';
import { Event } from '../../src/api/event/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, IconNames } from '../ui/Icon';

type Props = {
  item: Event;
  onOpen: (event: Event) => void;
  onShowMembers: () => void;
};

export const EventTab: React.FC<Props> = ({ item, onOpen, onShowMembers }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item)}>
      <View style={styles.event}>
        <Image style={styles.image} source={item.img} defaultImage={THEME.EVENT_IMAGE} />
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles.linearGradient}
          start={{ x: 0.5, y: 0.2 }}
        />
        <View style={styles.tabContent}>
          <Row style={styles.activitiesWrapper}>
            <View style={styles.commentsLabel}>
              <Icon name={IconNames.ICON_COMMENTS} size={24} color={THEME.FONT_COLOR} />
              <Text style={{ marginLeft: 12 }} bold={true}>
                {item.commentsCount}
              </Text>
            </View>
            <MemberTab
              style={styles.memberTab}
              membersPhotos={item.membersPhotos}
              membersCount={item.membersCount}
            />
          </Row>
          <Row style={styles.footerRow}>
            <DateTab date={item.date} />
            <Column style={styles.headerColumn}>
              <Text bold={true} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.place}>{item.place}</Text>
            </Column>
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: { position: 'absolute', width: '100%', height: '100%' },
  event: {
    position: 'relative',
    width: '100%',
    height: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    borderRadius: 15,
    marginVertical: 12,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: 250,
  },
  tabContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  footerRow: {
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 'auto',
  },
  headerColumn: {
    marginLeft: 15,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    color: THEME.WHITE_FONT_COLOR,
    fontSize: 18,
  },
  place: {
    color: THEME.PLACEHOLDER_COLOR,
    fontSize: 16,
  },
  activitiesWrapper: {
    position: 'relative',
    paddingVertical: 10,
    height: 65,
    justifyContent: 'space-between',
  },
  commentsLabel: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  textWrapper: {
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: THEME.PLACEHOLDER_COLOR,
  },
  memberTab: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
