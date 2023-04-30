import React from 'react';
import { Column } from '../ui/Column';
import { Row } from '../ui/Row';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';
import { THEME, PROFILE_STYLE } from '../theme';

export const ProfileHeaderLoader = () => {
  return (
    <Column style={PROFILE_STYLE.userBar}>
      <Row style={PROFILE_STYLE.userBarRow}>
        <View style={PROFILE_STYLE.userIconWrapper}>
          <Skeleton
            style={{ height: THEME.PROFILE_ICON_SIZE, width: THEME.PROFILE_ICON_SIZE }}
            round={true}
          />
        </View>
        <Row style={PROFILE_STYLE.userBarButtons}>
          <Skeleton style={{ width: 80 }} />
          <Skeleton style={{ width: 80 }} />
        </Row>
      </Row>
      <Skeleton style={{ width: '100%' }} />
    </Column>
  );
};
