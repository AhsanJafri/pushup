import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import GradientComponent from './GradientComponent';
import UtilityMethods from '../utils/UtilityMethods';
import Space from './Space';
import Svg, {Use, Image} from 'react-native-svg';
import SVG from '../../assets/images/appBackground.svg';

const Screen = ({children, style, styleView}) => {
  const {width, height} = Dimensions.get('window');
  const viewBox = '25 0 ' + width + ' ' + height;
  return (
    <SafeAreaView style={styles.view}>
      {/* <GradientComponent style={[styles.linearGradient, style]}> */}
      <ImageBackground
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        source={require('../../assets/images/newBackground.png')}></ImageBackground>
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}>
        <SVG viewBox={viewBox} />
      </View> */}
      {children}
      {/* </GradientComponent> */}
    </SafeAreaView>
  );
};

export default Screen;
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  image: {
    flex: 1,
    // paddingHorizontal: 32
  },
  linearGradient: {
    flex: 1,
  },
});
