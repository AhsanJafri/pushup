import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, ActivityIndicator} from 'react-native';
import {useTheme, Button, Header} from '@rneui/themed';
import {Formik} from 'formik';
import Screen from '../../Component/Screen';
import AppText from '../../Component/AppText';
import * as Yup from 'yup';
import AppPicker from '../../Component/AppPicker';
import colors from '../../styles/colors';
import routes from '../../navigation/routes';
import Space from '../../Component/Space';
import defaultStyles from '../../styles';
import {FontSize} from '../../utils/FontSize';
import LOGO from '../../../assets/images/bookTixLogo.svg';
import {useDispatch} from 'react-redux';
import {removeLocalStorageItem} from '../../services/localStorage';
import {clearToken} from '../../redux/features/Authentication/authentication';
import Snackbar from 'react-native-snackbar';
import {Input} from '@rneui/themed';

import fonts from '../../styles/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useGetOrganizationMutation,
  useGetDepartmentsMutation,
} from '../../redux/apis/App/main-app-apis';
import Loader from '../../Component/Loader';
import MultilineAppPicker from '../../Component/MultilineAppPicker';

const ChooseOrgDept = ({navigation}) => {
  const {theme} = useTheme();
  const [dropdownOpenDept, setDropdownOpenDept] = useState(false);
  const [dropdownOpenOrg, setDropdownOpenOrg] = useState(false);
  const [orgSelected, setOrgSelected] = useState(null);
  const [orgResponse, setOrgResponse] = useState('');
  const [deps, setDeps] = useState([]);

  const dispatch = useDispatch();
  const handleSave = values => {
    console.log(values, orgResponse);
    if (
      values.clientId != '' &&
      orgResponse == 'booktixTeam' &&
      deps.length == 0
    ) {
      if (orgSelected === values.clientId) {
        setOrgSelected('');
      }
      setOrgSelected(values.clientId);
    }
  };
  const logout = async () => {
    const res = await removeLocalStorageItem('token');
    console.log(res);
    dispatch(clearToken(null));
  };
  const [
    getOrg,
    {
      data: organizationData,
      isLoading: organizationLoading,
      isSuccess: organizationIsSuccess,
      error: organizationError,
    },
  ] = useGetOrganizationMutation();

  const [
    getdept,
    {
      data: departmentsData,
      isLoading: departmentsLoading,
      isError: isErrorInDepartments,
      error: departmentsError,
      refetch: refetchDepartments,
    },
  ] = useGetDepartmentsMutation();

  useEffect(() => {
    getOrg();
  }, []);

  useEffect(() => {
    console.log('>>>>>>>>>>>>>', organizationData, departmentsData);
    if (organizationData == 'booktixTeam') {
      setOrgResponse('booktixTeam');
    }
  }, [organizationData]);

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>', orgSelected);
    if (orgSelected) getdept(orgSelected);
  }, [orgSelected]);

  useEffect(() => {
    console.log(departmentsData, '>>>>>DWWD>>>>>>>>>');
    if (departmentsData?.length > 0) {
      setDeps(departmentsData);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (organizationError) {
      console.log(organizationError);
      Snackbar.show({
        text: 'Organization Error',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (departmentsError && orgSelected)
      Snackbar.show({
        text:
          organizationData === 'booktixTeam'
            ? 'This Client ID is not valid'
            : 'Department not loaded',
        duration: Snackbar.LENGTH_SHORT,
      });
  }, [departmentsError, organizationError]);

  return (
    <>
      <Screen>
        <Header
          containerStyle={styles.headerContainer}
          statusBarProps={styles.statusBarProps}
        />

        <View style={styles.container}>
          {/* <AppText style={styles.titleText}>BookTix</AppText> */}
          <View style={{marginVertical: 32}} />
          <LOGO height="50" width="100%" />
          {/* <AppText style={styles.subTitle}>Settings</AppText> */}

          <Formik
            initialValues={{clientId: false}}
            onSubmit={values => {
              handleSave(values);
              console.log(values);
            }}>
            {({handleSubmit, handleChange, values, setFieldValue}) => (
              <View style={styles.formContainer}>
                {orgResponse == 'booktixTeam' && (
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{flex: 1, height: 50}}>
                      <Input
                        textContentType="username"
                        onChangeText={text => {
                          if (deps.length > 0) {
                            setDeps([]);
                          }
                          setFieldValue('clientId', text);
                        }}
                        // label="Email address"
                        labelStyle={styles.label}
                        inputStyle={{color: 'black'}}
                        placeholder="Enter Client Id"
                        errorStyle={styles.errorText}
                        leftIcon={
                          <FontAwesome
                            name="user-o"
                            size={24}
                            color="#6397b7"
                          />
                        }
                        leftIconContainerStyle={{marginHorizontal: 8}}
                        inputContainerStyle={styles.inputContainer}
                      />
                    </View>
                    <View>
                      <Button
                        title={'Submit'}
                        buttonStyle={[
                          styles.saveButton,
                          {borderRadius: 10, height: 50},
                        ]}
                        titleStyle={[
                          styles.saveButtonText,
                          {paddingHorizontal: 3},
                        ]}
                        containerStyle={{
                          borderRadius: 5,
                          marginLeft: 5,
                          height: 50,
                          width: 80,
                        }}
                        disabled={
                          !(
                            values.clientId != '' &&
                            orgResponse == 'booktixTeam' &&
                            deps.length == 0
                          )
                        }
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
                {orgResponse == 'booktixTeam' && <Space size={15} />}
                {orgResponse != 'booktixTeam' &&
                  typeof organizationData == 'object' &&
                  organizationData?.length > 0 && (
                    <View style={Platform.OS === 'ios' ? {zIndex: 10} : {}}>
                      <AppText style={styles.pickerLabel}>
                        Select Organization
                      </AppText>
                      <AppPicker
                        data={organizationData}
                        open={dropdownOpenDept}
                        setOpen={setDropdownOpenDept}
                        name={'organization'}
                        zIndex={10}
                        labelPropertyName={'name'}
                        valuePropertyName={'abv'}
                        onItemSelect={val => setOrgSelected(val)}
                      />
                    </View>
                  )}
                <Space size={15} />
                {orgSelected && deps.length > 0 && (
                  <View style={Platform.OS === 'ios' ? {zIndex: 9} : {}}>
                    <AppText style={styles.pickerLabel}>
                      Select Department
                    </AppText>
                    <MultilineAppPicker
                      open={dropdownOpenOrg}
                      setOpen={setDropdownOpenOrg}
                      name={'department'}
                      zIndex={9}
                      data={deps}
                      labelPropertyName={'name'}
                      valuePropertyName={'abv'}
                      onItemSelect={val => {
                        if (val) navigation.navigate(routes.SHOW_TERMINAL);
                      }}
                    />
                  </View>
                )}

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Button
                    title={'Logout'}
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonText}
                    containerStyle={styles.saveButtonContainer}
                    onPress={() => {
                      logout();
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Screen>
      {(organizationLoading || departmentsLoading) && <Loader />}
    </>
  );
};

export default ChooseOrgDept;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  statusBarProps: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleText: {
    textAlign: 'center',
    marginTop: 32,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 52,
  },
  subTitle: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: defaultStyles.textLarge,
    color: colors.white,
  },
  formContainer: {
    flex: 1,
    marginTop: 24,
  },
  pickerLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.white,
  },

  saveButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: FontSize(13),
    paddingHorizontal: 10,
  },
  saveButtonContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    height: 50,
    minWidth: 150,
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
});
