import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserIcon } from './UserIcon';
import { Text } from './Text';

type Props = {
  membersPhotos: (string | null)[];
  membersCount: number;
  reverse?: boolean;
  onOpen?: () => void;
  style?: object;
};

export const MemberTab: React.FC<Props> = ({
  membersPhotos,
  membersCount,
  reverse,
  onOpen,
  style,
}) => {
  const membersIcons = membersPhotos
    .slice(0, 3)
    .map(memberPhoto => (
      <UserIcon
        key={memberPhoto}
        userPhoto={memberPhoto}
        style={reverse ? { marginLeft: -10 } : { marginRight: -10 }}
      />
    ));

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onOpen} style={style}>
      <View style={reverse ? styles.reversedWrapper : styles.wrapper}>
        <View style={styles.icons}>{membersIcons}</View>
        <View style={styles.text} key={'members_count'}>
          <Text bold={true} style={reverse ? { marginRight: 15 } : { marginRight: 0 }}>
            {`Участники (${membersCount})`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  reversedWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    height: 34,
  },
});
