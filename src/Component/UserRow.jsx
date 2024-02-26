import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import fonts from '../styles/fonts';
import {FontSize} from '../utils/FontSize';
import colors from '../styles/colors';

const {width} = Dimensions.get('screen');
const UserRow = ({num, userData}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            num % 2 === 0 ? colors.lightBlueOpaque : colors.grayInput,
        },
      ]}>
      <Text>{num} : </Text>
      <Text style={styles.title}>{userData.name} </Text>
      <Text style={styles.note}>is with {userData.pushUp} score</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.1,
    borderBottomColor: colors.gray,
    padding: 6,
    backgroundColor: colors.lightBlueOpaque,
    borderRadius: 4,
    margin: 2,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
    marginRight: 4,
    color: colors.purple,
  },
  note: {
    fontFamily: fonts.regular,
    fontSize: FontSize(12),
  },
});

export default UserRow;
