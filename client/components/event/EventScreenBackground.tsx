import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from '../../components/ui/Image';
import { UserIcon } from '../../components/ui/UserIcon';
import { MemberTab } from '../../components/ui/MemberTab';
import { Row } from '../ui/Row';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { TouchableOpacity } from 'react-native';
import { THEME } from '../../components/theme';
import { Event } from '../../src/api/event/types';
import { ButtonType } from '../../components/ui/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, IconNames } from '../ui/Icon';
import { Skeleton } from '../loaders/Skeleton';

type Props = {
  event: Event | null;
  onShowMembersHandler: () => void;
  onOpenCommentsScreen: () => void;
  onOpenOptionsSheet: () => void;
  onGoBack: () => void;
};

export const EventScreenBackground: React.FC<Props> = ({
  event,
  onShowMembersHandler,
  onOpenCommentsScreen,
  onOpenOptionsSheet,
  onGoBack,
}) => (
  <View style={styles.imageBackground}>
    <Image
      style={styles.image}
      source={event ? event.img : undefined}
      defaultImage={THEME.EVENT_IMAGE}
    />
    <LinearGradient
      colors={['transparent', '#000']}
      style={styles.gradient}
      start={{ x: 0.5, y: 0.2 }}
    />
    <View style={styles.wrapper}>
      <Row style={styles.topRow}>
        <Button
          style={{
            ...styles.rowButton,
            paddingRight: 3,
          }}
          type={ButtonType.Round}
          onPress={onGoBack}
          icon={<Icon name={IconNames.ICON_ARROW_BACK} size={20} color={THEME.FONT_COLOR} />}
        />
        {event && event.isHost ? (
          <Button
            style={{
              ...styles.rowButton,
              paddingTop: 2,
            }}
            type={ButtonType.Round}
            onPress={onOpenOptionsSheet}
            icon={<Icon name={IconNames.ICON_OPTION_DOTS} size={26} color={THEME.FONT_COLOR} />}
          />
        ) : null}
      </Row>
      <Row style={styles.mainRow}>
        <View style={styles.userInfo}>
          <UserIcon userPhoto={event ? event.host.photo : null} iconSize={50} />
          {event ? (
            <Text bold={true} style={styles.hostName}>
              {`${event.host.firstName} ${event.host.lastName}`}
            </Text>
          ) : (
            <Skeleton />
          )}
        </View>
        <View style={styles.activitiesWrapper}>
          <MemberTab
            membersPhotos={event ? event.membersPhotos : [null]}
            membersCount={event ? event.membersCount : 0}
            onOpen={onShowMembersHandler}
            style={styles.memberTab}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.commentsButton}
            onPress={onOpenCommentsScreen}
          >
            <Icon name={IconNames.ICON_COMMENTS} size={24} color={THEME.FONT_COLOR} />
            <Text style={{ marginLeft: 12 }}>{event ? event.commentsCount : 0}</Text>
          </TouchableOpacity>
        </View>
      </Row>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 15,
  },
  userInfo: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  hostName: { marginLeft: 10, color: THEME.WHITE_FONT_COLOR },
  imageBackground: { paddingHorizontal: 0, width: '100%', height: '100%' },
  image: {
    width: '100%',
    height: '100%',
  },
  activitiesWrapper: {
    position: 'relative',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  memberTab: {
    backgroundColor: THEME.WHITE_TRANSPARENT,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  commentsButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: THEME.WHITE_TRANSPARENT,
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 12,
  },
  gradient: { position: 'absolute', width: '100%', height: '100%' },
  topRow: {
    height: 32,
    marginVertical: THEME.STATUS_BAR_HEIGHT,
    justifyContent: 'space-between',
  },
  rowButton: { width: 36, height: 36 },
  mainRow: {
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
});
