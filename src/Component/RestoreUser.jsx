import React, {useEffect, useState} from 'react';
import StackRoute from '../navigation/StackRoute';
import AuthRoutes from '../navigation/AuthRoutes';
import {useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@rneui/themed';
import {persistor} from '../app/store';
import theme from '../utils/Theme';
import {SafeAreaView} from 'react-native';
import Screen from './Screen';
import {NavigationContainer} from '@react-navigation/native';
import {saveToken} from '../redux/features/Authentication/authentication';
import {getFromLocalStorage} from '../services/localStorage';
import {useSelector} from 'react-redux';
const RestoreUser = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token);
  const restore = async () => {
    const token = await getFromLocalStorage('token');
    if (token) {
      dispatch(saveToken(token));
    }
  };
  useEffect(() => {
    restore();
  }, []);
  console.log('token', token);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Screen>
        <SafeAreaView style={{flex: 1}}>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              {token ? <StackRoute /> : <AuthRoutes />}
            </NavigationContainer>
          </ThemeProvider>
        </SafeAreaView>
      </Screen>
    </PersistGate>
  );
};

export default RestoreUser;
