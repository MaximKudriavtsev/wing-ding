import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { THEME } from '../theme';

type Props = {
  isVisible: boolean;
};

export const ModalLoader: React.FC<Props> = ({ isVisible }) => {
  return isVisible ? (
    <View style={styles.wrapper}>
      <View style={styles.spinnerWrapper}>
        <ImageBackground
          style={styles.spinner}
          source={require('../../assets/Spinner-1s-200px.gif')}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flex: 1,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.DARKER_COLOR,
    shadowColor: THEME.BRIGHTER_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  spinner: {
    height: 64,
    width: 64,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
