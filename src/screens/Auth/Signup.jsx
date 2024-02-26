import React, {useRef, useState} from 'react';
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
import {Input, Button} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';

import {Formik} from 'formik';
import * as Yup from 'yup';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import Screen from '../../Component/Screen';
import {img} from '../../assets/img';
import {useCreateUserMutation} from '../../redux/apis';
import Loader from '../../Component/Loader';

const Signup = ({navigation}) => {
  const formikRef = useRef();
  const passwordInputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [createUser, {isLoading: isLoadingCreateUser}] =
    useCreateUserMutation();

  const validation = Yup.object().shape({
    user: Yup.string().required('Email is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async values => {
    setLoader(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async user => {
        user.user.updateProfile({
          displayName: values.user,
        });
        setLoader(false);
        if (user) {
          await createUser(values).then(e => {
            navigation.navigate(route.LOGIN_SCREEN);
            Snackbar.show({
              text: 'User Successfully Created',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: colors.green,
            });
          });
        }
      })
      .catch(error => {
        setLoader(false);
        let err = '';
        if (error.code === 'auth/email-already-in-use') {
          err = 'That email address is already in use!';
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
  };

  return (
    <Screen>
      {loader && isLoadingCreateUser && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={styles.container}>
          <Space size={UtilityMethods.hp(8)} />
          <Image source={img.splash} style={styles.img} />
          <Formik
            enableReinitialize
            innerRef={f => (formikRef.current = f)}
            initialValues={{
              user: '',
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
              return (
                <View style={styles.formContainer}>
                  <Input
                    textContentType="username"
                    labelStyle={styles.label}
                    value={values.user}
                    placeholder="Enter Username"
                    errorStyle={styles.errorText}
                    style={{fontFamily: fonts.regular}}
                    onChangeText={handleChange('user')}
                    errorMessage={
                      touched.user && errors.user ? errors.user : undefined
                    }
                    leftIcon={
                      <FontAwesome name="user" size={24} color="#6397b7" />
                    }
                    leftIconContainerStyle={{marginHorizontal: 8}}
                    inputContainerStyle={styles.inputContainer}
                    autoComplete="email"
                    returnKeyType="next"
                    returnKeyLabel="next"
                  />
                  <Space size={5} />
                  <Input
                    textContentType="emailAddress"
                    value={values.email}
                    labelStyle={styles.label}
                    placeholder="Enter email"
                    errorStyle={styles.errorText}
                    onChangeText={handleChange('email')}
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
                  <Space size={5} />
                  <Input
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
                    onPress={() => navigation.navigate(route.LOGIN_SCREEN)}>
                    <Text style={styles.signup}>
                      Already have an account? Login-in
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate(route.FORGOT_SCREEN)}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                  </TouchableOpacity> */}
                  <Space size={15} />
                  <Button
                    title="Sign up"
                    loading={false}
                    buttonStyle={styles.loginButton}
                    onPress={handleSubmit}
                  />
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Signup;

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
});
