import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Header as HeaderRNE, Icon} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {FontSize} from '../utils/FontSize';
import route from '../navigation/routes';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('screen');
const Header = ({navigation, notifications, onHeaderClick}) => {
  const user = useSelector(state => state.authentication.user);
  const docsNavigate = () => {
    // Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`);
  };

  return (
    <HeaderRNE
      leftComponent={
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.SETTING_SCREEN)}>
            <AntDesign name="setting" size={25} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {user && user.name ? user.name : ''}
          </Text>
        </View>
      }
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => onHeaderClick('notification-list')}>
            <Ionicons name="notifications" color={colors.white} size={25} />
            {notifications > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => onHeaderClick('friend-list')}>
            <Octicons name="diff-added" color={colors.white} size={25} />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: FontSize(14),
    marginLeft: 12,
    color: colors.white,
    width: width / 2,
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    left: -8,
    backgroundColor: 'red', // Customize the background color of the badge
    borderRadius: 10, // Adjust the border-radius to make a circular badge
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  badgeText: {
    color: 'white',
    fontSize: 12, // Customize the font size of the badge text
    fontWeight: 'bold',
  },
});

export default Header;
