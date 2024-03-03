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
} from '../../Component';
import {RulesModal} from '../../Component/Modals';
import {useGetAllUsersQuery, useFollowUserMutation} from '../../redux/apis';
import {img} from '../../assets/img';
import Loader from '../../Component/Loader';
import Snackbar from 'react-native-snackbar';

const {height, width} = Dimensions.get('screen');
const Searching = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user);
  const [search, setSearch] = useState('');
  const {
    data: allUsers,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUsersQuery({id: user._id});

  const [addUser, {isLoading: isLoadingAddUser}] = useFollowUserMutation();
  const onAddUser = async followId => {
    addUser({userId: user._id, followId}).then(e => {
      if (e && e.data && e.data.message) {
        Snackbar.show({
          text: e.data.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.green,
        });
        refetch();
      }
    });
  };

  return (
    <Screen>
      {isFetching && isLoading && isLoadingAddUser && <Loader />}
      <HeaderRNE
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'Search Profiles', style: styles.heading}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Input
          textContentType="emailAddress"
          onChangeText={e => setSearch(e)}
          value={search}
          labelStyle={styles.label}
          placeholder="Search with username or email"
          errorStyle={styles.errorText}
          style={{fontFamily: fonts.regular}}
          leftIcon={<FontAwesome name="search" size={24} color="#6397b7" />}
          leftIconContainerStyle={{marginHorizontal: 8}}
          inputContainerStyle={styles.inputContainer}
          autoComplete="email"
          returnKeyType="next"
          returnKeyLabel="next"
        />
        <FlatList
          refreshing={isLoading}
          data={
            allUsers && allUsers.user
              ? allUsers.user.filter(
                  item =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()),
                )
              : []
          }
          renderItem={({item}) => (
            <UserSearchProfile
              key={JSON.stringify(item)}
              data={item}
              onAction={() => onAddUser(item._id)}
            />
          )}
          onRefresh={() => refetch()}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Searching;

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
