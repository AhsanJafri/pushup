import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import SplashScreen from '../screens/Auth/Splash';
import Signup from '../screens/Auth/Signup';
import HomeScreen from '../screens/MainScreens/Home';
import SettingScreen from '../screens/MainScreens/Setting';
import ProfileScreen from '../screens/MainScreens/Profile';
import SearchingScreen from '../screens/MainScreens/Searching';
import NotificationScreen from '../screens/MainScreens/Notifications';
import routes from './routes';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
  animationEnabled: false,
};

function StackRoute() {
  const isAuthenticated = useSelector(
    state => state.authentication.isAuthenticated,
  );

  return (
    <Stack.Navigator
      initialRouteName={
        isAuthenticated ? routes.HOME_SCREEN : routes.SPLASH_SCREEN
      }
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={routes.SPLASH_SCREEN}
        component={SplashScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.LOGIN_SCREEN}
        component={Login}
        options={options}
      />
      <Stack.Screen
        name={routes.SIGN_UP_SCREEN}
        component={Signup}
        options={options}
      />
      <Stack.Screen
        name={routes.FORGOT_SCREEN}
        component={ForgotPassword}
        options={options}
      />
      <Stack.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.SETTING_SCREEN}
        component={SettingScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.SEARCHING_SCREEN}
        component={SearchingScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}

export default StackRoute;
