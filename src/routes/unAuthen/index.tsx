import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {APP_SCREEN} from '../screenTypes';
import LoginScreen from '../../views/LoginScreen';
import RegisterScreen from '../../views/RegisterScreen';

const Stack = createStackNavigator();

export const UnAuthentication = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER}
        component={RegisterScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};
