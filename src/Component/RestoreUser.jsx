import React, {useEffect, useState} from 'react';
import StackRoute from '../navigation/StackRoute';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@rneui/themed';
import theme from '../utils/Theme';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {saveToken} from '../redux/features/Authentication/authentication';
import {getFromLocalStorage} from '../services/localStorage';
import Screen from './Screen';
import {persistor} from '../app/store';

const RestoreUser = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage && remoteMessage.notification.body) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });

    return unsubscribe;
  }, []);

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
