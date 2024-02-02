/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import RestoreUser from './src/Component/RestoreUser';
function App() {
  setTimeout(() => {
    SplashScreen.hide();
  }, 5000);

  return (
    <Provider store={store}>
      <RestoreUser />
    </Provider>
  );
}

export default App;
