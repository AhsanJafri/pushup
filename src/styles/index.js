import * as colors from './colors';
import {Dimensions} from 'react-native';
import fonts from './fonts';

const is1080 =
  Dimensions.get('window').width * Dimensions.get('window').scale > 1079;
// console.log('width>>', Dimensions.get('window'));
const defaultStyles = {
  textSmall: is1080 ? 14 : 12,
  textMedium: is1080 ? 16 : 15,
  textSemiMedium: is1080 ? 17 : 18,
  textLarge: is1080 ? 24 : 22,
  text: {
    color: colors.black,
    fontSize: is1080 ? 14 : 12,
    fontFamily: fonts.regular,
  },
  screenContent: {
    marginHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 8,
    borderRadius: 5,
    color: colors.black,
    fontFamily: fonts.regular,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.semiBold,
  },
  dateTimeFormat: 'ddd MMM DD YYYY (h:mm A)',
  dateFormat: 'ddd MMM DD YYYY',
};

export default defaultStyles;
