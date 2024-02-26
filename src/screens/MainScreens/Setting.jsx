import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {Input, Button, Header as HeaderRNE} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import {Screen} from '../../Component';
import {userLogout} from '../../redux/features/Authentication/authentication';

const options = [
  {id: 1, type: 'remove-ads', title: 'Remove ads $1.99'},
  {id: 2, type: 'share', title: 'Share with a friend'},
  {id: 3, type: 'rate', title: 'Rate in appstore'},
  {id: 4, type: 'contact-us', title: 'Contact us'},
  {id: 4, type: 'logout', title: 'Logout'},
];
const {width} = Dimensions.get('screen');

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user);

  const handleAction = type => {
    switch (type) {
      case 'logout':
        dispatch(userLogout());
        navigation.navigate(route.LOGIN_SCREEN);
        break;

      default:
        break;
    }
  };

  return (
    <Screen>
      <HeaderRNE
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'Setting', style: styles.heading}}
      />
      <ScrollView style={styles.container} contentContainerStyle={{margin: 6}}>
        <Space size={UtilityMethods.hp(2)} />
        <Text style={styles.text}>Choose max number of pushups per day</Text>
        <Input
          textContentType="none"
          onChangeText={console.log}
          labelStyle={styles.label}
          placeholder="Interval Of 10"
          style={{fontFamily: fonts.regular}}
          leftIconContainerStyle={{marginHorizontal: 8}}
          inputContainerStyle={styles.inputContainer}
          autoComplete="email"
          returnKeyType="next"
          returnKeyLabel="next"
        />
        <Space size={UtilityMethods.hp(1)} />
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => handleAction(item.type)}>
              <Text style={styles.text}>{item.title}</Text>
              <AntDesign name="arrowright" size={24} style={styles.icon} />
            </TouchableOpacity>
          );
        })}
        {user && (
          <TouchableOpacity>
            <Image source={{uri: user?.profilepic || ''}} style={styles.img} />
          </TouchableOpacity>
        )}

        <Button
          title="Edit Profile"
          loading={false}
          buttonStyle={styles.loginButton}
          onPress={() => navigation.navigate(route.PROFILE_SCREEN)}
        />
      </ScrollView>
    </Screen>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },

  text: {
    fontFamily: fonts.regular,
    fontSize: FontSize(12),
  },
  rowscores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.1,
    alignItems: 'center',
  },
  rulesBtn: {
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
    color: colors.white,
  },
  label: {
    color: 'white',
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
  },
  box: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
    padding: 8,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderRadius: 8,
    margin: 12,
  },
  icon: {
    color: colors.gray,
  },
  loginButton: {marginTop: 8},
});
