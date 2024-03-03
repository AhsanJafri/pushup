/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {store} from './src/app/store';
import RestoreUser from './src/Component/RestoreUser';
import {firebaseAuth} from './src/utils/Firebase.config';
import {requestUserPermission} from './src/hooks/utils';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
    firebaseAuth();
    GoogleSignin.configure({
      webClientId:
        '494755426897-v6krp4hfcgr5tlsk1fmteeu8t3jjten0.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    });
  }, []);

  return (
    <Provider store={store}>
      <RestoreUser />
    </Provider>
  );
}

export default App;
