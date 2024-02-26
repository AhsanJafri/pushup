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
import {useTheme, Input, Button, Icon, Header} from '@rneui/themed';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
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
import {useLoginFormMutation} from '../../redux/apis/Authentication/authentication';
import {saveToken} from '../../redux/features/Authentication/authentication';
import {setToLocalStorage} from '../../services/localStorage';
import Loader from '../../Component/Loader';

const Login = ({navigation}) => {
  const {theme} = useTheme();
  const formikRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleLogin = async values => {
    // Implement your login logic here
  };

  return (
    <Screen>
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
            }}
            validationSchema={validation}
            onSubmit={values => {
              Keyboard.dismiss();
              handleLogin(values);
            }}>
            {({handleChange, errors, touched, handleSubmit, setFieldValue}) => {
              const handleEmailChange = text => {
                setFieldValue('email', text.trim());
              };

              return (
                <View style={styles.formContainer}>
                  <Input
                    ref={emailInputRef}
                    textContentType="emailAddress"
                    onChangeText={handleEmailChange}
                    labelStyle={styles.label}
                    placeholder="Enter your email"
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
                  <Button
                    title="Reset Password"
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
    paddingHorizontal: 4,
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
});
