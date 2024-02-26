import React, {useEffect, useState} from 'react';
import StackRoute from '../navigation/StackRoute';
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
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Screen>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StackRoute />
          </NavigationContainer>
        </ThemeProvider>
      </Screen>
    </PersistGate>
  );
};

export default RestoreUser;
