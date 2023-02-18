import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dateRu } from '../src/utils';
import { Comment } from '../src/api/event/types';
import { Column } from './Column';
import { Row } from './Row';
import { THEME } from './theme';
import { Text } from './ui/Text';
import { UserIcon } from './ui/UserIcon';

type Props = {
  item: Comment;
};

export const CommentTab: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.wrapper}>
      <Row style={styles.commentRow}>
        <UserIcon userPhoto={item.author.photo} iconSize={46} />
        <Column style={styles.textColumn}>
          <Text
            bold={true}
            style={{ fontSize: 16, marginBottom: 10 }}
          >{`${item.author.firstName} ${item.author.lastName}`}</Text>
          <Text>{item.text}</Text>
          <Text style={{ color: THEME.PLACEHOLDER_COLOR, marginTop: 5 }}>
            {dateRu(item.createdAt).format(`D MMMM YYYY в HH:mm`)}
          </Text>
        </Column>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 5,
    height: 'auto',
  },
  commentRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
    width: '100%',
  },
  textColumn: {
    paddingHorizontal: 15,
    borderBottomColor: THEME.DARKER_COLOR,
    borderBottomWidth: 1,
    marginVertical: 5,
    width: '85%',
  },
});
