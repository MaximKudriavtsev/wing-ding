import React from 'react';
import { View } from 'react-native';
import { dateRu } from '../../src/utils';
import { Comment } from '../../src/api/event/types';
import { Column } from './Column';
import { Row } from './Row';
import { THEME, COMMENT_TAB_STYLE } from '../theme';
import { Text } from './Text';
import { UserIcon } from './UserIcon';

type Props = {
  item: Comment;
};

export const CommentTab: React.FC<Props> = ({ item }) => {
  return (
    <View style={COMMENT_TAB_STYLE.wrapper}>
      <Row style={COMMENT_TAB_STYLE.row}>
        <UserIcon userPhoto={item.author.photo} iconSize={THEME.USER_TAB_ICON_SIZE} />
        <Column style={COMMENT_TAB_STYLE.column}>
          <Text
            bold={true}
            style={COMMENT_TAB_STYLE.author}
          >{`${item.author.firstName} ${item.author.lastName}`}</Text>
          <Text>{item.text}</Text>
          <Text style={COMMENT_TAB_STYLE.date}>
            {dateRu(item.createdAt).format(`D MMMM YYYY в HH:mm`)}
          </Text>
        </Column>
      </Row>
    </View>
  );
};
