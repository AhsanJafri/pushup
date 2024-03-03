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
} from 'react-native';
import {useTheme, Input, Button} from '@rneui/themed';
import {CommonActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import {
  userLogin,
  usersSelector,
} from '../../redux/features/Authentication/authentication';
import {
  useCreateUserGoogleMutation,
  useGetCurrentUserMutation,
} from '../../redux/apis';
import Screen from '../../Component/Screen';
import {img} from '../../assets/img';
import Loader from '../../Component/Loader';

const Login = ({navigation}) => {
  const formikRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication);

  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [createUserGoogle, {isLoading: isLoadingCreateUser}] =
    useCreateUserGoogleMutation();

  const [getCurrentUserWithEmail, {isLoading: isLoadingGetCurrentUser}] =
    useGetCurrentUserMutation();

  const validation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async values => {
    setLoader(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(user => {
        setLoader(false);
        if (user) {
          getCurrentUserWithEmail({email: values.email}).then(user => {
            dispatch(userLogin(user.data.user));
            Snackbar.show({
              text: 'User Successfully Login',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.green,
            });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: route.HOME_SCREEN}],
              }),
            );
          });
        }
      })
      .catch(error => {
        setLoader(false);
        let err = '';
        if (error.code === 'auth/invalid-credential') {
          err = 'The supplied auth credential is malformed or has expired';
        }

        if (error.code === 'auth/invalid-email') {
          err = 'That email address is invalid!';
        }
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.red,
        });
      });
    // navigation.navigate(route.HOME_SCREEN);
  };

  const signIn = async () => {
    try {
      setLoader(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoader(false);
      console.log('Test', userInfo);
      if (userInfo) {
        await createUserGoogle({
          user: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        })
          .then(e => {
            console.log('Test', e);
            dispatch(userLogin(e.data.user));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: route.HOME_SCREEN}],
              }),
            );
            Snackbar.show({
              text: 'User Successfully Login',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.green,
            });
          })
          .catch(e => console.log('Error', e));
      }
    } catch (error) {
      setLoader(false);
      Snackbar.show({
        text: 'Something went Wrong',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
      });
    }
  };

  return (
    <Screen>
      {loader && isLoadingCreateUser && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={styles.container} contentContainerStyle={{}}>
          <Space size={UtilityMethods.hp(10)} />
          <Image source={img.splash} style={styles.img} />
          <Space size={UtilityMethods.hp(2)} />
          <Formik
            enableReinitialize
            innerRef={f => (formikRef.current = f)}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validation}
            onSubmit={values => {
              Keyboard.dismiss();
              handleLogin(values);
            }}>
            {({
              handleChange,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              values,
            }) => {
              const handleEmailChange = text => {
                setEmail(text, text.trim());
                setFieldValue('email', text.trim());
              };

              return (
                <View style={styles.formContainer}>
                  <Input
                    ref={emailInputRef}
                    textContentType="emailAddress"
                    onChangeText={handleEmailChange}
                    value={values.email}
                    labelStyle={styles.label}
                    placeholder="Enter email"
                    errorStyle={styles.errorText}
                    style={{fontFamily: fonts.regular}}
                    errorMessage={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    leftIcon={
                      <FontAwesome name="user" size={24} color="#6397b7" />
                    }
                    leftIconContainerStyle={{marginHorizontal: 8}}
                    inputContainerStyle={styles.inputContainer}
                    autoComplete="email"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    onSubmitEditing={() => passwordInputRef?.current?.focus()}
                  />
                  <Space size={15} />
                  <Input
                    ref={passwordInputRef}
                    textContentType="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    leftIconContainerStyle={{marginHorizontal: 8}}
                    // labelStyle={styles.label}
                    placeholder="Enter password"
                    style={{fontFamily: fonts.regular}}
                    errorStyle={styles.errorText}
                    errorMessage={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                    leftIcon={
                      <FontAwesome
                        name="eye"
                        size={24}
                        color={colors.iconColor}
                      />
                    }
                    secureTextEntry={true}
                    inputContainerStyle={styles.inputContainer}
                    returnKeyType="next"
                    returnKeyLabel="Login"
                    onSubmitEditing={() => handleSubmit()}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate(route.SIGN_UP_SCREEN)}>
                    <Text style={styles.signup}>
                      Don't have an account? Sign-up
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate(route.FORGOT_SCREEN)}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                  </TouchableOpacity> */}
                  <Space size={15} />
                  <Button
                    title="Sign in"
                    loading={false}
                    buttonStyle={styles.loginButton}
                    onPress={handleSubmit}
                  />
                  {/* <Button
                    title="Google Sign in"
                    loading={false}
                    buttonStyle={styles.googleBtn}
                  /> */}
                  <Button
                    icon={
                      <FontAwesome
                        name="google"
                        style={styles.googleIcon}
                        size={20}
                        color="white"
                      />
                    }
                    onPress={signIn}
                    buttonStyle={styles.googleBtn}>
                    <Text style={styles.googleTxt}>Google Sign in</Text>
                  </Button>
                  {/* <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                      width: 160, // You must specify a width
                      height: 45, // You must specify a height
                    }}
                    onPress={() => onAppleButtonPress()}
                  /> */}
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grayInput,
    marginHorizontal: -8,
    borderColor: colors.white,
  },
  errorText: {
    color: 'red',
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
    width: '100%',
    marginTop: 14,
  },
  googleBtn: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderRadius: 25,
    width: '100%',
    marginTop: 16,
    color: colors.black,
    borderWidth: 1,
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: FontSize(14),
    paddingHorizontal: 10,
  },
  loginButtonContainer: {
    alignSelf: 'center',
    marginTop: 16,
    height: 50,
    minWidth: 150,
  },
  settingsIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 16,
    marginRight: 16,
  },
  label: {
    color: 'white',
    fontFamily: fonts.semiBold,
    fontSize: FontSize(14),
  },
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    borderRadius: 8,
  },
  forgot: {
    fontFamily: fonts.regular,
    color: colors.gray,
    alignSelf: 'flex-end',
  },
  signup: {
    fontFamily: fonts.regular,
    color: colors.gray,
    alignSelf: 'flex-start',
  },
  googleIcon: {
    marginHorizontal: 8,
    color: colors.black,
  },
  googleTxt: {
    fontFamily: fonts.regular,
    color: colors.gray,
    fontSize: FontSize(12),
  },
});
