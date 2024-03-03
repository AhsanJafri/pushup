import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  useTheme,
  Input,
  Button,
  Iconm,
  Header as HeaderRNE,
} from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import {
  Screen,
  Header,
  UserScore,
  UserRow,
  UserSearchProfile,
  UserNotification,
} from '../../Component';
import {
  useGetUsersNotificationQuery,
  useUserNotificationsMutation,
  useUserChallengeNotificationsMutation,
} from '../../redux/apis';
import {img} from '../../assets/img';
import Loader from '../../Component/Loader';
import Snackbar from 'react-native-snackbar';

const {width} = Dimensions.get('screen');
const Notifications = ({navigation}) => {
  const user = useSelector(state => state.authentication.user);
  const {
    data: allUsersNotification,
    isLoading,
    isFetching,
    refetch,
  } = useGetUsersNotificationQuery({id: user._id});
  const [userNotificationAction, {isLoading: isLoadingUserNotificationAction}] =
    useUserNotificationsMutation();
  const [
    userNotificationChallengeAction,
    {isLoading: isLoadingUserChallengeNotificationAction},
  ] = useUserChallengeNotificationsMutation();

  const handleAction = async (type, val) => {
    const actionFunction =
      type === 'noti'
        ? userNotificationAction
        : userNotificationChallengeAction;

    actionFunction(val).then(e => {
      if (e.data && e.data.message) {
        refetch();
        Snackbar.show({
          text: 'Successfully completed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.green,
        });
      }
    });
  };

  return (
    <Screen>
      {isFetching &&
        isLoadingUserNotificationAction &&
        isLoading &&
        isLoadingUserChallengeNotificationAction && <Loader />}
      <HeaderRNE
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'Notifications', style: styles.heading}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <FlatList
          refreshing={isLoading}
          data={allUsersNotification?.notifications || []}
          renderItem={({item}) => (
            <UserNotification
              key={JSON.stringify(item)}
              data={item}
              onAction={handleAction}
            />
          )}
          onRefresh={() => refetch()}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Notifications;

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
    fontSize: FontSize(12),
  },
  box: {
    borderBottomWidth: 1,
    padding: 8,
    margin: 4,
  },
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    borderRadius: 8,
  },
  inputContainer: {
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grayInput,
    marginHorizontal: -8,
    borderColor: colors.white,
    padding: 1,
  },
});
