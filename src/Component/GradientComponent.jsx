import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientComponent = ({children, style}) => {
  return (
    <LinearGradient
      colors={['#0e1b34', '#131e3c', '#050c1c']}
      style={[styles.linearGradient, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 25,
  },
});

export default GradientComponent;
