import React from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : 60}
        color="#FFF"
      />
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(14,27,52, 0.8)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width,
    zIndex: 10,
  },
});
