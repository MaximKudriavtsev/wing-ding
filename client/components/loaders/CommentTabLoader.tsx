import React from 'react';
import { View } from 'react-native';
import { Column } from '../ui/Column';
import { Row } from '../ui/Row';
import { COMMENT_TAB_STYLE, THEME } from '../theme';
import { Skeleton } from './Skeleton';

export const CommentTabLoader = () => {
  return (
    <View style={COMMENT_TAB_STYLE.wrapper}>
      <Row style={COMMENT_TAB_STYLE.row}>
        <Skeleton
          style={{ height: THEME.USER_TAB_ICON_SIZE, width: THEME.USER_TAB_ICON_SIZE }}
          round={true}
        />
        <Column style={COMMENT_TAB_STYLE.column}>
          <Skeleton style={COMMENT_TAB_STYLE.author} />
          <Skeleton />
          <Skeleton style={COMMENT_TAB_STYLE.date} />
        </Column>
      </Row>
    </View>
  );
};
