import {View, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {img} from '../../assets/img';
import routes from '../../navigation/routes';
import colors from '../../styles/colors';

const {height, width} = Dimensions.get('screen');

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(routes.LOGIN_SCREEN);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image source={img.splash} style={styles.img} resizeMode="stretch" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  img: {
    width: width,
    height: height / 2,
  },
});
