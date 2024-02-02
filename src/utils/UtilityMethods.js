import {Dimensions, PixelRatio} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

/**
 * Helper Functions
 *
 * @class UtilityMethods
 */
class UtilityMethodsClass {
  hp = height => {
    const elemHeight = typeof height === 'number' ? height : parseFloat(height);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  };
  wp = width => {
    const elemWidth = typeof width === 'number' ? width : parseFloat(width);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  };
}

const UtilityMethods = new UtilityMethodsClass();

export default UtilityMethods;
