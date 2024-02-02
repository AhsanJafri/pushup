import React from 'react';

import {StyleSheet, View, ActivityIndicator, Platform} from 'react-native';
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={Platform.OS === 'ios'? 'large':  60} color="#FFF" />
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14,27,52, 0.8)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
  },
});
