import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonType } from '../ui/Button';
import { EVENT_SHEET_STYLE, THEME } from '../theme';
import { Skeleton } from './Skeleton';
import { Icon, IconNames } from '../ui/Icon';

export const EventScreenSheetLoader = () => (
  <View style={EVENT_SHEET_STYLE.wrapper}>
    <Skeleton />
    <View style={styles.skeletonWrapper}>
      <Icon style={EVENT_SHEET_STYLE.icon} name={IconNames.ICON_LOCATION} size={16} />
      <Skeleton style={styles.skeleton} />
    </View>
    <View style={styles.skeletonWrapper}>
      <Icon style={EVENT_SHEET_STYLE.icon} name={IconNames.ICON_CLOCK} size={16} />
      <Skeleton style={styles.skeleton} />
    </View>
    <Button type={ButtonType.Primary} style={EVENT_SHEET_STYLE.button}>
      {'Принять участие'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  skeletonWrapper: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  skeleton: { width: '50%', marginLeft: 10 },
});
