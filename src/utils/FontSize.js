import {RFValue} from 'react-native-responsive-fontsize';

/**
 * Custom function to wrap RFValue for responsive font sizes.
 * @param {number} size - The font size to scale.
 * @return {number} - The scaled font size.
 */
export const FontSize = size => {
  return RFValue(size);
};
