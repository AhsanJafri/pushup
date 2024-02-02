import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Switch} from 'react-native';
import {useTheme, Button, Header} from '@rneui/themed';
import {Formik} from 'formik';
import AppText from '../../Component/AppText';
import * as Yup from 'yup';
import AppPicker from '../../Component/AppPicker';
import colors from '../../styles/colors';
import defaultStyles from '../../styles';
import fonts from '../../styles/fonts';
import {FontSize} from '../../utils/FontSize';
import Screen from '../../Component/Screen';
import LOGO from '../../../assets/images/bookTixLogo.svg';
import {useDispatch} from 'react-redux';
import {saveSettings} from '../../redux/features/App/settings';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import {setToLocalStorage} from '../../services/localStorage';
const dropdownData = [
  {
    value: 'testServer',
    label: 'Test Server',
  },
  {
    value: 'developmentServer',
    label: 'Development Server',
  },
];

const Setting = ({navigation}) => {
  const {theme} = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const initialValues = useSelector(state => state.settings);
  const validation = Yup.object().shape({});
  const handelSettingSave = values => {
    try {
      dispatch(saveSettings(values));
      setToLocalStorage('settings', values);
      navigation.goBack()
      Snackbar.show({
        text: 'Sucessfully Saved',
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  return (
    <Screen>
      {/* Header with Back Button */}

      <Header
        containerStyle={styles.headerContainer}
        statusBarProps={styles.statusBarProps}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{text: 'Settings', style: styles.headerText}}
      />
      <View style={styles.container}>
        {/* <AppText style={styles.titleText(theme)}>BookTix</AppText> */}
        <View style={{marginVertical: 32}} />
        <LOGO height="50" width="100%" />
        <View style={styles.settingsContainer}>
          <AppText
            style={{
              color: colors.white,
            }}
            h4={true}>
            Settings
          </AppText>
        </View>

        {/* Formik Component */}
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={values => handelSettingSave(values)}>
          {({values, handleSubmit, setFieldValue}) => (
            <View style={styles.formContainer}>
              {/* Enable Test Mode Switch */}
              <View style={styles.switchContainer}>
                <Switch
                  value={values.testModeEnabled}
                  onValueChange={e => {
                    setFieldValue('testModeEnabled', e);
                    setFieldValue('server', 'developmentServer');
                    if (e == false) {
                      setFieldValue('server', 'productionServer');
                      setFieldValue('simulateStripReader', false );
                    }
                  }}
                  trackColor={{false: '#767577', true: colors.white}}
                  thumbColor={values.testModeEnabled ? colors.green : '#f4f3f4'}
                />
                <AppText
                  style={{
                    color: colors.white,
                  }}>
                  Enable Test Mode
                </AppText>
              </View>

              {values.testModeEnabled && (
                <>
                  {/* Test Mode Options */}
                  <View style={[styles.optionContainer, {zIndex: 10}]}>
                    <AppText
                      style={{
                        color: colors.white,
                        marginTop: 10,
                      }}>
                      Test Mode Options
                    </AppText>
                    <AppPicker
                      data={dropdownData}
                      open={dropdownOpen}
                      setOpen={setDropdownOpen}
                      preSelectedValue={values.server}
                      name="server"
                      onItemSelect={(item) => {if(item){setFieldValue("server", item)}}}
                    />
                  </View>

                  {/* Simulate Stripe Reader Switch */}
                  <View style={styles.switchContainer}>
                    <Switch
                      value={values.simulateStripReader}
                      onValueChange={e =>
                        setFieldValue('simulateStripReader', e)
                      }
                      trackColor={{false: '#767577', true: colors.white}}
                      thumbColor={
                        values.simulateStripReader ? colors.green : '#f4f3f4'
                      }
                    />
                    <AppText
                      style={{
                        color: colors.white,
                      }}>
                      Simulate Stripe Reader
                    </AppText>
                  </View>
                  </>
              )}
                  {/* Save Button */}
                  <Button
                    title="Save"
                    loading={false}
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonText}
                    containerStyle={styles.saveButtonContainer}
                    onPress={handleSubmit}
                  />
               
            </View>
          )}
        </Formik>

        {/* Footer Text */}
        <View style={styles.footerContainer}>
          <AppText style={styles.copyright}>App Version X.X</AppText>
          <AppText style={styles.copyright}>
            Copyright {new Date().getFullYear()} BookTix | All Rights Reserved
          </AppText>
        </View>
      </View>
    </Screen>
  );
};

export default Setting;

// Stylesheet for the Setting component
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'transparent',
  },
  statusBarProps: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleText: theme => ({
    textAlign: 'center',
    marginTop: 16,
    color: theme?.colors?.white,
    fontWeight: 'bold',
    fontSize: 52,
  }),
  settingsContainer: {
    marginTop: 32,
  },
  formContainer: {
    flex: 1,
    marginTop: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionContainer: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: defaultStyles.textSemiMedium,
    paddingHorizontal: 10,
  },
  saveButtonContainer: {
    alignSelf: 'center',
    marginTop: 16,
    height: 50,
    minWidth: 150,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  copyright: {
    fontSize: FontSize(10),
    color: colors.white,
  },
  headerText: {
    color: colors.white,
    fontSize: FontSize(14),
    fontFamily: fonts.semiBold,
  },
});
