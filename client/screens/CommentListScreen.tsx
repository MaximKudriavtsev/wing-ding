import React, { useState, useEffect } from 'react';
import { List } from '../components/List';
import { CommentTab } from '../components/CommentTab';
import { Loader } from '../components/ui/Loader';
import { Comment } from '../src/api/event/types';
import { SCREEN_STYLE, THEME } from '../components/theme';
import { MessageInputBar } from '../components/ui/MessageInputBar';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView';

type Props = { navigation: any };

export const CommentListScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  const onSendComment = () => {
    console.log(commentText);
  };

  const comments: Comment[] = [
    {
      id: '1',
      author: {
        id: '1',
        firstName: 'Лох',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалка',
    },
    {
      id: '2',
      author: {
        id: '1',
        firstName: 'Гей',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалка',
    },
    {
      id: '3',
      author: {
        id: '1',
        firstName: 'Ты',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалка',
    },
    {
      id: '4',
      author: {
        id: '1',
        firstName: 'Лох',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалка',
    },
    {
      id: '5',
      author: {
        id: '1',
        firstName: 'Лох',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалкаFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF    FFFFFFFFFFFFFFFFFFFFFFFFFFF FFFFFFFFFFFFFFFFFFFFFFF FFFFFFFFFFFFFFFFFFFFFFFFFFF 123 ;213 213 232 232 23 2111 3213 123 12 213213 123 12 123   221231 213 1 dsf s sd fs js sdfif jsdio fjsdi fsidj fiodsj o',
    },
    {
      id: '6',
      author: {
        id: '1',
        firstName: 'Лох',
        lastName: 'Цветочный',
        photo:
          'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
      },
      createdAt: 'Today',
      text: 'Хахаха, сасай лалка',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{
        ...SCREEN_STYLE.wrapper,
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}
      fixedHeight={'100%'}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <List
            data={comments}
            Component={CommentTab}
            emptyText={'Еще никто не оставил комментарий. Будьте первыми!'}
            style={{ paddingTop: 10 }}
          />
          <MessageInputBar
            placeholder={'Добавьте комментарий...'}
            message={commentText}
            onSetMessage={setCommentText}
            onSend={onSendComment}
            messageMaxLength={300}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};
