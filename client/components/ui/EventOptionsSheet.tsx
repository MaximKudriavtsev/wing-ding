import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { BottomSheetOption } from './BottomSheetOption';
import { SCREEN_STYLE } from './../theme';
import { IconNames } from './Icon';

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
        <BottomSheetOption
          icon={IconNames.ICON_EDIT}
          text={'Изменить событие'}
          onPress={onEditEvent}
        />
        <BottomSheetOption
          icon={IconNames.ICON_CROSS}
          text={'Удалить событие'}
          onPress={onDeleteEvent}
        />
      </BottomSheet>
    </View>
  );
};
