import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Setting from '../screens/Auth/Setting';
import ChooseOrgDept from '../screens/MainScreens/ChooseOrgDept';
import FirmwareUpdateScreen from '../screens/MainScreens/FirmwareUpdateScreen';
import routes from './routes';
import PendingCardPaymentsScreen from '../screens/MainScreens/PendingCardPaymentsScreen';
import ShowTerminal from '../screens/MainScreens/ShowTerminal';
import PaymentMethodScreen from '../screens/MainScreens/PaymentMethodScreen';
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
  animationEnabled: false,
};

function StackRoute() {
  return (
    <Stack.Navigator
      initialRouteName="chooseOrgDept"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={routes.CHOOSE_ORG_DEPT}
        component={ChooseOrgDept}
        options={options}
      />
      <Stack.Screen
        name={routes.FIRMWARE_UPDATE_SCREEN}
        component={FirmwareUpdateScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.PENDING_CARD_PAYMENTS_SCREEN}
        component={PendingCardPaymentsScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.SHOW_TERMINAL}
        component={ShowTerminal}
        options={options}
      />
      <Stack.Screen
        name={routes.PAYMENT_METHOD_SCREEN}
        component={PaymentMethodScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}

export default StackRoute;
