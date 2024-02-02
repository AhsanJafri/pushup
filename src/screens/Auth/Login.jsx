import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useTheme, Input, Button, Icon, Header} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import route from '../../navigation/routes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Space from '../../Component/Space';
import UtilityMethods from '../../utils/UtilityMethods';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Screen from '../../Component/Screen';
import LOGO from '../../../assets/images/bookTixLogo.svg';
import {useLoginFormMutation} from '../../redux/apis/Authentication/authentication';
import {saveToken} from '../../redux/features/Authentication/authentication';
import {useDispatch} from 'react-redux';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {setToLocalStorage} from '../../services/localStorage';
import Snackbar from 'react-native-snackbar';
import Loader from '../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
  const {theme} = useTheme();
  const emailInputRef = React.createRef();
  const passwordInputRef = React.createRef();
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [email, setEmail] = useState('')

  // Validation schema for the form
  const validation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const [loginApi, {isLoading, isSuccess, isError, error}] =
    useLoginFormMutation();
  const handelLogin = async values => {
    try {
      const device_name = await handelDeviceId();
      console.log('device_name', device_name);
      const reqData = {...values, device_name};

      const data = await loginApi(reqData).unwrap();
      console.log('try', data, error);
      if (data) {
        const isIssue = data.toLowerCase();
        if (isIssue.includes('error')) {
          throw 'The email and password provided is not valid.';
        } else {
          await AsyncStorage.setItem('storedEmail', values.email);
          console.log('savingToken');
          dispatch(saveToken(data));
          setToLocalStorage('token', data);
        }
      }
      if (error)
        Snackbar.show({
          text: error,
          duration: Snackbar.LENGTH_SHORT,
          textcolor: 'white',
        });
    } catch (e) {
      Snackbar.show({
        text: e?.error ? e?.error : String(e),
        duration: Snackbar.LENGTH_SHORT,
        textcolor: 'white',
      });
    }
  };
  // Function to generate styles with theme
  const getStyles = theme =>
    StyleSheet.create({
      headerText: {
        textAlign: 'center',
        marginTop: 32,
        fontWeight: 'bold',
        fontSize: 52,
        color: theme.colors.white,
      },
    });
  const headerStyle = getStyles(theme);

  const handelDeviceId = async () => {
    return await getUniqueId();
  };


  useEffect(() => {
    // Load the stored email from AsyncStorage
    const loadStoredEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('storedEmail');
        if (storedEmail) {
          // If there's a stored email, set it in the form
          setEmail(storedEmail)
        }
      } catch (error) {
        console.error('Error loading stored email:', error);
      }
    };

    loadStoredEmail();
  }, []);


  return (
    <Screen>
       <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>      
        <ScrollView style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
          }}
          statusBarProps={{
            barStyle: 'light-content',
            backgroundColor: 'transparent',
          }}
        />
        {/* <AppText style={headerStyle.headerText}>BookTix</AppText>
         */}
        <View style={{marginVertical: 32}} />
        <LOGO height="50" width="100%" />

        <Space size={UtilityMethods.hp(10)} />
        <Formik
          enableReinitialize
          innerRef={(f) => (formikRef.current = f)}
          initialValues={{
            email: email,
            password: '',
          }}
          validationSchema={validation}
          onSubmit={values => {
            Keyboard.dismiss();
            handelLogin(values);
          }}>
          {({handleChange, errors, touched, handleSubmit, setFieldValue}) => {
            // Custom handler for email input
            const handleEmailChange = text => {
              setEmail(text, text.trim())
              setFieldValue('email', text.trim());
            };
            return (
              <View style={styles.formContainer}>
                {/* Email Input */}
                <Input
                  ref={emailInputRef}
                  textContentType="emailAddress"
                  onChangeText={handleEmailChange}
                  value={email}
                  // label="Email address"
                  labelStyle={styles.label}
                  inputStyle={{color: 'black'}}
                  placeholder="Enter email"
                  errorStyle={styles.errorText}
                  errorMessage={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  leftIcon={
                    <FontAwesome name="user-o" size={24} color="#6397b7" />
                  }
                  leftIconContainerStyle={{marginHorizontal: 8}}
                  inputContainerStyle={styles.inputContainer}
                  autoComplete="email"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => passwordInputRef?.current?.focus()}
                />
                <Space size={15} />
                {/* Password Input */}
                <Input
                  ref={passwordInputRef}
                  textContentType="password"
                  onChangeText={handleChange('password')}
                  // label="Password"
                  inputStyle={{color: 'black'}}
                  leftIconContainerStyle={{marginHorizontal: 8}}
                  labelStyle={styles.label}
                  placeholder="Enter password"
                  errorStyle={styles.errorText}
                  errorMessage={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  leftIcon={
                    <Octicons name="key" size={24} color={colors.iconColor} />
                  }
                  secureTextEntry={true}
                  inputContainerStyle={styles.inputContainer}
                  returnKeyType="next"
                  returnKeyLabel="Login"
                  onSubmitEditing={() => handleSubmit()}
                />

                {/* Login Button */}
                <Button
                  title="Sign in"
                  loading={false}
                  buttonStyle={styles.loginButton}
                  titleStyle={styles.loginButtonText}
                  containerStyle={styles.loginButtonContainer}
                  onPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
        {/* Settings Icon */}
        <View style={styles.settingsIconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.SETTING_SCREEN)}>
            <Icon name="settings" color={colors.white} />
          </TouchableOpacity>
        </View>
      {isLoading && <Loader />}
    </Screen>
  );
};

export default Login;

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    marginTop: 32,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: FontSize(14),
  },
  formContainer: {
    flex: 1,
    marginTop: 24,
  },
  inputContainer: {
    paddingHorizontal: 4,
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: -8,
  },
  errorText: {
    color: 'red',
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
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
});
