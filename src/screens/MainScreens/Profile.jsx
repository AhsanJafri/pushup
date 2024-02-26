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
} from 'react-native';
import {
  useTheme,
  Input,
  Button,
  Iconm,
  Header as HeaderRNE,
} from '@rneui/themed';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import {Screen, Header, UserScore, UserRow} from '../../Component';
import {RulesModal} from '../../Component/Modals';
import {img} from '../../assets/img';
import {useUpdateCurrentUserMutation} from '../../redux/apis';
import {userLogin} from '../../redux/features/Authentication/authentication';
import Loader from '../../Component/Loader';
import Snackbar from 'react-native-snackbar';

const options = [
  {id: 1, type: 'remove-ads', title: 'Remove ads $0.99'},
  {id: 2, type: 'share', title: 'Share with a friend'},
  {id: 3, type: 'rate', title: 'Rate in appstore'},
  {id: 4, type: 'contact-us', title: 'Contact us'},
];
const {height, width} = Dimensions.get('screen');
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user);
  const [updateUser, {isLoading: isUpdatingUser}] =
    useUpdateCurrentUserMutation();
  const [details, setDetails] = useState({
    name: user.name,
    email: user.email,
    dateOfBirth: user.dateOfBirth || '',
  });

  const handleUpdate = async () => {
    updateUser({...details, id: user._id})
      .then(e => {
        dispatch(userLogin(e.data.user));
        Snackbar.show({
          text: 'User Successfully Updated',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.green,
        });
      })
      .catch(e => {
        Snackbar.show({
          text: 'Something Went Wrong',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.red,
        });
      });
  };

  return (
    <Screen>
      {isUpdatingUser && <Loader />}
      <HeaderRNE
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'Profile', style: styles.heading}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{margin: 6}}>
          <TouchableOpacity>
            <Image source={{uri: user.profilepic}} style={styles.img} />
          </TouchableOpacity>
          <Input
            textContentType="name"
            value={details.name}
            leftIconContainerStyle={{marginHorizontal: 8}}
            // labelStyle={styles.label}
            placeholder="Enter Name"
            style={{fontFamily: fonts.regular}}
            inputContainerStyle={styles.inputContainer}
            returnKeyType="next"
            returnKeyLabel="Login"
            onChangeText={e => setDetails({...details, name: e})}
          />
          <Input
            textContentType="emailAddress"
            value={details.email}
            leftIconContainerStyle={{marginHorizontal: 8}}
            // labelStyle={styles.label}
            placeholder="Enter Email"
            style={{fontFamily: fonts.regular}}
            inputContainerStyle={styles.inputContainer}
            returnKeyType="next"
            returnKeyLabel="Login"
            disabled
          />
          <Input
            textContentType="birthdate"
            value={details.dateOfBirth}
            leftIconContainerStyle={{marginHorizontal: 8}}
            // labelStyle={styles.label}
            placeholder="Enter Date Of Birth (DD-MM-YYYY)"
            style={{fontFamily: fonts.regular}}
            inputContainerStyle={styles.inputContainer}
            returnKeyType="next"
            returnKeyLabel="Login"
            onChangeText={e => setDetails({...details, dateOfBirth: e})}
          />

          <Button
            title="Save Profile"
            loading={false}
            buttonStyle={styles.loginButton}
            onPress={handleUpdate}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Profile;

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
    borderBottomWidth: 1,
    padding: 8,
    margin: 4,
  },
  img: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderRadius: 8,
    margin: 10,
    marginBottom: 10,
  },
  inputContainer: {
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grayInput,
    marginHorizontal: -8,
    borderColor: colors.white,
    padding: 5,
  },
});
