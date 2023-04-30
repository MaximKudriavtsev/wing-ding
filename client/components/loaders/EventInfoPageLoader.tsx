import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonType } from '../ui/Button';
import { Icon, IconNames } from '../ui/Icon';
import { Skeleton } from './Skeleton';
import { EVENT_INFO_PAGE_STYLE } from '../theme';

export const EventInfoPageLoader = () => {
  return (
    <View style={EVENT_INFO_PAGE_STYLE.wrapper}>
      <Skeleton />
      <View>
        <View style={EVENT_INFO_PAGE_STYLE.infoRow}>
          <Icon name={IconNames.ICON_CLOCK} size={28} style={EVENT_INFO_PAGE_STYLE.icon} />
          <View style={EVENT_INFO_PAGE_STYLE.infoText}>
            <Skeleton style={styles.skeleton} />
            <Skeleton style={styles.skeleton} />
          </View>
        </View>
        <View style={EVENT_INFO_PAGE_STYLE.infoRow}>
          <Icon name={IconNames.ICON_LOCATION} size={28} style={EVENT_INFO_PAGE_STYLE.icon} />
          <View style={EVENT_INFO_PAGE_STYLE.infoText}>
            <Skeleton style={styles.skeleton} />
            <Skeleton style={styles.skeleton} />
          </View>
        </View>
      </View>
      <Skeleton style={{ height: 100 }} />

      <Button onPress={() => console.log('Invite')} type={ButtonType.Primary}>
        Пригласить друзей
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: 200,
    marginBottom: 2,
  },
});
