import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import colors from '../styles/colors';
const Screen = ({children, style, styleView}) => {
  return <SafeAreaView style={styles.view}>{children}</SafeAreaView>;
};

export default Screen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  }
});
