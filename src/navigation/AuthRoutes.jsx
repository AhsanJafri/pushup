import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Setting from '../screens/Auth/Setting';
import routes from './routes';
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
  animationEnabled: false,
};

const getActiveRouteName = state => {
  const route = state.routes[state.index];

  // Dive into nested navigators
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen
        name={routes.SETTING_SCREEN}
        component={Setting}
        options={options}
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
