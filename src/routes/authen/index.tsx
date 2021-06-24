import React from 'react';
import HomeScreen from '../../views/HomeScreen/';
import {APP_SCREEN} from '../screenTypes';
import {createStackNavigator} from '@react-navigation/stack';

const Main = createStackNavigator();

export const MainScreen = () => (
  <Main.Navigator>
    <Main.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
  </Main.Navigator>
);
