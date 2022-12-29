import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PanelScreen, SplashScreen} from '../pages';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="panel" component={PanelScreen} />
    </Stack.Navigator>
  );
}

export default Routes;
