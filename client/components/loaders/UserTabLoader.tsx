import React from 'react';
import { View } from 'react-native';
import { Row } from '../ui/Row';
import { Skeleton } from './Skeleton';
import { USER_TAB_STYLE, THEME } from '../theme';

export const UserTabLoader = () => {
  return (
    <View style={USER_TAB_STYLE.wrapper}>
      <Row style={USER_TAB_STYLE.row}>
        <Skeleton
          style={{ width: THEME.USER_TAB_ICON_SIZE, height: THEME.USER_TAB_ICON_SIZE }}
          round={true}
        />
        <Skeleton style={{ ...USER_TAB_STYLE.name, width: '80%' }} />
      </Row>
    </View>
  );
};
