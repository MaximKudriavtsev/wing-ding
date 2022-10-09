import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { BottomSheetOption } from './BottomSheetOption';
import { THEME, SCREEN_STYLE } from './../theme';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onEditEvent: () => void;
  onDeleteEvent: () => void;
};

export const EventOptionsSheet: React.FC<Props> = ({
  onEditEvent,
  onDeleteEvent,
  isVisible,
  onClose,
}) => {
  return (
    <View style={SCREEN_STYLE.bottomSheetWrapper}>
      <BottomSheet isVisible={isVisible} onClose={onClose}>
        <BottomSheetOption icon={THEME.ICON_EDIT} text={'Изменить событие'} onPress={onEditEvent} />
        <BottomSheetOption
          icon={THEME.ICON_CROSS}
          text={'Удалить событие'}
          onPress={onDeleteEvent}
        />
      </BottomSheet>
    </View>
  );
};
