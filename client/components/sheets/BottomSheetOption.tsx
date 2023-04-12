import React from 'react';
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text } from '../ui/Text';
import { THEME } from '../theme';
import { Icon, IconNames } from '../ui/Icon';

type Props = {
  icon: IconNames;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const BottomSheetOption: React.FC<Props> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.wrapper}>
        <Icon style={styles.icon} name={icon} size={20} color={THEME.PLACEHOLDER_COLOR} />
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },

  icon: { marginRight: 20 },
});
