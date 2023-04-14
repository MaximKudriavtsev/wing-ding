import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import {
  DateTimePickerEvent,
  default as DefaultDateTimePicker,
} from '@react-native-community/datetimepicker';
import { THEME } from '../theme';
import { Button, ButtonType } from '../ui/Button';
import { OperatingSystemType, OPERATING_SYSTEM } from '../../src/config';

export enum DateTimePickerType {
  Date = 'date',
  Time = 'time',
}

type Props = {
  date?: Date;
  isVisible?: boolean;
  type: DateTimePickerType;
  onClose: () => void;
  onSubmit: (dateTime: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

export const DateTimePicker: React.FC<Props> = ({
  date,
  isVisible,
  type,
  onClose,
  onSubmit,
  minimumDate,
  maximumDate,
}) => {
  const [dateTime, setDateTime] = useState(date || new Date());

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date;
    setDateTime(currentDate || new Date());
    if (OPERATING_SYSTEM === OperatingSystemType.Android) {
      if (event.type === 'set') {
        onClose();
        onSubmit(date || new Date());
      } else {
        onClose();
      }
    }
  };

  return OPERATING_SYSTEM === OperatingSystemType.Ios ? (
    <>
      <Modal visible={isVisible} transparent={true} animationType='slide'>
        <View style={styles.picker}>
          <DefaultDateTimePicker
            value={dateTime}
            mode={type}
            display='spinner'
            locale='ru-RU'
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={onChange}
          />
          <View style={styles.buttonsRow}>
            <Button
              style={styles.rejectButton}
              type={ButtonType.Secondary}
              fontColor='red'
              onPress={onClose}
            >
              {'Отменить'}
            </Button>
            <Button
              style={styles.confirmButton}
              type={ButtonType.Primary}
              onPress={() => onSubmit(dateTime)}
            >
              {'Принять'}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  ) : (
    <>
      {isVisible && (
        <DefaultDateTimePicker
          value={dateTime}
          mode={type}
          locale='ru-RU'
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    bottom: 100,
    marginHorizontal: 15,
    display: 'flex',
    padding: 20,
    borderRadius: 15,
    backgroundColor: THEME.BACKGROUND_COLOR,
    shadowColor: THEME.BRIGHTER_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonsRow: {
    position: 'relative',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    width: 120,
  },
  rejectButton: {
    width: 100,
    color: 'red',
  },
});

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import {
//   DateTimePickerEvent,
//   default as DefaultDateTimePicker,
// } from '@react-native-community/datetimepicker';
// import { THEME } from '../theme';
// import { Button, ButtonType } from '../ui/Button';
// import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
//   withDelay,
//   runOnJS,
// } from 'react-native-reanimated';

// export enum DateTimePickerType {
//   Date = 'date',
//   Time = 'time',
// }

// type Props = {
//   isVisible?: boolean;
//   type: DateTimePickerType;
//   onClose: () => void;
//   onSubmit: (dateTime: Date) => void;
// };

// export const DateTimePicker: React.FC<Props> = ({ isVisible, type, onClose, onSubmit }) => {
//   const [dateTime, setDateTime] = useState(new Date());

//   const translateSheet = useSharedValue(0);
//   const translateBackground = useSharedValue(0);
//   const opacity = useSharedValue(0);

//   const panGestureBackgroundEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
//     onStart: () => {
//       runOnJS(onClose)();
//     },
//   });

//   const reanimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateSheet.value }],
//     };
//   });

//   const reanimatedBackgroundStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       transform: [{ translateY: translateBackground.value * 10 }],
//     };
//   });

//   const onChange = (event: DateTimePickerEvent, date?: Date) => {
//     const currentDate = date;
//     setDateTime(currentDate || new Date());
//   };

//   useEffect(() => {
//     if (isVisible) {
//       translateSheet.value = withTiming(0);
//       translateBackground.value = 0;
//       opacity.value = withTiming(0.5);
//     } else {
//       translateSheet.value = withSpring(THEME.SCREEN_HEIGHT);
//       translateBackground.value = withDelay(300, withTiming(THEME.SCREEN_HEIGHT * 3));
//       opacity.value = withTiming(0);
//     }
//   }, [isVisible]);

//   return (
//     <>
//       <PanGestureHandler onGestureEvent={panGestureBackgroundEvent}>
//         <Animated.View style={[styles.background, reanimatedBackgroundStyle]} />
//       </PanGestureHandler>
//       <Animated.View style={[styles.wrapper, reanimatedStyle]}>
//         <View style={styles.picker}>
//           <DefaultDateTimePicker
//             value={dateTime}
//             mode={type}
//             display='spinner'
//             locale='ru-RU'
//             minimumDate={new Date()}
//             onChange={onChange}
//           />
//           <View style={styles.buttonsRow}>
//             <Button
//               style={styles.rejectButton}
//               type={ButtonType.Secondary}
//               fontColor='red'
//               onPress={onClose}
//             >
//               {'Отменить'}
//             </Button>
//             <Button
//               style={styles.confirmButton}
//               type={ButtonType.Primary}
//               onPress={() => onSubmit(dateTime)}
//             >
//               {'Принять'}
//             </Button>
//           </View>
//         </View>
//       </Animated.View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   // wrapper: {
//   //   zIndex: 2,
//   //   position: 'absolute',
//   //   width: THEME.SCREEN_WIDTH,
//   //   height: THEME.SCREEN_HEIGHT,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   backgroundColor: 'rgba(0,0,0,.4)',
//   // },
//   wrapper: {
//     zIndex: 101,
//     position: 'absolute',
//     display: 'flex',
//     alignItems: 'center',
//     width: '100%',
//     opacity: 1,
//     borderRadius: 25,
//     top: THEME.SCREEN_HEIGHT - 600,
//   },
//   background: {
//     zIndex: 100,
//     position: 'absolute',
//     height: THEME.SCREEN_HEIGHT,
//     width: THEME.SCREEN_WIDTH,
//     left: -15,
//     top: 0,
//     backgroundColor: 'black',
//   },
//   picker: {
//     display: 'flex',
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: THEME.BACKGROUND_COLOR,
//     shadowColor: THEME.BRIGHTER_COLOR,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   buttonsRow: {
//     position: 'relative',
//     height: 50,
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   confirmButton: {
//     width: 120,
//   },
//   rejectButton: {
//     width: 100,
//     color: 'red',
//   },
// });
