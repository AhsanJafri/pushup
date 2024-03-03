/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, useCallback} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';

import {useTheme, Input, Button, Icon} from '@rneui/themed';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import {Screen, Header, UserScore, UserRow} from '../../Component';
import {RulesModal, UserModals} from '../../Component/Modals';
import {showMessage} from '../../hooks/useSnackbar';
import {requestUserPermission, getToken} from '../../hooks/utils';
import {img} from '../../assets/img';
import {
  useGetAllFriendListQuery,
  useGetCurrentUserPushUpQuery,
  useSendPushChallengeMutation,
  useUpdateUserPushUpMutation,
  useUpdateUserTokenMutation,
  useGetUsersNotificationCountQuery,
} from '../../redux/apis';
import Loader from '../../Component/Loader';
import Snackbar from 'react-native-snackbar';

const {height, width} = Dimensions.get('screen');
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [pushupModal, setPushupModal] = useState(false);
  const user = useSelector(state => state.authentication.user);

  const {
    data: friendList,
    isLoading,
    refetch,
  } = useGetAllFriendListQuery({
    id: user ? user._id : null,
  });

  const [sendPushUpChallenge, {isLoading: isLoadingPushUp}] =
    useSendPushChallengeMutation();

  const [updateUserAppToken, {isLoading: isLoadingAppToken}] =
    useUpdateUserTokenMutation();

  const {
    data: pushUp,
    isLoading: isLoadingPushUpChallenge,
    refetch: refechUserPushUp,
  } = useGetCurrentUserPushUpQuery({
    id: user ? user._id : null,
  });

  const {data: {count = 0} = {count: 0}} = useGetUsersNotificationCountQuery(
    {
      id: user ? user._id : null,
    },
    {pollingInterval: 10000},
  );

  const [updateUserPushup, {isLoading: isUpdatingUserPush}] =
    useUpdateUserPushUpMutation();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await requestUserPermission();
        const token = await getToken();
        if (token) {
          const result = await updateUserAppToken({id: user._id, token});
          console.log(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleHeaderPress = type => {
    switch (type) {
      case 'friend-list':
        navigation.navigate(route.SEARCHING_SCREEN);
        break;
      case 'notification-list':
        navigation.navigate(route.NOTIFICATION_SCREEN);
        break;
      default:
        break;
    }
  };

  const handlePushUpAction = async val => {
    try {
      const response = await sendPushUpChallenge({
        userId: val._id,
        senderId: user._id,
      });

      if (response.data?.message) {
        showMessage(response.data.message, colors.green);
      } else if (response.error?.data?.message) {
        showMessage(response.error.data.message, colors.red);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        Snackbar.show({
          text: error.response.data.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.red,
        });
      } else {
        console.error('Error in handlePushUpAction:', error);
      }
    }
  };

  const handleIncrement = type => {
    let value = 0;
    switch (type) {
      case 'Increment':
        value = pushUp.pushup + 1;

        break;
      case 'Decrement':
        value = pushUp.pushup - 1;
        break;

      default:
        break;
    }
    updateUserPushup({id: user._id, pushup: value}).then(e =>
      console.log('Test', e),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      refechUserPushUp();
    }, []),
  );

  return (
    <Screen>
      {isLoading &&
        isLoadingAppToken &&
        isUpdatingUserPush &&
        isLoadingPushUpChallenge &&
        isLoadingPushUp && <Loader />}
      <Header
        navigation={navigation}
        notifications={count}
        onHeaderClick={handleHeaderPress}
      />
      <View style={styles.container}>
        <Space size={UtilityMethods.hp(10)} />
        <TouchableOpacity
          style={styles.RoundedBtn}
          onPress={() => setPushupModal(true)}>
          <Text style={styles.btnText}>Send Pushups</Text>
        </TouchableOpacity>
        <Space size={UtilityMethods.hp(15)} />
        <View style={styles.rowscores}>
          <UserScore
            score={pushUp ? pushUp.pushup : 0}
            onAction={handleIncrement}
          />
          <TouchableOpacity onPress={() => setShowRulesModal(true)}>
            <Text style={styles.rulesBtn}>Rules</Text>
          </TouchableOpacity>
        </View>
        <Space size={UtilityMethods.hp(2)} />
        <FlatList
          data={friendList ? friendList.lists : []}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          renderItem={({item, index}) => {
            return (
              <UserRow
                num={index + 1}
                key={JSON.stringify(item)}
                userData={item}
              />
            );
          }}
          ListEmptyComponent={() => (
            <Text style={styles.subheaderText}>No User in Friend List</Text>
          )}
        />
      </View>
      {showRulesModal && (
        <RulesModal onClose={() => setShowRulesModal(false)} />
      )}
      {pushupModal && (
        <UserModals
          isFriend
          list={friendList?.lists || []}
          onAction={handlePushUpAction}
          onClose={() => setPushupModal(false)}
        />
      )}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
  },
  RoundedBtn: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: width / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Add a border
    borderColor: 'rgba(255, 255, 255, 1)', // Adjust border color for a 3D effect
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  btnText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: FontSize(14),
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
  subheaderText: {
    fontSize: FontSize(14),
    fontFamily: fonts.semiBold,
  },
});
