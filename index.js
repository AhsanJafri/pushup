/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import {initializeApp} from '@react-native-firebase/app';
import App from './App';
import {name as appName} from './app.json';
// import {firebaseAuth} from './src/utils/Firebase.config';

// initializeApp(firebaseAuth);

// import {firebaseAuth} from './src/utils/Firebase.config';
// firebaseAuth;

AppRegistry.registerComponent(appName, () => App);
