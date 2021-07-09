import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components';
import GroupScreen from '../views/GroupScreen';
import ProfileScreen from '../views/ProfileScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';
import HomeScreen from '../views/HomeScreen';
import SettingScreen from '../views/SettingScreen';

export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="addusergroup" component={GroupScreen} />
        <Tab.Screen name="setting" component={SettingScreen} />
        <Tab.Screen name="user" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
};
