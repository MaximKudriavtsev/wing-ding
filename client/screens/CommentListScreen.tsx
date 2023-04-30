import React, { useState, useEffect, useContext } from 'react';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { List } from '../components/ui/List';
import { CommentTab } from '../components/ui/CommentTab';
import { Loader } from '../components/loaders/Loader';
import { Comment } from '../src/api/event/types';
import { SCREEN_STYLE } from '../components/theme';
import { MessageInputBar } from '../components/ui/MessageInputBar';
import { KeyboardAvoidingView } from '../components/ui/KeyboardAvoidingView';
import { View } from 'react-native';
import api from '../src/api/production';
import { CommentTabLoader } from '../components/loaders/CommentTabLoader';

type Props = { navigation: any; route: any; hasDefaultOffset?: boolean };

export const CommentListScreen: React.FC<Props> = ({
  navigation,
  route,
  hasDefaultOffset = true,
}) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { eventId } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    api.event
      .getEventComments(eventId)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch(error => {
        console.log(error.response);
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

  const onSendComment = () => {
    if (commentText == undefined || commentText.length < 1) return;
    api.event
      .sendComment(eventId, commentText)
      .then(() => setCommentText(''))
      .catch(error => {
        showAlertMessage(AlertMessages.unknownError, AlertType.Error);
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{
        ...SCREEN_STYLE.wrapper,
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}
      fixedHeight={'100%'}
      hasDefaultOffset={hasDefaultOffset}
    >
      <View style={{ flex: 1 }}>
        <List
          data={comments}
          Component={CommentTab}
          emptyText={'Еще никто не оставил комментарий. Будьте первыми!'}
          style={{ paddingTop: 10 }}
          isDataLoaded={!isLoading}
          OnLoadComponent={CommentTabLoader}
        />
      </View>
      <MessageInputBar
        placeholder={'Добавьте комментарий...'}
        message={commentText}
        onSetMessage={setCommentText}
        onSend={onSendComment}
        messageMaxLength={300}
      />
    </KeyboardAvoidingView>
  );
};
