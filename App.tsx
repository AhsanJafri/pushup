/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackRoute from './src/navigation/StackRoute';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@rneui/themed';
import {store, persistor} from './src/app/store';
import theme from './src/utils/theme';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StackRoute />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
