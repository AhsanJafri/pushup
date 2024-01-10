import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/Auth/Splash';
import Login from '../screens/Auth/Login';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
  animationEnabled: false,
};

function StackRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={options} />
        <Stack.Screen name="Login" component={Login} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackRoute;
