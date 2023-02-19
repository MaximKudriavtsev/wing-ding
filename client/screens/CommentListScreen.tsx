import React, { useState, useEffect, useContext } from 'react';
import { AlertContext, AlertType, AlertMessages } from '../src/context/AlertContext';
import { List } from '../components/List';
import { CommentTab } from '../components/CommentTab';
import { Loader } from '../components/ui/Loader';
import { Comment } from '../src/api/event/types';
import { SCREEN_STYLE, THEME } from '../components/theme';
import { MessageInputBar } from '../components/ui/MessageInputBar';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView';
import api from '../src/api/production';

type Props = { navigation: any; route: any };

export const CommentListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { showAlertMessage } = useContext(AlertContext);
  const { eventId } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

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
