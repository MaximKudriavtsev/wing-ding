import React from 'react';
import { dateRu } from '../../src/utils';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { THEME } from '../theme';

type Props = {
  date: string;
};

export const DateTab: React.FC<Props> = ({ date }) => {
  const shortMonth = dateRu(date).format('MMM').slice(0, -1).toUpperCase();

  return (
    <View style={styles.wrapper}>
      <Text bold={true} style={styles.day}>
        {dateRu(date).date().toString()}
      </Text>
      <Text bold={true} style={styles.month}>
        {shortMonth}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    borderRadius: 5,
    height: 60,
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  day: {
    fontSize: 18,
    color: '#000',
  },
  month: {
    fontSize: 16,
    color: THEME.PLACEHOLDER_COLOR,
  },
});
