import Snackbar from 'react-native-snackbar';

export const showMessage = (text, backgroundColor) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
  });
};
