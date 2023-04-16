import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from '../ui/Image';
import { Row } from '../ui/Row';
import { Column } from '../ui/Column';
import { DateTab } from '../ui/DateTab';
import { MemberTab } from '../ui/MemberTab';
import { Text } from '../ui/Text';
import { THEME, EVENT_TAB_STYLE } from '../theme';
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
      <View style={EVENT_TAB_STYLE.event}>
        <Image style={EVENT_TAB_STYLE.image} source={item.img} defaultImage={THEME.EVENT_IMAGE} />
        <LinearGradient
          colors={['transparent', '#000']}
          style={EVENT_TAB_STYLE.linearGradient}
          start={{ x: 0.5, y: 0.2 }}
        />
        <View style={EVENT_TAB_STYLE.tabContent}>
          <Row style={EVENT_TAB_STYLE.activitiesWrapper}>
            <View style={EVENT_TAB_STYLE.commentsLabel}>
              <Icon name={IconNames.ICON_COMMENTS} size={24} color={THEME.FONT_COLOR} />
              <Text style={{ marginLeft: 12 }} bold={true}>
                {item.commentsCount}
              </Text>
            </View>
            <MemberTab
              style={EVENT_TAB_STYLE.memberTab}
              membersPhotos={item.membersPhotos}
              membersCount={item.membersCount}
            />
          </Row>
          <Row style={EVENT_TAB_STYLE.footerRow}>
            <DateTab date={item.date} />
            <Column style={EVENT_TAB_STYLE.headerColumn}>
              <Text bold={true} style={EVENT_TAB_STYLE.title}>
                {item.title}
              </Text>
              <Text style={EVENT_TAB_STYLE.place}>{item.place}</Text>
            </Column>
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
};
