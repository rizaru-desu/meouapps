import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DashboardScreen,
  OfflineScreen,
  PanelScreen,
  PanelSignupScreen,
  ProfileScreen,
  SplashScreen,
} from '../pages';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="panel" component={PanelScreen} />
      <Stack.Screen name="panelSignup" component={PanelSignupScreen} />
      <Stack.Screen name="dashboard" component={DashboardScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />

      <Stack.Screen name="Offline" component={OfflineScreen} />
    </Stack.Navigator>
  );
}

export default Routes;
