import * as Font from 'expo-font';

export default useFont = async () => {
  await Font.loadAsync({
    'comfortaa-regular': require('./../../assets/fonts/Comfortaa-Regular.ttf'),
    'comfortaa-bold': require('./../../assets/fonts/Comfortaa-Bold.ttf'),
  });
};
