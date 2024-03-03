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
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {FontSize} from '../utils/FontSize';
import route from '../navigation/routes';
import {Image} from 'react-native';
import Space from './Space';
import {color} from '@rneui/base';

const {width} = Dimensions.get('screen');
const UserNotifcations = ({data, isFriend, onAction}) => {
  const {
    _id,
    title,
    senderInfo,
    created,
    isActionNeeded,
    userId,
    fromUserId,
    isChallenged,
    isChallengeCompleted,
    isChallengePartiallyCompleted,
  } = data;
  const {profilepic, email} = senderInfo;
  const dateObject = new Date(created);
  const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}-${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${dateObject.getFullYear()}`;

  const handleRequest = (behave, type) => {
    onAction(behave, {notificationId: _id, type, userId, senderId: fromUserId});
  };

  return (
    <View
      style={styles.container}
      onPress={() => onAction('profile', data._id)}>
      <View style={styles.imgDiv}>
        <Image
          source={{
            uri: profilepic
              ? profilepic
              : 'data:image/jpeg;base64,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',
          }}
          style={styles.img}
          resizeMethod="scale"
          resizeMode="stretch"
        />
        <View style={styles.textCont}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.subDiv}>
            <Text style={styles.subheaderText}>{email}</Text>
            <Text style={styles.subheaderText}>{formattedDate}</Text>
          </View>
        </View>
      </View>
      <Space size={16} />
      {isActionNeeded && (
        <View style={styles.buttonDiv}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: colors.green}]}
            onPress={() => handleRequest('noti', 1)}>
            <Text style={styles.subheaderText2}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginLeft: 14}]}
            onPress={() => handleRequest('noti', 0)}>
            <Text style={styles.subheaderText2}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      {isChallenged && !isChallengeCompleted && (
        <View style={styles.buttonDiv}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: colors.green}]}
            onPress={() => handleRequest('challenge', 1)}>
            <Text style={styles.subheaderText2}>Completed</Text>
          </TouchableOpacity>
          {!isChallengePartiallyCompleted && (
            <TouchableOpacity
              style={[styles.btn, {marginLeft: 14}]}
              onPress={() => handleRequest('challenge', 0)}>
              <Text style={styles.subheaderText2}>Partially Completed</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '97%',
    // flexDirection: 'row',
    padding: 12,
    margin: 4,
    borderRadius: 10,
    borderColor: colors.gray,
    backgroundColor: colors.lightgray,
    alignSelf: 'center',
  },
  imgDiv: {
    flexDirection: 'row',
    width: '100%',
  },
  img: {height: 40, width: 35, borderRadius: 12},
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
    fontSize: FontSize(10),
    fontFamily: fonts.regular,
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSize(11),
    width: '95%',
  },
  textCont: {
    marginLeft: 12,
    width: '95%',
  },
  iconsDiv: {
    flexDirection: 'row',
  },
  subDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  buttonDiv: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.red,
    padding: 4,
  },
  subheaderText2: {
    fontSize: FontSize(10),
    fontFamily: fonts.bold,
    color: colors.white,
    padding: 4,
  },
});

export default UserNotifcations;
