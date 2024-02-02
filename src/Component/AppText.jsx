import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
import colors from '../styles/colors';
import defaultStyles from '../styles/index';
function AppText({children, style, h1, h2, h3, h4, ...otherProps}) {
  return (
    <Text
      h1={h1}
      h2={h2}
      h3={h3}
      h4={h4}
      style={[defaultStyles.text, style]}
      {...otherProps}>
      {children}
    </Text>
  );
}

export default memo(AppText);
const styles = StyleSheet.create({});
